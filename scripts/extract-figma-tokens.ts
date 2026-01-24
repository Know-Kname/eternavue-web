#!/usr/bin/env node
/**
 * Extract Design Tokens from Figma
 *
 * This script automatically extracts design tokens from your Figma file
 * and generates TypeScript/CSS output. Runs as part of the build pipeline.
 *
 * Usage: npx ts-node scripts/extract-figma-tokens.ts
 *
 * Environment: FIGMA_TOKEN=your_token (get from figma.com/developers)
 */

import * as fs from 'fs'
import * as path from 'path'

// Use native fetch (Node 18+)

interface FigmaColor {
  r: number
  g: number
  b: number
  a: number
}

interface FigmaVariable {
  id: string
  name: string
  value: FigmaColor | string | number
  description?: string
  type?: string
}

interface FigmaFile {
  document: {
    id: string
    name: string
    children: any[]
  }
  variables?: {
    [key: string]: FigmaVariable[]
  }
}

class FigmaTokenExtractor {
  private token: string
  private fileId: string
  private baseUrl = 'https://api.figma.com/v1'

  constructor(token: string, fileId: string) {
    this.token = token
    this.fileId = fileId
  }

  private async fetchFigmaAPI(endpoint: string) {
    const url = `${this.baseUrl}${endpoint}`
    const response = await fetch(url, {
      headers: {
        'X-Figma-Token': this.token,
      },
    })

    if (!response.ok) {
      throw new Error(
        `Figma API error: ${response.status} - ${response.statusText}`
      )
    }

    return response.json()
  }

  async extractTokens() {
    console.log(`🎨 Extracting tokens from Figma file: ${this.fileId}`)

    try {
      // Get file metadata
      const file = (await this.fetchFigmaAPI(
        `/files/${this.fileId}`
      )) as FigmaFile

      console.log(`✓ Retrieved file: ${file.document.name}`)

      // Get variables (design tokens)
      const variables = await this.fetchFigmaAPI(
        `/files/${this.fileId}/variables/local`
      )

      console.log(`✓ Retrieved ${Object.keys(variables).length} token collections`)

      // Parse and structure tokens
      const tokens = this.parseTokens(variables)

      // Generate TypeScript tokens file
      this.generateTokensFile(tokens)

      // Generate CSS tokens file
      this.generateCSSTokens(tokens)

      // Generate documentation
      this.generateTokenDocs(tokens)

      console.log('✅ Token extraction complete!')
      console.log(
        '📝 Generated: src/design/tokens-figma.ts, src/app/tokens.css, docs/TOKENS.md'
      )

      return tokens
    } catch (error) {
      console.error('❌ Error extracting tokens:', error)
      throw error
    }
  }

  private parseTokens(figmaVariables: any) {
    const tokens: any = {
      colors: {},
      spacing: {},
      typography: {},
      shadows: {},
      radius: {},
    }

    // Parse Figma variable collections
    for (const collectionId in figmaVariables) {
      const collection = figmaVariables[collectionId]

      for (const variable of collection) {
        const tokenKey = this.parseTokenName(variable.name)

        if (variable.type === 'COLOR') {
          this.setNestedValue(
            tokens.colors,
            tokenKey,
            this.colorToHex(variable.value)
          )
        } else if (variable.type === 'FLOAT') {
          if (variable.name.includes('Spacing')) {
            this.setNestedValue(
              tokens.spacing,
              tokenKey,
              `${variable.value}px`
            )
          } else if (variable.name.includes('Shadow')) {
            this.setNestedValue(tokens.shadows, tokenKey, variable.value)
          } else if (variable.name.includes('Radius')) {
            this.setNestedValue(tokens.radius, tokenKey, `${variable.value}px`)
          }
        } else if (variable.type === 'STRING') {
          if (variable.name.includes('Font')) {
            this.setNestedValue(tokens.typography, tokenKey, variable.value)
          }
        }
      }
    }

    return tokens
  }

  private parseTokenName(figmaName: string): string {
    // Convert "Colors/Primary/500" → ['colors', 'primary', '500']
    return figmaName
      .toLowerCase()
      .split('/')
      .map((part) => part.trim())
      .join('.')
  }

  private colorToHex(color: FigmaColor): string {
    const toHex = (n: number) => {
      const hex = Math.round(n * 255)
        .toString(16)
        .padStart(2, '0')
      return hex
    }

    return `#${toHex(color.r)}${toHex(color.g)}${toHex(color.b)}`
  }

  private setNestedValue(obj: any, path: string, value: any) {
    const parts = path.split('.')
    let current = obj

    for (let i = 0; i < parts.length - 1; i++) {
      if (!current[parts[i]]) {
        current[parts[i]] = {}
      }
      current = current[parts[i]]
    }

    current[parts[parts.length - 1]] = value
  }

  private generateTokensFile(tokens: any) {
    const content = `/**
 * Eternavue Design Tokens (Auto-generated from Figma)
 * ⚠️ DO NOT EDIT MANUALLY - Run: npx ts-node scripts/extract-figma-tokens.ts
 *
 * Generated: ${new Date().toISOString()}
 * Source: Figma Design System
 */

export const figmaTokens = ${JSON.stringify(tokens, null, 2)} as const;

export type FigmaTokens = typeof figmaTokens;
`

    const tokenPath = path.join(
      process.cwd(),
      'src/design/tokens-figma.ts'
    )
    fs.writeFileSync(tokenPath, content)
    console.log(`📄 Generated: ${tokenPath}`)
  }

  private generateCSSTokens(tokens: any) {
    let cssContent = `/* Eternavue Design Tokens (Auto-generated from Figma) */
/* ⚠️ DO NOT EDIT MANUALLY */
/* Generated: ${new Date().toISOString()} */

:root {
`

    const flatTokens = this.flattenTokens(tokens)
    for (const [key, value] of Object.entries(flatTokens)) {
      cssContent += `  --${key}: ${value};\n`
    }

    cssContent += `}\n`

    const cssPath = path.join(
      process.cwd(),
      'src/app/tokens.css'
    )
    fs.writeFileSync(cssPath, cssContent)
    console.log(`🎨 Generated: ${cssPath}`)
  }

  private flattenTokens(
    obj: any,
    prefix = ''
  ): Record<string, string | number> {
    const result: Record<string, string | number> = {}

    for (const [key, value] of Object.entries(obj)) {
      const newKey = prefix ? `${prefix}-${key}` : key

      if (typeof value === 'object' && value !== null) {
        Object.assign(result, this.flattenTokens(value, newKey))
      } else {
        result[newKey] = value as string | number
      }
    }

    return result
  }

  private generateTokenDocs(tokens: any) {
    const docPath = path.join(
      process.cwd(),
      'docs/TOKENS.md'
    )
    const content = `# Eternavue Design Tokens

**Auto-generated from Figma Design System**

> Generated: ${new Date().toISOString()}

## Color Tokens

\`\`\`typescript
${JSON.stringify(tokens.colors, null, 2)}
\`\`\`

## Spacing Tokens

\`\`\`typescript
${JSON.stringify(tokens.spacing, null, 2)}
\`\`\`

## Typography Tokens

\`\`\`typescript
${JSON.stringify(tokens.typography, null, 2)}
\`\`\`

## Shadow Tokens

\`\`\`typescript
${JSON.stringify(tokens.shadows, null, 2)}
\`\`\`

## Border Radius

\`\`\`typescript
${JSON.stringify(tokens.radius, null, 2)}
\`\`\`

---

**To update these tokens:**
\`\`\`bash
npx ts-node scripts/extract-figma-tokens.ts
\`\`\`

**Configure:**
- Set \`FIGMA_TOKEN\` environment variable
- Update \`FIGMA_FILE_ID\` in \`scripts/extract-figma-tokens.ts\`
`

    fs.writeFileSync(docPath, content)
    console.log(`📚 Generated: ${docPath}`)
  }
}

// Main execution
const token = process.env.FIGMA_TOKEN
const fileId = process.env.FIGMA_FILE_ID || '2YKFjeiywrLmUIdvM2VhZ5'

if (!token) {
  console.error('❌ Error: FIGMA_TOKEN environment variable not set')
  console.log('Set it with: export FIGMA_TOKEN=your_figma_token')
  process.exit(1)
}

const extractor = new FigmaTokenExtractor(token, fileId)
extractor
  .extractTokens()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
