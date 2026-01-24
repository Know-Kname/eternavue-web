#!/usr/bin/env node
/**
 * Auto-generate Dark Mode Variants for All Components
 *
 * This script:
 * 1. Scans all components in src/components/
 * 2. Identifies light mode classes (bg-, text-, border-, etc.)
 * 3. Generates corresponding dark: variants intelligently
 * 4. Applies standard dark mode logic
 *
 * Usage: npx ts-node scripts/generate-dark-mode.ts
 */

import * as fs from 'fs'
import * as path from 'path'

interface ComponentFile {
  path: string
  content: string
  name: string
}

class DarkModeGenerator {
  private componentDir = path.join(process.cwd(), 'src/components')
  private darkModeMap: Map<string, string> = new Map([
    // Background mappings
    ['bg-white', 'dark:bg-primary-950'],
    ['bg-neutral-100', 'dark:bg-primary-900'],
    ['bg-neutral-50', 'dark:bg-primary-900'],
    ['bg-primary-50', 'dark:bg-primary-900'],
    ['bg-primary-100', 'dark:bg-primary-900'],

    // Text mappings
    ['text-neutral-900', 'dark:text-white'],
    ['text-neutral-700', 'dark:text-neutral-200'],
    ['text-neutral-600', 'dark:text-neutral-300'],
    ['text-primary-950', 'dark:text-white'],

    // Border mappings
    ['border-neutral-200', 'dark:border-white/10'],
    ['border-neutral-300', 'dark:border-white/20'],
    ['border-primary-50', 'dark:border-white/10'],

    // Hover mappings
    ['hover:bg-neutral-100', 'dark:hover:bg-primary-900'],
    ['hover:bg-primary-50', 'dark:hover:bg-primary-900'],
    ['hover:text-neutral-900', 'dark:hover:text-white'],

    // Shadow/Opacity
    ['shadow-sm', 'dark:shadow-lg dark:shadow-black/40'],
    ['shadow-md', 'dark:shadow-lg dark:shadow-black/50'],
  ])

  async generate() {
    console.log('🌓 Generating dark mode variants for all components...\n')

    const components = this.scanComponents()
    console.log(`📁 Found ${components.length} component files\n`)

    const results = {
      updated: 0,
      skipped: 0,
      errors: 0,
      changes: [] as string[],
    }

    for (const component of components) {
      try {
        const result = this.updateComponent(component)
        if (result) {
          results.updated++
          results.changes.push(component.name)
          console.log(`✓ ${component.name}`)
        } else {
          results.skipped++
        }
      } catch (error) {
        results.errors++
        console.error(`✗ ${component.name}: ${error}`)
      }
    }

    console.log(`\n📊 Summary:`)
    console.log(`  ✓ Updated: ${results.updated}`)
    console.log(`  ⊘ Skipped: ${results.skipped}`)
    console.log(`  ✗ Errors: ${results.errors}`)

    if (results.changes.length > 0) {
      console.log(`\n📝 Modified components:`)
      results.changes.forEach((name) => console.log(`  • ${name}`))
    }

    console.log('\n✅ Dark mode generation complete!')
  }

  private scanComponents(): ComponentFile[] {
    const components: ComponentFile[] = []

    const scanDir = (dir: string) => {
      const files = fs.readdirSync(dir)

      for (const file of files) {
        const filePath = path.join(dir, file)
        const stat = fs.statSync(filePath)

        if (stat.isDirectory()) {
          scanDir(filePath)
        } else if (
          file.endsWith('.tsx') &&
          !file.endsWith('.dark.tsx')
        ) {
          const content = fs.readFileSync(filePath, 'utf-8')
          if (this.hasLightModeClasses(content)) {
            components.push({
              path: filePath,
              content,
              name: file,
            })
          }
        }
      }
    }

    scanDir(this.componentDir)
    return components
  }

  private hasLightModeClasses(content: string): boolean {
    const lightPatterns = [
      /bg-white/,
      /bg-neutral-/,
      /text-neutral-/,
      /border-neutral-/,
    ]
    return lightPatterns.some((pattern) => pattern.test(content))
  }

  private updateComponent(component: ComponentFile): boolean {
    let updated = false
    let newContent = component.content

    // Find all className attributes
    const classNameRegex = /className={`([^`]+)`}/g
    const matches = Array.from(
      component.content.matchAll(classNameRegex)
    )

    if (matches.length === 0) {
      return false
    }

    for (const match of matches) {
      const classString = match[1]
      const newClassString = this.addDarkModeVariants(classString)

      if (newClassString !== classString) {
        newContent = newContent.replace(
          `className={\`${classString}\`}`,
          `className={\`${newClassString}\``  }
        )
        updated = true
      }
    }

    if (updated) {
      fs.writeFileSync(component.path, newContent)
    }

    return updated
  }

  private addDarkModeVariants(classString: string): string {
    let result = classString

    // Split classes and process each
    const classes = classString.split(/\s+/)
    const darkVariants: string[] = []

    for (const cls of classes) {
      // Skip if already has dark: variant
      if (cls.startsWith('dark:')) {
        continue
      }

      // Check if we have a mapping for this class
      const darkClass = this.darkModeMap.get(cls)
      if (darkClass && !classString.includes(darkClass)) {
        darkVariants.push(darkClass)
      } else if (this.shouldAutoGenerateDark(cls)) {
        // Auto-generate for unmapped classes
        const generated = this.autoGenerateDarkClass(cls)
        if (generated && !classString.includes(generated)) {
          darkVariants.push(generated)
        }
      }
    }

    // Append dark variants
    if (darkVariants.length > 0) {
      result = `${result} ${darkVariants.join(' ')}`
    }

    return result
  }

  private shouldAutoGenerateDark(cls: string): boolean {
    const darkPatterns = [
      /^bg-/,
      /^text-/,
      /^border-/,
      /^shadow-/,
      /^hover:/,
      /^focus:/,
    ]
    return darkPatterns.some((pattern) => pattern.test(cls))
  }

  private autoGenerateDarkClass(cls: string): string | null {
    // Auto-generate dark variants based on patterns
    if (cls.startsWith('bg-primary-')) {
      const level = cls.replace('bg-primary-', '')
      const darkLevel = parseInt(level) < 500 ? '900' : '800'
      return `dark:bg-primary-${darkLevel}`
    }

    if (cls.startsWith('text-primary-')) {
      return cls.replace('text-primary-', 'dark:text-primary-')
    }

    if (cls.startsWith('border-primary-')) {
      return cls.replace('border-primary-', 'dark:border-primary-')
    }

    if (cls.startsWith('hover:bg-primary-')) {
      const level = cls.replace('hover:bg-primary-', '')
      return `dark:hover:bg-primary-${level}`
    }

    return null
  }
}

// Main execution
const generator = new DarkModeGenerator()
generator
  .generate()
  .catch((error) => {
    console.error('❌ Error generating dark mode:', error)
    process.exit(1)
  })
