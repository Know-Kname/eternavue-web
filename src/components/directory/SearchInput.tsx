'use client'

import { useQueryState } from 'nuqs'
import { Search, X } from 'lucide-react'
import { useCallback } from 'react'

export function SearchInput() {
  const [query, setQuery] = useQueryState('search', {
    defaultValue: '',
    shallow: false,
    throttleMs: 300,
  })

  const clear = useCallback(() => setQuery(''), [setQuery])

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400" />
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search listings..."
        className="focus:ring-sage-400 w-full rounded-lg border border-slate-300 bg-white py-2.5 pr-8 pl-9 text-sm text-slate-900 transition-colors placeholder:text-slate-400 focus:border-transparent focus:ring-2 focus:outline-none"
      />
      {query && (
        <button
          onClick={clear}
          className="absolute top-1/2 right-2 -translate-y-1/2 p-1 text-slate-400 transition-colors hover:text-slate-600"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}
