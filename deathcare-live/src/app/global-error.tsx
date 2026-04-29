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
      <body className="bg-warm-50 min-h-screen flex items-center justify-center p-8">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-serif font-bold text-slate-800 mb-3">
            Something went wrong
          </h1>
          <p className="text-slate-500 mb-6">
            An unexpected error occurred. Please try again or return to the directory.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <pre className="text-xs text-left bg-slate-100 text-red-600 p-4 rounded-lg mb-6 overflow-auto max-h-40">
              {error.message}
            </pre>
          )}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={reset}
              className="px-5 py-2.5 rounded-lg bg-sage-400 text-white font-medium hover:bg-sage-500 transition-colors text-sm"
            >
              Try Again
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-lg border border-slate-300 text-slate-600 font-medium hover:bg-warm-100 transition-colors text-sm"
            >
              Go Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
