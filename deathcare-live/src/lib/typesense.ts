import { config } from './config'

export interface SearchResult {
  id: string
  slug: string
  title: string
  excerpt: string
  listingType: string
  city: string
  state: string
}

export interface SearchResponse {
  results: SearchResult[]
  total: number
  query: string
}

export async function searchListings(query: string, page = 1): Promise<SearchResponse> {
  if (!query.trim()) return { results: [], total: 0, query }

  if (!config.typesense.apiKey) {
    const { MOCK_LISTINGS } = await import('./mock-data')
    const q = query.toLowerCase()
    const results = MOCK_LISTINGS.filter(
      l =>
        l.title.toLowerCase().includes(q) ||
        l.excerpt?.toLowerCase().includes(q) ||
        l.acf.city?.toLowerCase().includes(q)
    ).map(l => ({
      id: l.id,
      slug: l.slug,
      title: l.title,
      excerpt: l.excerpt ?? '',
      listingType: l.listingType,
      city: l.acf.city ?? '',
      state: l.acf.state ?? '',
    }))
    return { results, total: results.length, query }
  }

  const params = new URLSearchParams({
    q: query,
    query_by: 'title,excerpt,city,state',
    page: String(page),
    per_page: '20',
  })

  const url = `${config.typesense.protocol}://${config.typesense.host}:${config.typesense.port}/collections/listings/documents/search?${params}`

  type NextFetchInit = RequestInit & { next?: { revalidate?: number | false } }
  const init: NextFetchInit = {
    headers: { 'X-TYPESENSE-API-KEY': config.typesense.searchKey },
    next: { revalidate: 0 },
  }
  const res = await fetch(url, init)

  if (!res.ok) return { results: [], total: 0, query }

  const data = await res.json()
  const results: SearchResult[] = (data.hits ?? []).map((hit: { document: SearchResult }) => hit.document)
  return { results, total: data.found ?? 0, query }
}
