'use client'

import { ThemeProvider } from 'next-themes'
import { NuqsAdapter } from 'nuqs/adapters/next/app'
import type { ReactNode } from 'react'
import { ClerkProvider } from '@clerk/nextjs'

const CLERK_KEY = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || ''

const clerkAppearance = {
  variables: {
    colorPrimary: '#0d9488',
    colorTextOnPrimaryBackground: '#ffffff',
    borderRadius: '0.75rem',
    fontFamily: 'Inter, sans-serif',
  },
}

export function Providers({ children }: { children: ReactNode }) {
  const inner = (
    <NuqsAdapter>
      <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </NuqsAdapter>
  )

  if (!CLERK_KEY) return inner

  return (
    <ClerkProvider publishableKey={CLERK_KEY} appearance={clerkAppearance}>
      {inner}
    </ClerkProvider>
  )
}
