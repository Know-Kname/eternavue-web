import { MetadataRoute } from 'next'
import { getListings, getArticles } from '@/lib/wpgraphql'
import { ALL_LISTING_TYPES } from '@/lib/listing-types'
import { MOCK_BILLS, ACTIVE_STATES, MOCK_PROFILES } from '@/lib/mock-community'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://deathcare.live'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/feed`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/states`, lastModified: now, changeFrequency: 'daily', priority: 0.85 },
    { url: `${base}/directory`, lastModified: now, changeFrequency: 'hourly', priority: 0.85 },
    { url: `${base}/digest`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/jobs`, lastModified: now, changeFrequency: 'daily', priority: 0.75 },
    { url: `${base}/ce`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/rfq`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${base}/join`, lastModified: now, changeFrequency: 'monthly', priority: 0.65 },
    { url: `${base}/search`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    ...ALL_LISTING_TYPES.map((type) => ({
      url: `${base}/directory/${type}`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
    ...ACTIVE_STATES.map((state) => ({
      url: `${base}/states/${state}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    })),
    ...ACTIVE_STATES.map((state) => ({
      url: `${base}/bills/${state}`,
      lastModified: now,
      changeFrequency: 'daily' as const,
      priority: 0.75,
    })),
  ]

  const billRoutes: MetadataRoute.Sitemap = MOCK_BILLS.map((b) => ({
    url: `${base}/bills/${b.state}/${b.id}`,
    lastModified: new Date(b.lastActionDate),
    changeFrequency: 'daily' as const,
    priority: 0.8,
  }))

  const profileRoutes: MetadataRoute.Sitemap = MOCK_PROFILES.map((p) => ({
    url: `${base}/profile/${p.username}`,
    lastModified: new Date(p.createdAt),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const { listings } = await getListings({ page: '1' })
  const listingRoutes: MetadataRoute.Sitemap = listings.map((l) => ({
    url: `${base}/directory/${l.listingType}/${l.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const { articles } = await getArticles()
  const articleRoutes: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/resources/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...billRoutes, ...profileRoutes, ...listingRoutes, ...articleRoutes]
}
