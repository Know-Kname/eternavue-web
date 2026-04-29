/**
 * Sync all listings from WordPress (via WPGraphQL) into Typesense.
 * Run: npx ts-node --project tsconfig.scripts.json scripts/index-typesense.ts
 *
 * Requires .env.local with:
 *   NEXT_PUBLIC_WP_GRAPHQL_URL
 *   TYPESENSE_HOST / TYPESENSE_PORT / TYPESENSE_API_KEY
 */

import 'dotenv/config'

const WP_URL = process.env.NEXT_PUBLIC_WP_GRAPHQL_URL
const TS_HOST = process.env.TYPESENSE_HOST || 'localhost'
const TS_PORT = process.env.TYPESENSE_PORT || '8108'
const TS_PROTO = process.env.TYPESENSE_PROTOCOL || 'http'
const TS_KEY = process.env.TYPESENSE_API_KEY

if (!WP_URL || !TS_KEY) {
  console.error('Missing NEXT_PUBLIC_WP_GRAPHQL_URL or TYPESENSE_API_KEY')
  process.exit(1)
}

const TS_BASE = `${TS_PROTO}://${TS_HOST}:${TS_PORT}`
const headers = { 'X-TYPESENSE-API-KEY': TS_KEY, 'Content-Type': 'application/json' }

const COLLECTION_SCHEMA = {
  name: 'listings',
  fields: [
    { name: 'id', type: 'string' },
    { name: 'slug', type: 'string' },
    { name: 'title', type: 'string' },
    { name: 'excerpt', type: 'string', optional: true },
    { name: 'listingType', type: 'string', facet: true },
    { name: 'city', type: 'string', optional: true },
    { name: 'state', type: 'string', facet: true, optional: true },
    { name: 'featured', type: 'bool', facet: true, optional: true },
  ],
  default_sorting_field: 'title',
}

const GET_ALL_LISTINGS = `
  query GetAllListings($after: String) {
    funeralHomes(first: 100, after: $after) {
      nodes { id slug title excerpt acf { city state featured } }
      pageInfo { hasNextPage endCursor }
    }
    crematoria(first: 100) {
      nodes { id slug title excerpt acf { city state featured } }
    }
    cemeteries(first: 100) {
      nodes { id slug title excerpt acf { city state featured } }
    }
    suppliers(first: 100) {
      nodes { id slug title excerpt acf { city state featured } }
    }
    techVendors(first: 100) {
      nodes { id slug title excerpt acf { city state featured } }
    }
    griefResources(first: 100) {
      nodes { id slug title excerpt acf { city state featured } }
    }
  }
`

async function gql(query: string, variables = {}) {
  const res = await fetch(WP_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
  })
  return res.json()
}

async function tsRequest(path: string, method: string, body?: unknown) {
  const res = await fetch(`${TS_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  })
  return res.json()
}

async function ensureCollection() {
  const existing = await tsRequest(`/collections/listings`, 'GET')
  if (existing.name) {
    console.log('Dropping existing collection...')
    await tsRequest('/collections/listings', 'DELETE')
  }
  console.log('Creating collection...')
  await tsRequest('/collections', 'POST', COLLECTION_SCHEMA)
}

type WPNode = { id: string; slug: string; title: string; excerpt?: string; acf: { city?: string; state?: string; featured?: boolean } }

function mapNodes(nodes: WPNode[], listingType: string) {
  return nodes.map(n => ({
    id: n.id,
    slug: n.slug,
    title: n.title,
    excerpt: n.excerpt ?? '',
    listingType,
    city: n.acf?.city ?? '',
    state: n.acf?.state ?? '',
    featured: n.acf?.featured ?? false,
  }))
}

async function indexDocuments(docs: object[]) {
  const ndjson = docs.map(d => JSON.stringify(d)).join('\n')
  const res = await fetch(`${TS_BASE}/collections/listings/documents/import?action=upsert`, {
    method: 'POST',
    headers: { 'X-TYPESENSE-API-KEY': TS_KEY!, 'Content-Type': 'text/plain' },
    body: ndjson,
  })
  const text = await res.text()
  const results = text.trim().split('\n').map(l => JSON.parse(l))
  const failed = results.filter((r: { success: boolean }) => !r.success)
  if (failed.length) console.warn(`${failed.length} documents failed to index`)
  return results.length - failed.length
}

async function main() {
  console.log(`Connecting to WPGraphQL at ${WP_URL}`)
  console.log(`Connecting to Typesense at ${TS_BASE}`)

  await ensureCollection()

  const { data } = await gql(GET_ALL_LISTINGS)
  if (!data) throw new Error('WPGraphQL returned no data — check your URL and plugin setup')

  const TYPE_MAP: Record<string, string> = {
    funeralHomes: 'funeral-homes',
    crematoria: 'cremation',
    cemeteries: 'cemeteries',
    suppliers: 'suppliers',
    techVendors: 'technology',
    griefResources: 'grief-support',
  }

  let totalIndexed = 0
  for (const [key, listingType] of Object.entries(TYPE_MAP)) {
    const nodes: WPNode[] = data[key]?.nodes ?? []
    if (!nodes.length) continue
    const docs = mapNodes(nodes, listingType)
    const count = await indexDocuments(docs)
    console.log(`  ✓ ${listingType}: ${count} indexed`)
    totalIndexed += count
  }

  console.log(`\nDone. ${totalIndexed} listings indexed in Typesense.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
