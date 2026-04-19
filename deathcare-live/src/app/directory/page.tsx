import { getListings } from '@/lib/wpgraphql'
import { CategoryNav } from '@/components/directory/CategoryNav'
import { FilterSidebar } from '@/components/directory/FilterSidebar'
import { ListingGrid } from '@/components/directory/ListingGrid'
import { Pagination } from '@/components/directory/Pagination'
import { SearchInput } from '@/components/directory/SearchInput'
import type { ListingFilters } from '@/lib/types'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Directory — Find Deathcare Professionals & Services',
  description:
    'Search our comprehensive directory of funeral homes, cremation services, cemeteries, suppliers, technology vendors, and grief support resources.',
}

export const revalidate = 3600

export default async function DirectoryPage({
  searchParams,
}: {
  searchParams: Promise<ListingFilters>
}) {
  const filters = await searchParams
  const { listings, facets, pageInfo } = await getListings(filters)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-serif font-bold text-slate-800 mb-2">Directory</h1>
        <p className="text-slate-500">
          {pageInfo.total
            ? `${pageInfo.total} listings found`
            : 'Browse all deathcare professionals and services'}
        </p>
      </div>

      <div className="mb-6">
        <CategoryNav />
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-56 xl:w-64 shrink-0">
          <div className="sticky top-24 space-y-4">
            <SearchInput />
            <FilterSidebar facets={facets} />
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-6">
          <ListingGrid listings={listings} />
          <Pagination pageInfo={pageInfo} basePath="/directory" />
        </div>
      </div>
    </div>
  )
}
