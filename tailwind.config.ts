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
      colors: {
        claude: {
          parchment:     '#f5f4ed',
          ivory:         '#faf9f5',
          'warm-sand':   '#e8e6dc',
          'deep-dark':   '#141413',
          'dark-surface':'#30302e',
          terracotta:    '#c96442',
          coral:         '#d97757',
          'near-black':  '#141413',
          charcoal:      '#4d4c48',
          olive:         '#5e5d59',
          stone:         '#87867f',
          'dark-warm':   '#3d3d3a',
          'warm-silver': '#b0aea5',
          'border-cream':'#f0eee6',
          'border-warm': '#e8e6dc',
          'border-dark': '#30302e',
        },
      },
      fontFamily: {
        'claude-serif': ['Georgia', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow-strong': '0 0 32px rgba(99, 102, 241, 0.55)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.4)',
        'claude-ring': '0px 0px 0px 1px #d1cfc5',
        'claude-ring-dark': '0px 0px 0px 1px #30302e',
        'claude-whisper': 'rgba(0,0,0,0.05) 0px 4px 24px',
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
