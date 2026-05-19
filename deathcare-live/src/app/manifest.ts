import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'deathcare.live',
    short_name: 'deathcare.live',
    description:
      'Professional community & legislative intelligence for the deathcare industry.',
    start_url: '/',
    display: 'standalone',
    orientation: 'portrait',
    background_color: '#0f172a',
    theme_color: '#0d9488',
    categories: ['business', 'productivity'],
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'any',
      },
    ],
    shortcuts: [
      {
        name: 'Community Feed',
        short_name: 'Feed',
        url: '/feed',
        description: 'Latest field notes and analyses from verified operators',
      },
      {
        name: 'Michigan Hub',
        short_name: 'Michigan',
        url: '/states/MI',
        description: 'Michigan legislative hub and community',
      },
      {
        name: 'Bill Tracker',
        short_name: 'Bills',
        url: '/bills/MI',
        description: 'Track active legislation',
      },
    ],
  }
}
