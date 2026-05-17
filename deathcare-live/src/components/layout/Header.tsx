import Link from 'next/link'
import { Search } from 'lucide-react'
import { ACTIVE_STATES, STATE_NAMES } from '@/lib/mock-community'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center shadow-sm">
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" className="w-4.5 h-4.5">
                <path d="M12 2v20"/>
                <path d="M5 7c1.8-1.7 3.7-2.5 7-2.5S17.2 5.3 19 7"/>
                <path d="M5 17c1.8 1.7 3.7 2.5 7 2.5s5.2-.8 7-2.5"/>
              </svg>
            </div>
            <span className="text-base font-display font-bold text-slate-900 tracking-tight">
              deathcare<span className="text-teal-500">.live</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-0.5">
            {[
              { href: '/feed', label: 'Feed' },
              { href: '/states', label: 'States' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}

            <div className="relative group">
              <button className="px-3.5 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors flex items-center gap-1 font-medium">
                Bills
                <svg className="w-3 h-3 opacity-50 group-hover:opacity-80 transition-opacity" viewBox="0 0 12 12" fill="currentColor">
                  <path d="M2 4l4 4 4-4"/>
                </svg>
              </button>
              <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-150">
                <p className="px-3 pt-0.5 pb-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  By state
                </p>
                {ACTIVE_STATES.map(code => (
                  <Link
                    key={code}
                    href={`/bills/${code}`}
                    className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                  >
                    {STATE_NAMES[code]}
                    <span className="text-xs text-slate-400">{code}</span>
                  </Link>
                ))}
              </div>
            </div>

            {[
              { href: '/directory', label: 'Directory' },
              { href: '/jobs', label: 'Jobs' },
              { href: '/resources', label: 'Resources' },
            ].map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/search"
              className="p-2 text-slate-500 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </Link>
            <Link
              href="/join"
              className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-teal-500 text-white text-sm font-semibold hover:bg-teal-600 transition-colors shadow-sm"
            >
              Join free
            </Link>
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  )
}
