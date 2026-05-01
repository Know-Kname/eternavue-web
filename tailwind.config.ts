import type { Config } from 'tailwindcss'
import { tokens } from './src/design/tokens'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary:     tokens.colors.primary,
        accent:      tokens.colors.accent,
        holographic: tokens.colors.holographic,
        neutral:     tokens.colors.neutral,
        space:       tokens.colors.space,
        surface:     tokens.colors.surface,
        iris:        tokens.colors.iris,
        violet:      tokens.colors.violet,
        rose:        tokens.colors.rose,
      },
      fontFamily: {
        serif: tokens.typography.fontFamily.serif,
        sans:  tokens.typography.fontFamily.sans,
      },
      fontSize:  tokens.typography.fontSize,
      spacing:   tokens.spacing,
      screens:   tokens.breakpoints,
      animation: {
        'beam':        'beam 8s ease-in-out infinite',
        'float':       'float 6s ease-in-out infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
        'spin-slow':   'spin-slow 8s linear infinite',
        'meteor':      'meteor 5s linear infinite',
        'marquee':     'marquee 30s linear infinite',
        'pulse-glow':  'pulse-glow 3s ease-in-out infinite',
      },
      keyframes: {
        beam: {
          '0%, 100%': { opacity: '0.1' },
          '50%':       { opacity: '0.4' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-20px)' },
        },
        shimmer: {
          from: { backgroundPosition: '-200% center' },
          to:   { backgroundPosition:  '200% center' },
        },
        'spin-slow': {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        meteor: {
          '0%':   { transform: 'rotate(215deg) translateX(0)',       opacity: '1' },
          '70%':  {                                                    opacity: '1' },
          '100%': { transform: 'rotate(215deg) translateX(-500px)',  opacity: '0' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-50%)' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 15px rgba(50, 184, 198, 0.2)' },
          '50%':       { boxShadow: '0 0 40px rgba(50, 184, 198, 0.5)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
