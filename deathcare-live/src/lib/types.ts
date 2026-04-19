import type { ListingType } from './listing-types'

export interface ListingACF {
  address?: string
  city?: string
  state?: string
  zip?: string
  phone?: string
  email?: string
  website?: string
  geoLat?: number
  geoLng?: number
  logo?: { sourceUrl: string; altText: string } | null
  photos?: Array<{ sourceUrl: string; altText: string }>
  businessHours?: string
  featured?: boolean
  claimed?: boolean
  yearFounded?: number
}

export interface Listing {
  id: string
  slug: string
  title: string
  excerpt?: string
  listingType: ListingType
  acf: ListingACF
  serviceTypes?: string[]
  certifications?: string[]
  locationState?: string
  locationCity?: string
}

export interface Article {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  featuredImage?: { sourceUrl: string; altText: string } | null
  categories?: string[]
  author?: string
}

export interface PageInfo {
  hasNextPage: boolean
  hasPreviousPage: boolean
  startCursor?: string
  endCursor?: string
  total?: number
  currentPage?: number
  totalPages?: number
}

export interface FacetValue {
  value: string
  label: string
  count: number
}

export interface Facets {
  locationState: FacetValue[]
  serviceType: FacetValue[]
  certification: FacetValue[]
}

export interface ListingsResult {
  listings: Listing[]
  facets: Facets
  pageInfo: PageInfo
}

export interface ArticlesResult {
  articles: Article[]
  pageInfo: PageInfo
}

export interface ListingFilters {
  type?: string
  state?: string
  city?: string
  services?: string | string[]
  certs?: string | string[]
  featured?: string
  page?: string
  search?: string
}
