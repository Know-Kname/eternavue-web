# Implementation Guide - Eternavue Web Audit Fixes

**Status:** ✅ All fixes are ready to implement  
**Complexity:** Low to Medium  
**Time to Complete:** 2-3 hours

---

## Phase 1: Critical Fixes (Do Now)

### ✅ Fix 1: Add Error Boundaries

**Files Created:**
- `src/app/error.tsx` - Global error boundary
- `src/app/not-found.tsx` - 404 page

**What This Does:**
- Catches runtime errors and shows user-friendly message instead of white screen
- Shows 404 page for missing routes
- Logs error ID for debugging

**Status:** ✅ **READY** - Files created and placed

**To Activate:**
```bash
# Already in place, no action needed
# These files are automatically picked up by Next.js
```

---

### ✅ Fix 2: Environment Configuration

**Files Created:**
- `.env.example` - Template for environment variables
- `src/lib/config.ts` - Configuration manager

**What This Does:**
- Centralizes all configuration in one place
- Supports different values per environment (dev/staging/prod)
- Validates required variables in production
- Type-safe configuration object

**Setup Instructions:**

1. **For Local Development:**
```bash
# Copy example to local env
cp .env.example .env.local

# Fill in your values
NEXT_PUBLIC_TALLY_MEMORIAL_ID=your_form_id_here
NEXT_PUBLIC_ANALYTICS_ID=GA-your-id
```

2. **For Vercel Deployment:**
```
Go to: Vercel Project → Settings → Environment Variables

Add:
- NEXT_PUBLIC_TALLY_MEMORIAL_ID=...
- NEXT_PUBLIC_TALLY_EVENT_ID=...
- NEXT_PUBLIC_TALLY_CORPORATE_ID=...
- NEXT_PUBLIC_ANALYTICS_ID=...
```

3. **Use in Components:**
```typescript
import { config } from '@/lib/config'

// In your forms
const tallyId = config.tally.memorialFormId
```

**Status:** ✅ **READY** - Files created

---

### ✅ Fix 3: Security Headers

**File Updated:**
- `next.config.ts` - Added security headers

**What This Does:**
- Prevents XSS (Cross-Site Scripting)
- Prevents clickjacking
- Prevents MIME-type sniffing
- Restricts browser APIs (camera, microphone, geolocation)

**Headers Added:**
```
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
```

**Status:** ✅ **READY** - File updated

**Test:**
```bash
# After deployment, check headers with
curl -I https://eternavue.com

# Should see the security headers in response
```

---

## Phase 2: Important Fixes (Before Launch)

### Fix 4: Motion Animation Preferences

**File to Create:** `src/lib/motion.ts`

```typescript
// src/lib/motion.ts
export function getMotionPreferences() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getAnimationDuration(shouldReduce: boolean) {
  return shouldReduce ? 0 : 0.8
}

export function getAnimationConfig(delayMs = 0) {
  const prefersReduced = getMotionPreferences()
  return {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: {
      duration: prefersReduced ? 0 : 0.8,
      delay: delayMs,
      ease: "easeOut",
    },
  }
}
```

**Update in Components:**
```typescript
import { getAnimationConfig } from '@/lib/motion'

export function Hero() {
  return (
    <motion.h1 {...getAnimationConfig()}>
      Holographic Experiences
    </motion.h1>
  )
}
```

**Status:** 📝 **TEMPLATE READY** - Create file and update components

---

### Fix 5: Form Loading States

**Update Forms:** `src/components/forms/*`

**Example:**
```typescript
'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/Button'

export function MemorialBookingForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitMessage('')

    try {
      // Tally form handles submission
      // Just show loading state
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitMessage('Thank you! We\'ll be in touch soon.')
    } catch (error) {
      setSubmitMessage('There was an issue submitting the form.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      <Button disabled={isSubmitting} type="submit">
        {isSubmitting ? 'Submitting...' : 'Request Demo'}
      </Button>
      {submitMessage && (
        <p className="mt-4 text-sm text-accent-600">{submitMessage}</p>
      )}
    </form>
  )
}
```

**Status:** 📝 **TEMPLATE READY** - Apply to each form component

---

### Fix 6: Analytics Setup

**File to Create:** `src/providers/AnalyticsProvider.tsx`

```typescript
'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { config } from '@/lib/config'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!config.analytics.enabled) return

    // Track page view
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', config.analytics.id, {
        page_path: pathname,
      })
    }
  }, [pathname])

  return children
}
```

**Add Google Analytics Script to Layout:**
```typescript
// src/app/layout.tsx
import { AnalyticsProvider } from '@/providers/AnalyticsProvider'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_ANALYTICS_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
            `,
          }}
        />
      </head>
      <body>
        <AnalyticsProvider>
          {children}
        </AnalyticsProvider>
      </body>
    </html>
  )
}
```

**Status:** 📝 **TEMPLATE READY** - Create provider and update layout

**To Enable:**
1. Get Google Analytics ID: Go to Google Analytics → Admin → Property → Data Streams
2. Copy the Measurement ID (format: `G-XXXXXXXXXX`)
3. Add to `.env.local` and Vercel

---

## Phase 3: SEO & Polish (After MVP Launch)

### Fix 7: Metadata Generator

**File to Create:** `src/lib/metadata-generator.ts`

```typescript
import type { Metadata } from 'next'

interface MetadataConfig {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
}

export function generateSiteMetadata(config: MetadataConfig): Metadata {
  return {
    title: `${config.title} | Eternavue`,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      type: 'website',
      images: config.ogImage ? [{ url: config.ogImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: config.title,
      description: config.description,
    },
  }
}
```

**Status:** 📝 **TEMPLATE READY** - Use for future pages

---

### Fix 8: Sitemap

**File to Create:** `public/sitemap.xml`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://eternavue.com</loc>
    <lastmod>2026-02-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://eternavue.com/portfolio</loc>
    <lastmod>2026-02-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>
```

**Status:** 📝 **TEMPLATE READY**

---

### Fix 9: Robots.txt

**File to Create:** `public/robots.txt`

```
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /.env*
Disallow: /api/

Sitemap: https://eternavue.com/sitemap.xml
```

**Status:** 📝 **TEMPLATE READY**

---

## Implementation Checklist

### Immediate (Done Now ✅)
- [x] Error boundaries added (error.tsx, not-found.tsx)
- [x] Environment config created (config.ts, .env.example)
- [x] Security headers configured (next.config.ts)

### Before First Deploy (Do This Week)
- [ ] Setup analytics ID in Vercel
- [ ] Create and test error pages
- [ ] Verify environment variables in Vercel

### Before Launch (Do This Before Going Live)
- [ ] Update forms with loading states
- [ ] Add motion preferences library
- [ ] Setup Google Analytics
- [ ] Create sitemap.xml
- [ ] Create robots.txt
- [ ] Run Lighthouse audit
- [ ] Test 404 and error pages
- [ ] Test dark mode thoroughly

### Nice-to-Have (After MVP)
- [ ] Add image optimization guide
- [ ] Create metadata generator
- [ ] Setup Sentry error tracking
- [ ] Add feature flags

---

## Testing Your Fixes

### Test Error Page
```bash
# Navigate to non-existent page
http://localhost:3000/this-does-not-exist
# Should see 404 page

# Trigger error (add this temporarily to page.tsx):
throw new Error('Test error')
# Should see error.tsx page
```

### Test Environment Config
```bash
# Check config loads without errors
npm run type-check

# Check production warnings
NODE_ENV=production npm run build
```

### Test Security Headers (After Deploy)
```bash
curl -I https://eternavue.vercel.app

# Should see all security headers:
# X-Content-Type-Options: nosniff
# X-Frame-Options: DENY
# etc.
```

### Test Dark Mode
- Toggle dark mode in components
- Verify colors look good
- Check contrast in both themes

---

## Deployment Steps (Vercel)

1. **Push to GitHub:**
```bash
git add .
git commit -m "Add error boundaries, security headers, and env config"
git push origin main
```

2. **Add Environment Variables in Vercel:**
- Go to Settings → Environment Variables
- Add all variables from `.env.example`
- Redeploy

3. **Test Production:**
```bash
# Visit your Vercel URL
https://eternavue.vercel.app

# Test 404: /not-found-page
# Test forms: Fill out inquiry form
# Test dark mode: Toggle theme
# Check headers: curl -I https://eternavue.vercel.app
```

---

## Quick Reference

### Files Created/Modified
- ✅ `src/app/error.tsx` - ERROR BOUNDARY
- ✅ `src/app/not-found.tsx` - 404 PAGE
- ✅ `src/lib/config.ts` - ENVIRONMENT CONFIG
- ✅ `.env.example` - ENV TEMPLATE
- ✅ `next.config.ts` - SECURITY HEADERS

### Files to Create (Next)
- 📝 `src/lib/motion.ts` - ANIMATION PREFERENCES
- 📝 `src/providers/AnalyticsProvider.tsx` - ANALYTICS
- 📝 `public/sitemap.xml` - SEO SITEMAP
- 📝 `public/robots.txt` - ROBOTS FILE

---

**Total Implementation Time:** ~3-4 hours  
**Difficulty:** Low to Medium  
**Risk Level:** Very Low (all changes are additive)

All critical fixes are ready to use. Copy and paste the code, commit, and deploy!

Let me know if you have questions about any implementation.
