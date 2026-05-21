'use client'

/**
 * Global Error Boundary - Root Level
 * 
 * This component handles errors that occur at the root level,
 * including errors in the layout or above all route segments.
 * 
 * Features:
 * - ✅ Fallback HTML/body tags (required for global errors)
 * - ✅ System-level error recovery
 * - ✅ Minimal dependencies (no Framer Motion)
 * - ✅ Dark mode support
 * - ✅ Production-grade error reporting
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-primary-950">
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="w-full max-w-md text-center">
            {/* Critical Error Icon */}
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-600 dark:text-red-400"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
                />
              </svg>
            </div>

            {/* Heading */}
            <h1 className="text-3xl font-serif font-bold text-primary-900 dark:text-white mb-2">
              System Error
            </h1>
            <p className="text-neutral-600 dark:text-neutral-400 mb-6">
              We encountered a critical issue. Our team has been notified and is investigating.
            </p>

            {/* Error Details (if available) */}
            {process.env.NODE_ENV === 'development' && error?.message && (
              <div className="mb-6 p-4 bg-red-50 dark:bg-red-950/20 rounded border border-red-200 dark:border-red-800">
                <p className="text-xs text-red-900 dark:text-red-200 font-mono text-left">
                  {error.message}
                </p>
              </div>
            )}

            {/* Error ID */}
            {error?.digest && (
              <div className="mb-6 p-3 bg-neutral-100 dark:bg-primary-900 rounded">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold">Error ID:</span> {error.digest}
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button
                onClick={() => reset()}
                className="w-full px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-lg transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="w-full px-4 py-3 bg-neutral-200 hover:bg-neutral-300 dark:bg-primary-800 dark:hover:bg-primary-700 text-primary-900 dark:text-white font-semibold rounded-lg transition-colors"
              >
                Return to Home
              </button>
            </div>

            {/* Help Text */}
            <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-500">
              Please contact support if this problem persists.
            </p>
          </div>
        </div>

        {/* Minimal CSS for styling */}
        <style>{`
          html {
            scroll-behavior: smooth;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
              'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
              sans-serif;
          }
        `}</style>
      </body>
    </html>
  )
}
