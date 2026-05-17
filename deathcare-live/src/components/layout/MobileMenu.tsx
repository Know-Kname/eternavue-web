'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'
import { ACTIVE_STATES, STATE_NAMES } from '@/lib/mock-community'

const NAV_LINKS = [
  { href: '/feed', label: 'Feed' },
  { href: '/states', label: 'States' },
  { href: '/directory', label: 'Directory' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/resources', label: 'Resources' },
]

export function MobileMenu() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className="lg:hidden p-2 text-slate-600 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-16 inset-x-0 z-50 bg-white border-b border-slate-200 shadow-xl lg:hidden">
            <nav className="max-w-7xl mx-auto px-4 py-4 space-y-1">
              {NAV_LINKS.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between px-3 py-2.5 rounded-lg text-slate-700 hover:text-teal-600 hover:bg-teal-50 transition-colors font-medium"
                >
                  {link.label}
                  <ChevronRight className="w-4 h-4 opacity-40" />
                </Link>
              ))}

              <div className="pt-2 border-t border-slate-100 mt-2">
                <p className="px-3 pb-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Bills by State
                </p>
                {ACTIVE_STATES.map(code => (
                  <Link
                    key={code}
                    href={`/bills/${code}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between px-3 py-2 rounded-lg text-sm text-slate-600 hover:text-teal-600 hover:bg-teal-50 transition-colors"
                  >
                    {STATE_NAMES[code]}
                    <ChevronRight className="w-3.5 h-3.5 opacity-40" />
                  </Link>
                ))}
              </div>

              <div className="pt-2 pb-1">
                <Link
                  href="/join"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-full py-3 rounded-xl bg-teal-500 text-white font-semibold text-sm hover:bg-teal-600 transition-colors"
                >
                  Join deathcare.live — it&apos;s free
                </Link>
              </div>
            </nav>
          </div>
        </>
      )}
    </>
  )
}
