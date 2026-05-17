import Link from 'next/link'
import { Search } from 'lucide-react'
import { ACTIVE_STATES, STATE_NAMES } from '@/lib/mock-community'
import { MobileMenu } from './MobileMenu'

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 shadow-sm">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="1.8"
                className="h-4.5 w-4.5"
              >
                <path d="M12 2v20" />
                <path d="M5 7c1.8-1.7 3.7-2.5 7-2.5S17.2 5.3 19 7" />
                <path d="M5 17c1.8 1.7 3.7 2.5 7 2.5s5.2-.8 7-2.5" />
              </svg>
            </div>
            <span className="font-display text-base font-bold tracking-tight text-slate-900">
              deathcare<span className="text-teal-500">.live</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-0.5 lg:flex">
            {[
              { href: '/feed', label: 'Feed' },
              { href: '/states', label: 'States' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600"
              >
                {link.label}
              </Link>
            ))}

            <div className="group relative">
              <button className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600">
                Bills
                <svg
                  className="h-3 w-3 opacity-50 transition-opacity group-hover:opacity-80"
                  viewBox="0 0 12 12"
                  fill="currentColor"
                >
                  <path d="M2 4l4 4 4-4" />
                </svg>
              </button>
              <div className="invisible absolute top-full left-0 mt-1 w-52 rounded-xl border border-slate-200 bg-white py-1.5 opacity-0 shadow-xl transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <p className="px-3 pt-0.5 pb-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  By state
                </p>
                {ACTIVE_STATES.map((code) => (
                  <Link
                    key={code}
                    href={`/bills/${code}`}
                    className="flex items-center justify-between px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-600"
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
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link
              href="/search"
              className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-teal-50 hover:text-teal-600"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Link>
            <Link
              href="/join"
              className="hidden rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600 sm:inline-flex"
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
