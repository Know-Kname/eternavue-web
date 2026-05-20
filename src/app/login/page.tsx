import Link from 'next/link'
import { SignIn } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign in — deathcare.live',
  description: 'Sign in to your deathcare.live account.',
}

const isClerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function LoginPage() {
  if (!isClerkEnabled) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
            <svg
              className="h-7 w-7 text-teal-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <h1 className="mb-2 font-serif text-2xl font-bold text-slate-900">
            Authentication coming soon
          </h1>
          <p className="mb-6 text-slate-500">
            Member accounts are being set up. In the meantime, you can browse the platform freely.
          </p>
          <Link
            href="/join"
            className="inline-flex rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
          >
            Learn about membership
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="font-serif text-2xl font-bold text-slate-900">Welcome back</h1>
          <p className="mt-2 text-sm text-slate-500">Sign in to your deathcare.live account</p>
        </div>
        <SignIn
          fallbackRedirectUrl="/feed"
          appearance={{
            variables: { colorPrimary: '#0d9488', borderRadius: '0.75rem' },
            elements: {
              card: 'shadow-none border border-slate-200 rounded-2xl',
              headerTitle: 'hidden',
              headerSubtitle: 'hidden',
            },
          }}
        />
        <p className="mt-6 text-center text-sm text-slate-500">
          New to deathcare.live?{' '}
          <Link
            href="/join"
            className="font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            Apply for access
          </Link>
        </p>
      </div>
    </div>
  )
}
