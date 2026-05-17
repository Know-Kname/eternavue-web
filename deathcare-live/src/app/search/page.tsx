import Link from 'next/link'
import { searchListings } from '@/lib/typesense'
import { LISTING_TYPE_MAP, isValidListingType } from '@/lib/listing-types'
import { Badge } from '@/components/ui/Badge'
import { MapPin } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Search the Directory',
}

interface SearchPageProps {
  searchParams: Promise<{ q?: string; page?: string }>
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q = '', page = '1' } = await searchParams
  const { results, total } = await searchListings(q, parseInt(page, 10))

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <h1 className="mb-6 font-serif text-3xl font-bold text-slate-800">
        {q ? `Search results for "${q}"` : 'Search the Directory'}
      </h1>

      {q && (
        <p className="mb-8 text-slate-500">
          {total === 0 ? 'No results found.' : `${total} result${total !== 1 ? 's' : ''} found`}
        </p>
      )}

      {!q && (
        <p className="mb-8 text-slate-500">
          Use the search bar above to find funeral homes, cremation services, cemeteries, and more.
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map((result) => (
            <Link
              key={result.id}
              href={`/directory/${result.listingType}/${result.slug}`}
              className="border-warm-200 hover:border-sage-200 group block rounded-xl border bg-white p-5 transition-all duration-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="group-hover:text-sage-600 font-semibold text-slate-800 transition-colors">
                    {result.title}
                  </h2>
                  <p className="mt-1 line-clamp-2 text-sm text-slate-500">{result.excerpt}</p>
                  {(result.city || result.state) && (
                    <div className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                      <MapPin className="h-3 w-3" />
                      {[result.city, result.state].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>
                {isValidListingType(result.listingType) && (
                  <Badge variant="sage" className="shrink-0">
                    {LISTING_TYPE_MAP[result.listingType].label}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
