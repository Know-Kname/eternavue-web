import type { Config } from 'tailwindcss'
import { tokens } from './src/design/tokens'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: tokens.colors.primary,
        accent: tokens.colors.accent,
        holographic: tokens.colors.holographic,
        neutral: tokens.colors.neutral,
      },
      fontSize: tokens.typography.fontSize,
      spacing: tokens.spacing,
    },
  },
  plugins: [],
}
export default config
