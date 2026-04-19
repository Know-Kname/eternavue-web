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
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
      <input
        type="search"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search listings..."
        className="w-full pl-9 pr-8 py-2.5 rounded-lg border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sage-400 focus:border-transparent transition-colors"
      />
      {query && (
        <button
          onClick={clear}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
          aria-label="Clear search"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
