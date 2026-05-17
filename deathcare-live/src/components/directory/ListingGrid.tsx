import { ListingCard } from './ListingCard'
import { ListingCardSkeleton } from '@/components/ui/Skeleton'
import { EmptyState } from './EmptyState'
import type { Listing } from '@/lib/types'

interface ListingGridProps {
  listings: Listing[]
  loading?: boolean
}

export function ListingGrid({ listings, loading = false }: ListingGridProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 9 }).map((_, i) => (
          <ListingCardSkeleton key={i} />
        ))}
      </div>
    )
  }

  if (listings.length === 0) {
    return <EmptyState />
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {listings.map((listing) => (
        <ListingCard key={listing.id} listing={listing} />
      ))}
    </div>
  )
}
