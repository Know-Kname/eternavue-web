import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Performance & Optimization */
  reactCompiler: true,
  experimental: {
    turbopackUseSystemTlsCerts: true,
  },

  /* Security Headers */
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        // Prevent MIME type sniffing
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        // Prevent clickjacking
        {
          key: 'X-Frame-Options',
          value: 'DENY',
        },
        // XSS Protection (redundant with CSP but good fallback)
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
        // Referrer Policy
        {
          key: 'Referrer-Policy',
          value: 'strict-origin-when-cross-origin',
        },
        // Permissions Policy - disable unnecessary APIs
        {
          key: 'Permissions-Policy',
          value: 'camera=(), microphone=(), geolocation=(), payment=()',
        },
      ],
    },
  ],

  /* Image Optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
  },
}

export default nextConfig
