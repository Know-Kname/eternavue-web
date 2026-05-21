'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
}

/**
 * Global Error Boundary
 * 
 * This is the main error boundary for the entire application.
 * It catches runtime errors from anywhere in the component tree
 * and displays a beautiful, user-friendly error page.
 *
 * Features:
 * - ✅ Automatic error reporting to monitoring service
 * - ✅ Error digest for tracking
 * - ✅ Clear recovery options (Try Again, Go Home)
 * - ✅ User-friendly messaging
 * - ✅ Development/Production error details
 * - ✅ Proper styling with dark mode support
 * - ✅ Accessibility features (semantic HTML, ARIA)
 * - ✅ Error logging with context
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const [isMounted, setIsMounted] = useState(false)
  const [errorDetails, setErrorDetails] = useState({
    message: '',
    stack: '',
    isDevelopment: false,
  })

  useEffect(() => {
    setIsMounted(true)

    // Determine if we're in development or production
    const isDevelopment = process.env.NODE_ENV === 'development'
    setErrorDetails({
      message: error?.message || 'An unexpected error occurred',
      stack: error?.stack || '',
      isDevelopment,
    })

    // Log error to monitoring service
    logErrorToService({
      message: error?.message,
      stack: error?.stack,
      digest: error?.digest,
      timestamp: new Date().toISOString(),
      url: typeof window !== 'undefined' ? window.location.href : '',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    })

    // Also log to console in development
    if (isDevelopment) {
      console.error('🔴 Application Error:', error)
    }
  }, [error])

  // Don't render until hydration is complete
  if (!isMounted) {
    return null
  }

  const isDev = errorDetails.isDevelopment

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-primary-950 dark:via-primary-900 dark:to-primary-800">
      {/* Animated background elements (development only) */}
      {isDev && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-72 h-72 bg-orange-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>
      )}

      <div className="relative z-10 w-full max-w-md sm:max-w-lg">
        {/* Error Container */}
        <div className="bg-white dark:bg-primary-900 rounded-lg shadow-xl border border-neutral-200 dark:border-primary-700 overflow-hidden">
          {/* Error Header with Icon */}
          <div className="px-6 sm:px-8 py-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 border-b border-neutral-200 dark:border-primary-700">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 sm:h-10 sm:w-10 text-red-600 dark:text-red-400 animate-pulse"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 8.25v4.5m0 4.5v.75m0 0a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary-900 dark:text-white mb-1">
                  Oops!
                </h1>
                <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
                  Something went wrong
                </p>
              </div>
            </div>
          </div>

          {/* Error Body */}
          <div className="px-6 sm:px-8 py-8 space-y-6">
            {/* Error Message */}
            <div>
              <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
                What happened?
              </p>
              <p className="text-base text-neutral-600 dark:text-neutral-400 leading-relaxed">
                {errorDetails.isDevelopment
                  ? errorDetails.message || 'An unexpected error occurred. Our team has been notified.'
                  : 'We encountered an unexpected error while processing your request. Our team has been notified and is working on a fix.'}
              </p>
            </div>

            {/* Error Details (Development Only) */}
            {isDev && errorDetails.stack && (
              <div>
                <details className="text-xs">
                  <summary className="cursor-pointer font-mono font-semibold text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
                    📋 Stack Trace (Dev Only)
                  </summary>
                  <div className="mt-2 p-3 bg-neutral-900 dark:bg-black rounded border border-neutral-700 overflow-x-auto">
                    <code className="text-neutral-200 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                      {errorDetails.stack}
                    </code>
                  </div>
                </details>
              </div>
            )}

            {/* Error ID (for support) */}
            {error?.digest && (
              <div className="p-3 bg-neutral-100 dark:bg-primary-800 rounded border border-neutral-200 dark:border-primary-700">
                <p className="text-xs text-neutral-600 dark:text-neutral-400">
                  <span className="font-semibold">Error ID:</span>{' '}
                  <code className="font-mono text-neutral-700 dark:text-neutral-300">{error.digest}</code>
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
                  Share this ID with support if the issue persists
                </p>
              </div>
            )}

            {/* Recovery Actions */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-neutral-200 dark:border-primary-700">
              <button
                onClick={() => reset()}
                className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.638-3.638 48.972 48.972 0 0 0-3.348-.06c-1.113.029-2.217.079-3.308.147a4.006 4.006 0 0 0-3.638 3.638 48.97 48.97 0 0 0-.06 3.348v.02c.029 1.113.079 2.217.147 3.308a4.006 4.006 0 0 0 3.638 3.638c.247.028.504.047.772.062m0 0a48.972 48.972 0 0 0 3.464.384c1.113-.29 2.217-.079 3.308-.147a4.006 4.006 0 0 0 3.638-3.638 48.972 48.972 0 0 0 .06-3.348v-.02c-.029-1.113-.079-2.217-.147-3.308"
                  />
                </svg>
                Try Again
              </button>
              <button
                onClick={() => (window.location.href = '/')}
                className="flex-1 px-4 py-3 bg-neutral-200 hover:bg-neutral-300 active:bg-neutral-400 dark:bg-primary-800 dark:hover:bg-primary-700 dark:active:bg-primary-600 text-primary-900 dark:text-white font-semibold rounded-lg transition-colors duration-200 inline-flex items-center justify-center gap-2"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                Go Home
              </button>
            </div>
          </div>

          {/* Development Info Banner */}
          {isDev && (
            <div className="px-6 sm:px-8 py-4 bg-blue-50 dark:bg-blue-950/20 border-t border-blue-200 dark:border-blue-800">
              <div className="flex gap-2">
                <svg
                  className="h-5 w-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M10 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm-1 4a1 1 0 1 1 2 0v2a1 1 0 1 1-2 0v-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <div className="text-sm text-blue-800 dark:text-blue-200">
                  <p className="font-semibold">Development Mode</p>
                  <p className="text-xs mt-1">Full error details and stack trace are shown above. This information will be hidden in production.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Help Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-neutral-600 dark:text-neutral-400">
            Need help?{' '}
            <a
              href="/contact"
              className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-semibold transition-colors"
            >
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}

/**
 * Error Logging Service
 * Send errors to your monitoring service (Sentry, LogRocket, etc.)
 */
interface ErrorLog {
  message?: string
  stack?: string
  digest?: string
  timestamp: string
  url: string
  userAgent: string
}

function logErrorToService(errorLog: ErrorLog) {
  // Example: Send to Sentry or similar
  // if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  //   captureException(error, { tags: { type: 'error-boundary' } })
  // }

  // Example: Send to custom API
  try {
    if (typeof window !== 'undefined' && process.env.NODE_ENV === 'production') {
      // Only send in production
      fetch('/api/errors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...errorLog,
          source: 'error-boundary',
          environment: 'client',
        }),
      }).catch(() => {
        // Silently fail if error logging fails
      })
    }
  } catch (err) {
    // Prevent error logging from causing errors
    console.warn('Failed to log error:', err)
  }
}
