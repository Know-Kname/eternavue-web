import Link from 'next/link'
import { SearchX } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX className="w-12 h-12 text-slate-300 mb-4" />
      <h3 className="text-lg font-semibold text-slate-700 mb-2">No listings found</h3>
      <p className="text-slate-500 text-sm mb-6 max-w-sm">
        Try adjusting your filters or searching for a different location.
      </p>
      <Link
        href="/directory"
        className="text-sm font-medium text-sage-600 hover:text-sage-700 underline underline-offset-2"
      >
        Clear all filters
      </Link>
    </div>
  )
}
