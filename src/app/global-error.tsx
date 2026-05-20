'use client'

import Link from 'next/link'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en">
      <body className="bg-warm-50 flex min-h-screen items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h1 className="mb-3 font-serif text-2xl font-bold text-slate-800">
            Something went wrong
          </h1>
          <p className="mb-6 text-slate-500">
            An unexpected error occurred. Please try again or return to the directory.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="mb-6 max-h-40 overflow-auto rounded-lg bg-slate-100 p-4 text-left text-xs text-red-600">
              {error.message}
            </pre>
          )}
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <button
              onClick={reset}
              className="bg-sage-400 hover:bg-sage-500 rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="hover:bg-warm-100 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-medium text-slate-600 transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
