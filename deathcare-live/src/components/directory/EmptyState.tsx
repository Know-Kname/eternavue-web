import Link from 'next/link'
import { SearchX } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX className="mb-4 h-12 w-12 text-slate-300" />
      <h3 className="mb-2 text-lg font-semibold text-slate-700">No listings found</h3>
      <p className="mb-6 max-w-sm text-sm text-slate-500">
        Try adjusting your filters or searching for a different location.
      </p>
      <Link
        href="/directory"
        className="text-sage-600 hover:text-sage-700 text-sm font-medium underline underline-offset-2"
      >
        Clear all filters
      </Link>
    </div>
  )
}
