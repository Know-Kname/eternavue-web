import Link from 'next/link'
import { ALL_LISTING_TYPES, LISTING_TYPE_MAP } from '@/lib/listing-types'
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-xl font-serif font-bold text-sage-500">
              deathcare<span className="text-clay-500">.live</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {ALL_LISTING_TYPES.slice(0, 5).map(type => (
              <Link
                key={type}
                href={`/directory/${type}`}
                className="px-3 py-2 text-sm text-slate-600 hover:text-sage-600 hover:bg-sage-50 rounded-lg transition-colors whitespace-nowrap"
              >
                {LISTING_TYPE_MAP[type].plural}
              </Link>
            ))}
            <Link
              href="/directory"
              className="px-3 py-2 text-sm font-medium text-sage-600 hover:bg-sage-50 rounded-lg transition-colors"
            >
              All
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/search"
              className="p-2 text-slate-500 hover:text-sage-600 hover:bg-sage-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/resources"
              className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-sage-600 border border-sage-400 rounded-lg hover:bg-sage-50 transition-colors"
            >
              Resources
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
