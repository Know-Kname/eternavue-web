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
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-serif font-bold text-slate-800 mb-6">
        {q ? `Search results for "${q}"` : 'Search the Directory'}
      </h1>

      {q && (
        <p className="text-slate-500 mb-8">
          {total === 0 ? 'No results found.' : `${total} result${total !== 1 ? 's' : ''} found`}
        </p>
      )}

      {!q && (
        <p className="text-slate-500 mb-8">
          Use the search bar above to find funeral homes, cremation services, cemeteries, and more.
        </p>
      )}

      {results.length > 0 && (
        <div className="space-y-3">
          {results.map(result => (
            <Link
              key={result.id}
              href={`/directory/${result.listingType}/${result.slug}`}
              className="block bg-white rounded-xl border border-warm-200 p-5 hover:shadow-md hover:border-sage-200 transition-all duration-200 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <h2 className="font-semibold text-slate-800 group-hover:text-sage-600 transition-colors">
                    {result.title}
                  </h2>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-2">{result.excerpt}</p>
                  {(result.city || result.state) && (
                    <div className="flex items-center gap-1 text-xs text-slate-400 mt-2">
                      <MapPin className="w-3 h-3" />
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
