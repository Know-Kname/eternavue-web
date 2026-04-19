import { config } from './config'
import {
  getMockListings,
  getMockListing,
  getMockArticles,
  getMockArticle,
  getMockFacets,
} from './mock-data'
import type {
  Listing,
  Article,
  ListingsResult,
  ArticlesResult,
  ListingFilters,
  PageInfo,
} from './types'
import { LISTING_TYPE_MAP, isValidListingType } from './listing-types'

async function fetchGraphQL<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(config.wp.graphqlUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    next: { tags: ['wp'] },
  } as any)

  if (!res.ok) throw new Error(`WPGraphQL request failed: ${res.status}`)

  const json = await res.json()
  if (json.errors) throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
  return json.data as T
}

function parseArrayParam(param: string | string[] | undefined): string[] {
  if (!param) return []
  return Array.isArray(param) ? param : param.split(',').filter(Boolean)
}

export async function getListings(filters: ListingFilters): Promise<ListingsResult> {
  const page = parseInt(filters.page ?? '1', 10)
  const perPage = 12

  if (config.environment.useMockData) {
    const validType = filters.type && isValidListingType(filters.type) ? filters.type : undefined
    const { listings, total } = getMockListings({
      type: validType,
      state: filters.state,
      featured: filters.featured === 'true',
      page,
      perPage,
    })
    const totalPages = Math.ceil(total / perPage)
    return {
      listings,
      facets: getMockFacets(),
      pageInfo: {
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1,
        total,
        currentPage: page,
        totalPages,
      },
    }
  }

  const taxQuery = buildTaxQuery(filters)
  const typeFilter = filters.type && isValidListingType(filters.type)
    ? LISTING_TYPE_MAP[filters.type].cpt
    : null

  const { GET_LISTINGS } = await import('../gql/queries')
  const data = await fetchGraphQL<{ listings: { nodes: Listing[]; pageInfo: PageInfo } }>(
    GET_LISTINGS,
    { first: perPage, after: null, taxQuery, postType: typeFilter }
  )

  return {
    listings: data.listings.nodes,
    facets: getMockFacets(),
    pageInfo: {
      ...data.listings.pageInfo,
      currentPage: page,
    },
  }
}

export async function getListing(slug: string): Promise<Listing | null> {
  if (config.environment.useMockData) {
    return getMockListing(slug)
  }

  const { GET_LISTING } = await import('../gql/queries')
  const data = await fetchGraphQL<{ listing: Listing | null }>(GET_LISTING, { slug })
  return data.listing
}

export async function getArticles(page = 1): Promise<ArticlesResult> {
  const perPage = 9

  if (config.environment.useMockData) {
    const articles = getMockArticles()
    return {
      articles,
      pageInfo: {
        hasNextPage: false,
        hasPreviousPage: false,
        total: articles.length,
        currentPage: 1,
        totalPages: 1,
      },
    }
  }

  const { GET_ARTICLES } = await import('../gql/queries')
  const data = await fetchGraphQL<{ posts: { nodes: Article[]; pageInfo: PageInfo } }>(
    GET_ARTICLES,
    { first: perPage }
  )

  return {
    articles: data.posts.nodes,
    pageInfo: {
      ...data.posts.pageInfo,
      currentPage: page,
    },
  }
}

export async function getArticle(slug: string): Promise<Article | null> {
  if (config.environment.useMockData) {
    return getMockArticle(slug)
  }

  const { GET_ARTICLE } = await import('../gql/queries')
  const data = await fetchGraphQL<{ post: Article | null }>(GET_ARTICLE, { slug })
  return data.post
}

function buildTaxQuery(filters: ListingFilters): unknown[] {
  const clauses: unknown[] = []

  if (filters.state) {
    clauses.push({
      taxonomy: 'LOCATIONSTATE',
      field: 'SLUG',
      terms: [filters.state.toLowerCase()],
    })
  }

  const services = parseArrayParam(filters.services)
  if (services.length > 0) {
    clauses.push({
      taxonomy: 'SERVICETYPE',
      field: 'SLUG',
      terms: services,
      operator: 'IN',
    })
  }

  const certs = parseArrayParam(filters.certs)
  if (certs.length > 0) {
    clauses.push({
      taxonomy: 'CERTIFICATION',
      field: 'SLUG',
      terms: certs,
      operator: 'IN',
    })
  }

  return clauses
}
