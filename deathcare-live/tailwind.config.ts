import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Legacy directory palette (kept for backward compat)
        sage: {
          50:  '#f2f7f2',
          100: '#e0ece0',
          200: '#c1d9c1',
          300: '#93be93',
          400: '#5C7A5C',
          500: '#4a6a4a',
          600: '#3b563b',
          700: '#2f452f',
          800: '#263726',
          900: '#1e2d1e',
        },
        clay: {
          50:  '#f9f5f3',
          100: '#f1e8e2',
          200: '#e3d1c7',
          300: '#ccb0a0',
          400: '#B08070',
          500: '#8B6F5E',
          600: '#755a4b',
          700: '#5e4840',
          800: '#4c3b35',
          900: '#3d302b',
        },
        warm: {
          50:  '#FAF8F5',
          100: '#F5F0E8',
          200: '#EDE5D8',
        },
        // Community platform palette
        teal: {
          50:  '#f0fafa',
          100: '#cceff0',
          200: '#99dfe2',
          300: '#5ec6ca',
          400: '#2fa8af',
          500: '#01696f',
          600: '#0c4e54',
          700: '#093d42',
          800: '#072d31',
          900: '#041e21',
        },
        gold: {
          50:  '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#f8cc52',
          400: '#f0b429',
          500: '#d19900',
          600: '#a37600',
          700: '#7a5800',
          800: '#523b00',
          900: '#291e00',
        },
        purple: {
          50:  '#f8f4ff',
          100: '#ede5ff',
          200: '#d9ccff',
          300: '#bba3f7',
          400: '#9d74ed',
          500: '#7a39bb',
          600: '#622d97',
          700: '#4c2275',
          800: '#381954',
          900: '#240f33',
        },
        success: {
          50:  '#f2fae8',
          100: '#ddf2c0',
          200: '#b7e585',
          300: '#8dd450',
          400: '#6daa45',
          500: '#437a22',
          600: '#345f1a',
          700: '#264614',
          800: '#192e0d',
          900: '#0d1807',
        },
        surface: {
          DEFAULT: '#f7f6f2',
          2:       '#f9f8f5',
          offset:  '#edeae5',
        },
      },
      fontFamily: {
        sans:    ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'Georgia', 'Cambria', 'Times New Roman', 'serif'],
        display: ['"Instrument Serif"', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
