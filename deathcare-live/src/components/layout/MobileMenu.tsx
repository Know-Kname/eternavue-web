'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, ChevronRight } from 'lucide-react'
import { ACTIVE_STATES, STATE_NAMES } from '@/lib/mock-community'
import { useUser, SignOutButton } from '@clerk/nextjs'

const IS_CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function MobileAuthSection({ onClose }: { onClose: () => void }) {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) return null

  if (isSignedIn) {
    return (
      <div className="mt-2 border-t border-slate-100 pt-3 pb-1">
        <Link
          href={`/profile/${user.username ?? user.id}`}
          onClick={onClose}
          className="mb-2 flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-600"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-500 text-xs font-bold text-white">
            {(user.firstName ?? user.username ?? '?')[0].toUpperCase()}
          </div>
          {user.firstName ?? user.username ?? 'Profile'}
        </Link>
        <SignOutButton redirectUrl="/">
          <button className="flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-700">
            Sign out
          </button>
        </SignOutButton>
      </div>
    )
  }

  return (
    <div className="mt-2 border-t border-slate-100 pt-3 pb-1 space-y-2">
      <Link
        href="/login"
        onClick={onClose}
        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-600"
      >
        Sign in
        <ChevronRight className="h-4 w-4 opacity-40" />
      </Link>
      <Link
        href="/join"
        onClick={onClose}
        className="flex w-full items-center justify-center rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
      >
        Join deathcare.live — it&apos;s free
      </Link>
    </div>
  )
}

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
        onClick={() => setOpen((o) => !o)}
        className="rounded-lg p-2 text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600 lg:hidden"
        aria-label="Toggle menu"
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed inset-x-0 top-16 z-50 border-b border-slate-200 bg-white shadow-xl lg:hidden">
            <nav className="mx-auto max-w-7xl space-y-1 px-4 py-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 font-medium text-slate-700 transition-colors hover:bg-teal-50 hover:text-teal-600"
                >
                  {link.label}
                  <ChevronRight className="h-4 w-4 opacity-40" />
                </Link>
              ))}

              <div className="mt-2 border-t border-slate-100 pt-2">
                <p className="px-3 pb-1.5 text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  Bills by State
                </p>
                {ACTIVE_STATES.map((code) => (
                  <Link
                    key={code}
                    href={`/bills/${code}`}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600"
                  >
                    {STATE_NAMES[code]}
                    <ChevronRight className="h-3.5 w-3.5 opacity-40" />
                  </Link>
                ))}
              </div>

              {IS_CLERK_ENABLED ? (
                <MobileAuthSection onClose={() => setOpen(false)} />
              ) : (
                <div className="pt-2 pb-1">
                  <Link
                    href="/join"
                    onClick={() => setOpen(false)}
                    className="flex w-full items-center justify-center rounded-xl bg-teal-500 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
                  >
                    Join deathcare.live — it&apos;s free
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </>
      )}
    </>
  )
}
