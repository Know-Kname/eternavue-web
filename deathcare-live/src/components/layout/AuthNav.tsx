'use client'

import Link from 'next/link'
import { useUser, UserButton } from '@clerk/nextjs'

const IS_CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function ClerkUserNav() {
  const { isLoaded, isSignedIn, user } = useUser()

  if (!isLoaded) {
    return <div className="h-8 w-20 animate-pulse rounded-lg bg-slate-100" />
  }

  if (isSignedIn) {
    return (
      <div className="flex items-center gap-2.5">
        <Link
          href={`/profile/${user.username ?? user.id}`}
          className="hidden text-sm font-medium text-slate-700 transition-colors hover:text-teal-600 sm:block"
        >
          {user.firstName ?? user.username ?? 'Profile'}
        </Link>
        <UserButton />
      </div>
    )
  }

  return (
    <>
      <Link
        href="/login"
        className="hidden rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600 sm:block"
      >
        Sign in
      </Link>
      <Link
        href="/join"
        className="hidden rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600 sm:inline-flex"
      >
        Join free
      </Link>
    </>
  )
}

export function AuthNav() {
  if (IS_CLERK_ENABLED) return <ClerkUserNav />

  return (
    <>
      <Link
        href="/login"
        className="hidden rounded-lg px-3.5 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-teal-50 hover:text-teal-600 sm:block"
      >
        Sign in
      </Link>
      <Link
        href="/join"
        className="hidden rounded-lg bg-teal-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600 sm:inline-flex"
      >
        Join free
      </Link>
    </>
  )
}
