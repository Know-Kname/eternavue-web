import { MetadataRoute } from 'next'
import { getListings, getArticles } from '@/lib/wpgraphql'
import { ALL_LISTING_TYPES } from '@/lib/listing-types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://deathcare.live'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/directory`, lastModified: now, changeFrequency: 'hourly', priority: 0.9 },
    { url: `${base}/resources`, lastModified: now, changeFrequency: 'daily', priority: 0.8 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    ...ALL_LISTING_TYPES.map(type => ({
      url: `${base}/directory/${type}`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.85,
    })),
  ]

  const { listings } = await getListings({ page: '1' })
  const listingRoutes: MetadataRoute.Sitemap = listings.map(l => ({
    url: `${base}/directory/${l.listingType}/${l.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const { articles } = await getArticles()
  const articleRoutes: MetadataRoute.Sitemap = articles.map(a => ({
    url: `${base}/resources/${a.slug}`,
    lastModified: new Date(a.date),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticRoutes, ...listingRoutes, ...articleRoutes]
}
