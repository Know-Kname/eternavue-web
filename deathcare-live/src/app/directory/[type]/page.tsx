import { notFound } from 'next/navigation'
import { getListings } from '@/lib/wpgraphql'
import { CategoryNav } from '@/components/directory/CategoryNav'
import { FilterSidebar } from '@/components/directory/FilterSidebar'
import { ListingGrid } from '@/components/directory/ListingGrid'
import { Pagination } from '@/components/directory/Pagination'
import { SearchInput } from '@/components/directory/SearchInput'
import { LISTING_TYPE_MAP, isValidListingType } from '@/lib/listing-types'
import type { ListingType } from '@/lib/listing-types'
import type { ListingFilters } from '@/lib/types'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ type: string }>
  searchParams: Promise<ListingFilters>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { type } = await params
  if (!isValidListingType(type)) return {}
  const info = LISTING_TYPE_MAP[type]
  return {
    title: `${info.plural} Directory`,
    description: `Find ${info.plural.toLowerCase()} near you. ${info.description}.`,
  }
}

export const revalidate = 3600

export default async function ListingTypePage({ params, searchParams }: PageProps) {
  const { type } = await params

  if (!isValidListingType(type)) notFound()

  const validType = type as ListingType
  const filters = await searchParams
  const { listings, facets, pageInfo } = await getListings({ ...filters, type: validType })

  const info = LISTING_TYPE_MAP[validType]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2">{info.plural}</h1>
        <p className="text-slate-500">{info.description}</p>
      </div>

      <div className="mb-6">
        <CategoryNav activeType={validType} />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-56 xl:w-64 shrink-0">
          <div className="sticky top-24 space-y-4">
            <SearchInput />
            <FilterSidebar facets={facets} />
          </div>
        </div>

        <div className="flex-1 min-w-0 space-y-6">
          <ListingGrid listings={listings} />
          <Pagination pageInfo={pageInfo} basePath={`/directory/${validType}`} />
        </div>
      </div>
    </div>
  )
}
