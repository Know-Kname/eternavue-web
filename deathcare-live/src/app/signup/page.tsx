import Link from 'next/link'
import { SignUp } from '@clerk/nextjs'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create your account — deathcare.live',
  description: 'Create a deathcare.live account to join the professional community.',
}

const isClerkEnabled = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

export default function SignUpPage() {
  if (!isClerkEnabled) {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full bg-teal-50">
            <svg className="h-7 w-7 text-teal-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM19 8v6M22 11h-6" />
            </svg>
          </div>
          <h1 className="mb-2 font-serif text-2xl font-bold text-slate-900">Member accounts launching soon</h1>
          <p className="mb-6 text-slate-500">
            We&apos;re finalizing account setup. You can preview all platform features while we prepare.
          </p>
          <div className="flex flex-col gap-3">
            <Link
              href="/join"
              className="inline-flex justify-center rounded-xl bg-teal-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-teal-600"
            >
              Preview membership options
            </Link>
            <Link
              href="/feed"
              className="inline-flex justify-center rounded-xl border border-slate-200 px-6 py-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Browse the feed
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full bg-teal-50 px-3 py-1 text-sm font-medium text-teal-700">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-teal-500" />
            Founding member period — free access
          </div>
          <h1 className="font-serif text-2xl font-bold text-slate-900">Create your account</h1>
          <p className="mt-2 text-sm text-slate-500">
            Join the professional community for deathcare operators
          </p>
        </div>
        <SignUp
          fallbackRedirectUrl="/join"
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
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-teal-600 transition-colors hover:text-teal-700">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
