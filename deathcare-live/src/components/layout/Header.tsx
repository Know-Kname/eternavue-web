import Link from 'next/link'
import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-7 h-7 rounded-full bg-teal-500 flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-4 h-4">
                <path d="M12 2v20"/>
                <path d="M5 7c1.8-1.7 3.7-2.5 7-2.5S17.2 5.3 19 7"/>
                <path d="M5 17c1.8 1.7 3.7 2.5 7 2.5s5.2-.8 7-2.5"/>
              </svg>
            </div>
            <span className="text-lg font-display font-bold text-slate-900">
              deathcare<span className="text-teal-500">.live</span>
            </span>
          </Link>

          {/* Primary nav */}
          <nav className="hidden lg:flex items-center gap-1">
            <Link
              href="/feed"
              className="px-3 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Feed
            </Link>
            <Link
              href="/states"
              className="px-3 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              States
            </Link>
            <div className="relative group">
              <button className="px-3 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-1">
                Bills
                <svg className="w-3 h-3 opacity-50" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M2 4l4 4 4-4"/>
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl border border-slate-200 shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {['MI', 'OH', 'IL', 'WA', 'TX'].map(state => (
                  <Link
                    key={state}
                    href={`/bills/${state}`}
                    className="block px-4 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                  >
                    {state} legislation
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/directory"
              className="px-3 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Directory
            </Link>
            <Link
              href="/jobs"
              className="px-3 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Jobs
            </Link>
            <Link
              href="/resources"
              className="px-3 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
            >
              Resources
            </Link>
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <Link
              href="/search"
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/join"
              className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors"
            >
              Join
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
