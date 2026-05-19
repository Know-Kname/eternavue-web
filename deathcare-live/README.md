# deathcare.live

[![CI](https://github.com/know-kname/deathcare-live/actions/workflows/ci.yml/badge.svg)](https://github.com/know-kname/deathcare-live/actions/workflows/ci.yml)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fknow-kname%2Fdeathcare-live&env=NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,CLERK_SECRET_KEY,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,LEGISCAN_API_KEY,GEMINI_API_KEY,NEXT_PUBLIC_WP_GRAPHQL_URL,TYPESENSE_HOST,TYPESENSE_API_KEY,NEXT_PUBLIC_TYPESENSE_SEARCH_KEY,RESEND_API_KEY,REVALIDATION_SECRET&envDescription=All%20variables%20are%20optional%20%E2%80%94%20the%20app%20runs%20on%20mock%20data%20without%20them.&project-name=deathcare-live&repository-name=deathcare-live)

The professional community and legislative intelligence platform for the death care industry — where verified funeral directors, cemetery operators, crematory operators, suppliers, and associations track state legislation, share field knowledge, build coalitions, and collectively shape industry policy.

Built with **Next.js 16** (App Router) and designed to run fully on mock data — no external services required to develop or demo.

## Features

- **Community feed** — field notes, analyses, positions, questions, and reports from verified operators, with individual post permalinks and threaded replies
- **Legislative intelligence** — state-by-state bill tracking, plain-language summaries, status timelines, position polls, and coalition building
- **State hubs** — per-state overviews of active bills, top operators, and discussions
- **Directory** — searchable listings for funeral homes, cremation providers, cemeteries, suppliers, and technology vendors
- **Cross-entity search** — one search across listings, bills, posts, and people
- **Weekly digest** — the "State of Deathcare" briefing, AI-assisted drafting via Google Gemini
- **Tools** — CE credit tracker, vendor RFQ marketplace, industry job board
- **Verified identity** — role-based professional credentials (director, operator, supplier, association, educator)

## Tech stack

| Layer          | Technology                        |
| -------------- | --------------------------------- |
| Framework      | Next.js 16 (App Router, RSC, ISR) |
| Language       | TypeScript (strict)               |
| Styling        | Tailwind CSS v4                   |
| Auth           | Clerk                             |
| Community data | Supabase (PostgreSQL + RLS)       |
| Directory CMS  | WordPress + WPGraphQL             |
| Search         | Typesense                         |
| AI             | Google Gemini                     |
| Email          | Resend                            |
| URL state      | nuqs                              |
| Testing        | Vitest                            |

Every external integration has a mock-data fallback. When its environment variable is absent, the app serves realistic mock data from `src/lib/mock-*.ts` and stays fully functional.

## Quick start

```bash
npm install
cp .env.example .env.local   # optional — app runs on mock data without it
npm run dev                  # http://localhost:3000
```

## Scripts

```bash
npm run dev          # dev server
npm run build        # production build
npm run type-check   # tsc --noEmit
npm run lint         # eslint .
npm run test         # vitest run
npm run format       # prettier --write .
```

## Environment variables

All variables are optional — the app runs entirely on mock data without them. See `.env.example` for the full list. Key groups:

- `NEXT_PUBLIC_WP_GRAPHQL_URL` — WordPress directory/articles (omit → mock mode)
- `NEXT_PUBLIC_SUPABASE_URL` / `*_ANON_KEY` / `SUPABASE_SERVICE_ROLE_KEY` — community data
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` / `CLERK_SECRET_KEY` — auth (omit → public read-only mode)
- `TYPESENSE_*` — full-text search
- `LEGISCAN_API_KEY` — live legislative data (omit → mock bills)
- `GEMINI_API_KEY` — AI digest drafting (omit → AI features disabled)
- `RESEND_API_KEY` — weekly digest email
- `REVALIDATION_SECRET` — shared secret for the ISR webhook and cron routes

## Project structure

```
src/
  app/          App Router pages + API routes
  components/   ui · layout · directory · community · legislative · profile · resources
  lib/          data layers, config, mock data, utilities
  styles/       global CSS + design tokens
supabase/
  migrations/   community schema (profiles, posts, comments, coalitions, …)
```

See [`CLAUDE.md`](./CLAUDE.md) for detailed architecture notes.

## Deployment

Deploys to **Vercel**. Set the environment variables above in the Vercel dashboard. `vercel.json` configures two cron jobs:

- `/api/bills/sync` — LegiScan bill sync, every 6 hours
- `/api/digest/send` — weekly digest email, Mondays 13:00 UTC

## License

Private — all rights reserved.
