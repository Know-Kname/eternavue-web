# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

All commands must be run from inside `deathcare-live/` — this is a subdirectory of `eternavue-web/`. The working directory does NOT persist between separate Bash tool calls; always prefix with `cd /home/user/eternavue-web/deathcare-live &&`.

```bash
npm run dev          # dev server (defaults to :3000; use -- -p 3001 to avoid conflict with parent)
npm run build        # production build — must pass before any commit
npm run type-check   # tsc --noEmit (run this before build to catch errors early)
npm run lint         # ESLint via next lint
npm run codegen      # generate TypeScript types from WPGraphQL schema (requires live WP)
npm run index:typesense  # sync WordPress listings into Typesense (requires .env.local)
```

**No test suite yet.** Type-check + lint + build is the verification chain.

## Architecture

### Data layers (two separate backends)

**WordPress / WPGraphQL** — CMS for the directory and articles. All access is in `src/lib/wpgraphql.ts`. Every function in that file has a mock-data fallback: if `NEXT_PUBLIC_WP_GRAPHQL_URL` is not set, `config.environment.useMockData` is `true` and calls return data from `src/lib/mock-data.ts`. The app is fully functional without WordPress.

**Typesense** — Full-text search for listings. Access is in `src/lib/typesense.ts`, with the same mock fallback pattern (falls back to in-memory filter when `TYPESENSE_API_KEY` is absent). Indexing is done via `scripts/index-typesense.ts` (ts-node, uses `tsconfig.scripts.json`).

### URL state management

Client-side filters use **nuqs v2** (`useQueryState` / `useQueryStates`). Always use `shallow: false` on directory filter state so RSC re-fetches on change. Parser imports: `parseAsString`, `parseAsArrayOf`, `parseAsBoolean` from `nuqs`.

### Route patterns

- **RSC (Server Components)**: all `app/` pages that fetch data. `searchParams` is `Promise<...>` — always `await searchParams`.
- **Client Components**: components using nuqs, event handlers, or browser APIs. These live in `src/components/` and are marked `'use client'`.
- **ISR**: directory pages use `export const revalidate = 3600`, profile pages `86400`. On-demand revalidation via `POST /api/revalidate` (requires `x-wpgraphql-smart-cache-secret` header matching `REVALIDATION_SECRET`).

### Config

All environment variables are accessed through `src/lib/config.ts` — never read `process.env` directly in components or pages. The config object is `as const` for full type inference.

### Design system

Colors defined in both `tailwind.config.ts` (Tailwind utilities) and `src/styles/globals.css` (`@theme` CSS custom properties for Tailwind v4). Current palette: `sage` (directory/brand), `clay` (accent), `warm` (backgrounds), `gold` (highlights). Dark mode via `darkMode: 'class'`, toggled by `next-themes` in `Providers`.

Font: Inter via `next/font/google` loaded in `layout.tsx`.

### Component structure

```
src/components/
  ui/           → Button, Badge, Card, Input, Skeleton (design system primitives)
  layout/       → Header, Footer, Providers (app shell)
  directory/    → ListingCard, ListingGrid, FilterSidebar, SearchInput, CategoryNav, Pagination
  resources/    → ArticleCard, ArticleGrid
```

Utility: `cn()` in `src/lib/utils.ts` merges Tailwind classes (clsx + tailwind-merge).

### GraphQL

Raw query strings live in `src/gql/queries.ts`. The `codegen` script generates typed helpers into `src/gql/__generated__/` (gitignored; run after WordPress is connected). Queries use dynamic imports to avoid bundling unused GraphQL at build time.

### TypeScript paths

`@/*` → `src/*`. Use this alias everywhere; never use relative `../../` imports across feature boundaries.

## Key environment variables

```
NEXT_PUBLIC_WP_GRAPHQL_URL       # e.g. https://deathcare.live/graphql (omit → mock mode)
TYPESENSE_HOST / PORT / PROTOCOL # Typesense server (default: localhost:8108/http)
TYPESENSE_API_KEY                # admin key (server-only)
NEXT_PUBLIC_TYPESENSE_SEARCH_KEY # read-only search key (browser-safe)
REVALIDATION_SECRET              # shared secret for ISR webhook
```

## Listing types

Six listing types are defined in `src/lib/listing-types.ts` — `LISTING_TYPE_MAP` maps URL slugs (e.g. `funeral-homes`) to WordPress CPT names (e.g. `funeral_home`). Use `isValidListingType()` before casting a URL param, and `cptToListingType()` when mapping WP data back to URL slugs.

## Git

Branch: `claude/explore-deathcare-dev-tools-odWCS` in `know-kname/eternavue-web`. Always push with `git push -u origin <branch>`. Never push to a different branch without explicit permission.
