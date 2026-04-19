export const config = {
  wp: {
    graphqlUrl: process.env.NEXT_PUBLIC_WP_GRAPHQL_URL || '',
  },

  tally: {
    listingClaimId: process.env.NEXT_PUBLIC_TALLY_LISTING_CLAIM_ID || '',
    contactId: process.env.NEXT_PUBLIC_TALLY_CONTACT_ID || '',
  },

  typesense: {
    host: process.env.TYPESENSE_HOST || 'localhost',
    port: parseInt(process.env.TYPESENSE_PORT || '8108', 10),
    protocol: (process.env.TYPESENSE_PROTOCOL || 'http') as 'http' | 'https',
    apiKey: process.env.TYPESENSE_API_KEY || '',
    searchKey: process.env.NEXT_PUBLIC_TYPESENSE_SEARCH_KEY || '',
  },

  revalidation: {
    secret: process.env.REVALIDATION_SECRET || '',
    listingsTtl: 3600,
    profileTtl: 86400,
  },

  analytics: {
    id: process.env.NEXT_PUBLIC_GA_ID || '',
    enabled: !!process.env.NEXT_PUBLIC_GA_ID,
  },

  environment: {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    useMockData: !process.env.NEXT_PUBLIC_WP_GRAPHQL_URL,
  },
} as const

export type Config = typeof config
