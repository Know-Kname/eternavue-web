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
        void: tokens.colors.void,
        ghost: tokens.colors.ghost,
      },
      fontFamily: {
        heading: tokens.typography.fontFamily.heading,
        body: tokens.typography.fontFamily.body,
      },
      fontSize: tokens.typography.fontSize,
      spacing: tokens.spacing,
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow-strong': '0 0 32px rgba(99, 102, 241, 0.55)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
      },
      animation: {
        'neon-flicker': 'neonFlicker 0.3s linear both',
        'pulse-gradient': 'pulseGradient 8s ease-in-out infinite',
        'glitch-decode': 'glitchDecode 1.2s ease-out both',
      },
    },
  },
  plugins: [],
}
export default config
