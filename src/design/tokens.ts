/**
 * Eternavue Design Tokens
 * Updated: 2026-05-01 — Premium redesign
 */
export const tokens = {
  colors: {
    primary: {
      50:  '#f0f4f8',
      100: '#d9e2ec',
      200: '#b3c5d8',
      300: '#8ca8c4',
      400: '#5a89b0',
      500: '#1F3252',
      600: '#172a45',
      700: '#0f1f38',
      800: '#0a1629',
      900: '#050b14',
      950: '#02050a',
    },
    accent: {
      400: '#eac59b',
      500: '#D4A574',
      600: '#c19660',
      700: '#a67c47',
    },
    holographic: {
      cyan:  '#32B8C6',
      light: '#7DD3DA',
      glow:  'rgba(50, 184, 198, 0.3)',
      darkGlow: 'rgba(50, 184, 198, 0.5)',
    },
    space:   '#030712',
    surface: '#080f1f',
    iris:    '#6366f1',
    violet:  '#8B5CF6',
    rose:    '#f43f5e',
    neutral: {
      50:  '#f9fafb',
      100: '#F5F5FD',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: {
      serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      sans:  ['var(--font-geist)',    'system-ui', 'sans-serif'],
    },
    fontSize: {
      xs:   '0.75rem',
      sm:   '0.875rem',
      base: '1rem',
      lg:   '1.125rem',
      xl:   '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
      '7xl': '4.5rem',
      '8xl': '6rem',
    },
  },
  spacing: {
    xs:   '4px',
    sm:   '8px',
    md:   '16px',
    lg:   '24px',
    xl:   '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  breakpoints: {
    sm:  '640px',
    md:  '768px',
    lg:  '1024px',
    xl:  '1280px',
    '2xl': '1536px',
  },
} as const;

export type Tokens = typeof tokens;
