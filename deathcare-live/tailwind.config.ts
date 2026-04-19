import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
        gold: {
          400: '#D4A84B',
          500: '#C9A84C',
          600: '#A8882A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

export default config
