/**
 * Environment Configuration
 * Centralized configuration for all environments
 *
 * Usage:
 *   import { config } from '@/lib/config'
 *   config.tally.memorialFormId
 */

export const config = {
  /**
   * Tally Forms Configuration
   * IDs for different inquiry forms
   */
  tally: {
    memorialFormId: process.env.NEXT_PUBLIC_TALLY_MEMORIAL_ID || '',
    eventFormId: process.env.NEXT_PUBLIC_TALLY_EVENT_ID || '',
    corporateFormId: process.env.NEXT_PUBLIC_TALLY_CORPORATE_ID || '',
  },

  /**
   * API Configuration
   * Backend endpoints and URLs
   */
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    timeout: 30000, // 30 seconds
  },

  /**
   * Analytics Configuration
   * Google Analytics or similar tracking
   */
  analytics: {
    id: process.env.NEXT_PUBLIC_ANALYTICS_ID || '',
    enabled: process.env.NEXT_PUBLIC_ANALYTICS_ID ? true : false,
  },

  /**
   * Sentry Error Tracking (optional)
   * For production error monitoring
   */
  sentry: {
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || '',
    enabled: process.env.NEXT_PUBLIC_SENTRY_DSN ? true : false,
  },

  /**
   * Feature Flags
   * Control feature availability per environment
   */
  features: {
    showPortfolio: process.env.NEXT_PUBLIC_SHOW_PORTFOLIO !== 'false',
    showBlog: process.env.NEXT_PUBLIC_SHOW_BLOG !== 'false',
    enableChat: process.env.NEXT_PUBLIC_ENABLE_CHAT === 'true',
  },

  /**
   * Environment Detection
   */
  environment: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isPreview: process.env.VERCEL_ENV === 'preview',
  },
} as const

// Validation: Ensure required env vars are present in production
if (config.environment.isProduction) {
  if (!config.tally.memorialFormId) {
    console.warn('⚠️ NEXT_PUBLIC_TALLY_MEMORIAL_ID not configured in production')
  }
  if (!config.analytics.id) {
    console.warn('⚠️ NEXT_PUBLIC_ANALYTICS_ID not configured in production')
  }
}

export type Config = typeof config
