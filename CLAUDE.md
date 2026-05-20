# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

This is the standalone **deathcare.live** repository — a Next.js 16 app. Run all commands from the repository root.

```bash
npm run dev          # dev server (http://localhost:3000)
npm run build        # production build — must pass before any commit
npm run type-check   # tsc --noEmit (run this before build to catch errors early)
npm run lint         # eslint . (flat config via eslint-config-next v16)
npm run test         # vitest run (8+ unit tests in src/test/)
npm run test:watch   # vitest in watch mode
npm run format       # prettier --write . (formats all source files)
npm run format:check # prettier --check . (used in CI)
npm run codegen      # generate TypeScript types from WPGraphQL schema (requires live WP)
npm run index:typesense  # sync WordPress listings into Typesense (requires .env.local)
```

**Verification chain before any commit:** `npm run lint && npm run type-check && npm test && npm run build`

## Architecture

### Data layers (three separate backends)

**WordPress / WPGraphQL** — CMS for the directory and articles. All access is in `src/lib/wpgraphql.ts`. Every function in that file has a mock-data fallback: if `NEXT_PUBLIC_WP_GRAPHQL_URL` is not set, `config.environment.useMockData` is `true` and calls return data from `src/lib/mock-data.ts`. The app is fully functional without WordPress.

**Typesense** — Full-text search for listings. Access is in `src/lib/typesense.ts`, with the same mock fallback pattern (falls back to in-memory filter when `TYPESENSE_API_KEY` is absent). Indexing is done via `scripts/index-typesense.ts` (ts-node, uses `tsconfig.scripts.json`).

**Supabase** — Community data (posts, comments, profiles, coalitions, bill follows). Access is in `src/lib/supabase.ts`. Falls back to `src/lib/mock-community.ts` when `NEXT_PUBLIC_SUPABASE_URL` is absent.

### AI integration — Gemini

`src/lib/gemini.ts` wraps the `@google/generative-ai` SDK. Uses `gemini-2.5-flash` by default (configurable via `GEMINI_MODEL`). Two exported functions:

- `generateWeeklyBriefing(input)` — drafts the "State of Deathcare" digest headline + summaries
- `generateBillAnalysis(bill)` — plain-language analysis of a legislative bill for industry pros

Requires `GEMINI_API_KEY` in `.env.local`. `config.environment.useGemini` is `true` when the key is set. All functions return `null` gracefully when the key is absent — no hard dependency.

### URL state management

Client-side filters use **nuqs v2** (`useQueryState` / `useQueryStates`). Always use `shallow: false` on directory filter state so RSC re-fetches on change. Parser imports: `parseAsString`, `parseAsArrayOf`, `parseAsBoolean` from `nuqs`.

### Route patterns

- **RSC (Server Components)**: all `app/` pages that fetch data. `searchParams` is `Promise<...>` — always `await searchParams`.
- **Client Components**: components using nuqs, event handlers, or browser APIs. These live in `src/components/` and are marked `'use client'`.
- **ISR**: directory pages use `export const revalidate = 3600`, profile pages `86400`. On-demand revalidation via `POST /api/revalidate` (requires `x-wpgraphql-smart-cache-secret` header matching `REVALIDATION_SECRET`).

### API routes

- `POST /api/revalidate` — ISR webhook (WordPress → Next.js cache invalidation)
- `POST /api/bills/sync` — LegiScan bill sync cron (every 6h via vercel.json)
- `POST /api/digest/send` — Weekly digest email cron (Mondays 1 PM UTC via vercel.json)

Both cron routes require `Authorization: Bearer <REVALIDATION_SECRET>` header.

### Config

All environment variables are accessed through `src/lib/config.ts` — never read `process.env` directly in components or pages. The config object is `as const` for full type inference.

### Design system

Colors defined in both `tailwind.config.ts` (Tailwind utilities) and `src/styles/globals.css` (`@theme` CSS custom properties for Tailwind v4). Palette: `teal` (primary), `gold` (legislative), `purple` (community/questions), `sky` (operator), `amber` (supplier/position), `green` (educator/report/verified). Dark mode via `darkMode: 'class'`, toggled by `next-themes` in `Providers`.

Fonts: **Instrument Serif** (display, `font-display`) + **Inter** (body, `font-body`) via `next/font/google`.

### Auth — Clerk Core 3

`@clerk/nextjs` v7. `Providers.tsx` conditionally wraps with `ClerkProvider` when `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set. When absent, the app stays in public read-only mode. Auth proxy in `src/proxy.ts` (Next.js 16 renamed `middleware.ts` → `proxy.ts`).

**Safe Clerk hook pattern**: When Clerk may or may not be present, use an inner component that calls `useUser()` only when it's guaranteed to be inside `ClerkProvider`:

```typescript
const IS_CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function ClerkUserNav() {
  const { isLoaded, isSignedIn, user } = useUser() // safe: only mounts when Clerk is enabled
  ...
}
export function AuthNav() {
  if (IS_CLERK_ENABLED) return <ClerkUserNav />
  return <StaticFallback />
}
```

Protected routes: `/profile/[username]/edit` (via `auth.protect()` in proxy.ts).

### API routes

- `POST /api/revalidate` — ISR webhook (WordPress → Next.js cache invalidation)
- `POST /api/bills/sync` — LegiScan bill sync cron (every 6h via vercel.json)
- `POST /api/digest/send` — Weekly digest email cron (Mondays 1 PM UTC via vercel.json)
- `POST /api/posts` — Create community post (Clerk-gated when Clerk is configured)

Cron routes require `Authorization: Bearer <REVALIDATION_SECRET>` header.

### Component structure

```
src/components/
  ui/           → Button, Badge, Card, Input, Skeleton (design system primitives)
  layout/       → Header, Footer, MobileMenu, Providers, AuthNav
  directory/    → ListingCard, ListingGrid, FilterSidebar, SearchInput, CategoryNav, Pagination
  community/    → PostCard, FeedFilter, VerifiedBadge, PostComposer
  legislative/  → BillCard, BillStatusBar, BillSummary, BillPositionPoll, ImpactBadge, ActionKit, CoalitionPanel
  profile/      → ProfileCard
  resources/    → ArticleCard, ArticleGrid
```

Utility: `cn()` in `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge).

### Key shared constants

- `ACTIVE_STATES` — `['MI', 'OH', 'IL', 'WA', 'TX']` from `mock-community.ts` — single source of truth for active states
- `STATUS_BADGE` — bill status → label+className mapping from `bill-utils.ts`
- `TERMINAL_STATUSES` — `['signed', 'failed', 'vetoed']` from `bill-utils.ts`

### GraphQL

Raw query strings live in `src/gql/queries.ts`. The `codegen` script generates typed helpers into `src/gql/__generated__/` (gitignored; run after WordPress is connected).

### TypeScript paths

`@/*` → `src/*`. Use this alias everywhere; never use relative `../../` imports across feature boundaries.

## Key environment variables

```
NEXT_PUBLIC_WP_GRAPHQL_URL       # e.g. https://deathcare.live/graphql (omit → mock mode)
TYPESENSE_HOST / PORT / PROTOCOL # Typesense server (default: localhost:8108/http)
TYPESENSE_API_KEY                # admin key (server-only)
NEXT_PUBLIC_TYPESENSE_SEARCH_KEY # read-only search key (browser-safe)
REVALIDATION_SECRET              # shared secret for ISR webhook + cron auth
NEXT_PUBLIC_SUPABASE_URL         # Supabase project URL (omit → mock community data)
NEXT_PUBLIC_SUPABASE_ANON_KEY    # Supabase anon key
SUPABASE_SERVICE_ROLE_KEY        # Supabase service role key (server-only)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY # Clerk auth (omit → public read-only mode)
CLERK_SECRET_KEY                 # Clerk secret (server-only)
LEGISCAN_API_KEY                 # LegiScan legislative data (omit → mock bills)
GEMINI_API_KEY                   # Google Gemini (omit → AI features disabled, app still works)
GEMINI_MODEL                     # Default: gemini-2.5-flash
RESEND_API_KEY                   # Email digest sending
```

## Listing types

Six listing types are defined in `src/lib/listing-types.ts` — `LISTING_TYPE_MAP` maps URL slugs (e.g. `funeral-homes`) to WordPress CPT names (e.g. `funeral_home`). Use `isValidListingType()` before casting a URL param, and `cptToListingType()` when mapping WP data back to URL slugs.

## CI

`.github/workflows/ci.yml` runs lint, type-check, format check, test, and build on Node 20 and 22 for every push and PR to `main`. All five steps must pass.
