'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

/**
 * Advanced 404 Not Found Page
 * 
 * Features:
 * - ✅ Beautiful, branded design
 * - ✅ Smooth animations
 * - ✅ Multiple navigation options
 * - ✅ Helpful suggestions
 * - ✅ Dark mode support
 * - ✅ Mobile responsive
 * - ✅ Accessibility optimized
 */
export default function NotFound() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-white via-neutral-50 to-neutral-100 dark:from-primary-950 dark:via-primary-900 dark:to-primary-800">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-1/4 -right-20 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute bottom-1/4 -left-20 w-96 h-96 bg-holographic-cyan/5 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="text-center"
        >
          {/* 404 Number with Animation */}
          <motion.div variants={item} className="mb-8">
            <div className="flex justify-center">
              <motion.span
                animate={{ rotateZ: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-9xl sm:text-[10rem] font-serif font-bold bg-gradient-to-r from-primary-600 via-accent-500 to-holographic-cyan bg-clip-text text-transparent"
              >
                404
              </motion.span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={item}
            className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-primary-900 dark:text-white mb-3"
          >
            Page Not Found
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-lg mx-auto leading-relaxed"
          >
            The page you're looking for doesn't exist or has been moved. Don't worry, we'll help you find what you need.
          </motion.p>

          {/* Helpful Suggestions */}
          <motion.div variants={item} className="mb-10 p-6 bg-neutral-50 dark:bg-primary-900/50 rounded-lg border border-neutral-200 dark:border-primary-700">
            <p className="text-sm font-semibold text-neutral-700 dark:text-neutral-300 mb-3">
              Here are some helpful places to explore:
            </p>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <Link
                href="/"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                → Home
              </Link>
              <Link
                href="/contact"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                → Contact Us
              </Link>
              <button
                onClick={() => window.history.back()}
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                ← Go Back
              </button>
              <Link
                href="/sitemap"
                className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 font-medium transition-colors"
              >
                → Sitemap
              </Link>
            </div>
          </motion.div>

          {/* Primary Action Button */}
          <motion.div variants={item} className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link
              href="/"
              className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <svg
                className="h-5 w-5"
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
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="px-8 py-3 bg-neutral-200 hover:bg-neutral-300 dark:bg-primary-800 dark:hover:bg-primary-700 text-primary-900 dark:text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
              Go Back
            </button>
          </motion.div>

          {/* Holographic Contact */}
          <motion.p
            variants={item}
            className="text-sm text-neutral-500 dark:text-neutral-400"
          >
            Still lost?{' '}
            <Link
              href="/contact"
              className="text-accent-600 dark:text-accent-400 hover:text-accent-700 dark:hover:text-accent-300 font-semibold transition-colors"
            >
              Reach out to our team
            </Link>
            {' '}and we'll point you in the right direction.
          </motion.p>
        </motion.div>

        {/* Holographic Visual Element */}
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mt-12 flex justify-center"
        >
          <div className="inline-block p-4 rounded-lg border border-holographic-cyan/30 bg-holographic-cyan/5">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [20, 40, 20] }}
                  transition={{ duration: 1.5, delay: i * 0.15, repeat: Infinity }}
                  className="w-1 bg-gradient-to-t from-holographic-cyan to-accent-500 rounded"
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
