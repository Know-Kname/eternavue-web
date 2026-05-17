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

  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  },

  clerk: {
    publishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || '',
    secretKey: process.env.CLERK_SECRET_KEY || '',
  },

  legiscan: {
    apiKey: process.env.LEGISCAN_API_KEY || '',
    baseUrl: 'https://api.legiscan.com/',
    cacheTtlHours: 6,
  },

  resend: {
    apiKey: process.env.RESEND_API_KEY || '',
    fromEmail: process.env.RESEND_FROM_EMAIL || 'digest@deathcare.live',
    replyTo: process.env.RESEND_REPLY_TO || 'hello@deathcare.live',
  },

  cloudinary: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || '',
    uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || '',
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
    useMockCommunity: !process.env.NEXT_PUBLIC_SUPABASE_URL,
    useClerk: !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
  },
} as const

export type Config = typeof config
