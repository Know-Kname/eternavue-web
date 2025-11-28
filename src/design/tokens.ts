export const tokens = {
  colors: {
    primary: {
      50: '#f0f4f8',
      100: '#d9e2ec',
      500: '#1F3252', // Eternavue dark blue
      600: '#172a45',
      700: '#0f1f38',
    },
    accent: {
      500: '#D4A574', // Gold
      600: '#c19660',
    },
    holographic: {
      cyan: '#32B8C6',
      glow: 'rgba(50, 184, 198, 0.3)',
    },
    neutral: {
      100: '#F5F5FD', // Light background
      900: '#1a1a1a',
    },
  },
  typography: {
    fontFamily: {
      sans: ['system-ui', 'sans-serif'],
      display: ['Georgia', 'serif'], // For headings with gravitas
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
    '3xl': '64px',
  },
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
} as const;

export type Tokens = typeof tokens;
