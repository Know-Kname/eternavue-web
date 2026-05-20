# deathcare.live — Agent Handoff Sheet

_Last updated: May 2026. Use this doc to orient yourself before building._

---

## What This Is

**deathcare.live** is a professional community + legislative intelligence platform for the deathcare industry (funeral directors, cemetery/crematory operators, suppliers, associations). It is a standalone Next.js 16 (App Router) application.

**Core value proposition:** Verified operators can track state legislation, share field knowledge, build coalitions, and collectively shape industry policy — in one platform that works where deathcare regulation actually happens (state legislatures, not federal).

**Launch strategy:** Michigan-first (density > breadth). Detroit Memorial Park's 100-year anniversary (June 2026) is the launch event.

---

## Repository Location

```
/home/user/deathcare-live/   ← standalone repo (this is the canonical codebase)
```

The GitHub repo does not exist yet — the user needs to:
1. Create an empty repo on GitHub (e.g., `know-kname/deathcare-live`)
2. `cd /home/user/deathcare-live && git remote add origin https://github.com/know-kname/deathcare-live.git && git push -u origin main`

---

## Current State (May 2026)

### What exists and works

All pages below are built and render correctly. All use mock data by default.

| Route | Status | Notes |
|-------|--------|-------|
| `/` | ✅ Built | Briefing room homepage: hero, bill spotlight, feed preview, digest teaser, directory, resources |
| `/feed` | ✅ Built | Community feed with kind filter, state filter, PostComposer |
| `/feed/[postId]` | ✅ Built | Post permalink with mock comments, related posts, author bio |
| `/states` | ✅ Built | All-states overview |
| `/states/[state]` | ✅ Built | State hub (MI, OH, IL have data; WA/TX stubs) |
| `/bills/[state]` | ✅ Built | Bill list for a state |
| `/bills/[state]/[billId]` | ✅ Built | Full bill detail: status bar, plain-English summary, position poll, coalition panel |
| `/profile/[username]` | ✅ Built | Member profile page |
| `/profile/[username]/edit` | ✅ Built | Clerk-protected edit form (stub) |
| `/directory` | ✅ Built | Listing directory with Typesense search |
| `/directory/[type]` | ✅ Built | Per-type listings (funeral-homes, cremation, cemeteries, suppliers, technology) |
| `/directory/[type]/[slug]` | ✅ Built | Individual listing page |
| `/resources` | ✅ Built | Articles from WordPress (mock fallback) |
| `/resources/[slug]` | ✅ Built | Article detail |
| `/search` | ✅ Built | Cross-entity search: listings, bills, posts, people |
| `/join` | ✅ Built | Onboarding + role cards |
| `/jobs` | ✅ Built | Job board with mock listings |
| `/digest` | ✅ Built | Weekly digest archive |
| `/ce` | ✅ Built | CE credit tracker |
| `/rfq` | ✅ Built | Vendor RFQ marketplace |
| `/about` | ✅ Built | Platform story + values |
| `/login` | ✅ Built | Clerk SignIn (stub without key) |
| `/signup` | ✅ Built | Clerk SignUp (stub without key) |

### Auth status
- Clerk wired in `Providers.tsx` — works when `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is set
- Without the key: app works in public read-only mode (all pages render, no write actions)
- Protected route: `/profile/[username]/edit` via `src/proxy.ts`

### Data status
- **All data is mock** until env vars are set
- Mock data lives in `src/lib/mock-community.ts`, `src/lib/mock-data.ts`, `src/lib/mock-digest.ts`
- Supabase schema is written: `supabase/migrations/001_initial_schema.sql` — just needs `supabase db push`

---

## Critical Files to Know

```
src/lib/config.ts              — all env vars, single source of truth
src/lib/mock-community.ts      — profiles, bills, posts, coalitions, jobs (mock data)
src/lib/supabase.ts            — browser + server + admin Supabase clients
src/lib/legiscan.ts            — LegiScan API client (stub, needs API key)
src/lib/gemini.ts              — Gemini AI integration (generateBillAnalysis, generateWeeklyBriefing)
src/proxy.ts                   — Clerk auth middleware (Next.js 16 convention)
src/components/layout/Providers.tsx — conditional ClerkProvider
src/components/layout/AuthNav.tsx   — safe Clerk hook pattern
src/app/api/posts/route.ts     — community post creation (returns mock, needs Supabase wire)
supabase/migrations/           — DB schema ready to push
vercel.json                    — crons: bill sync (6h), digest send (Mon 1pm UTC)
```

---

## Environment Variables Needed

Set these in Vercel dashboard and in `.env.local` for local dev.

```bash
# Auth (enables login/signup/profiles)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_...
CLERK_SECRET_KEY=sk_live_...

# Community data (enables real posts, profiles, coalitions)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Legislative data (enables live bill tracking)
LEGISCAN_API_KEY=xxx

# AI (enables Gemini-drafted bill analyses and digest)
GEMINI_API_KEY=AIza...
GEMINI_MODEL=gemini-2.5-flash   # optional, this is the default

# Directory CMS (enables real listings and articles)
NEXT_PUBLIC_WP_GRAPHQL_URL=https://deathcare.live/graphql

# Search (enables Typesense full-text search)
TYPESENSE_HOST=xxx.a1.typesense.net
TYPESENSE_API_KEY=xxx
NEXT_PUBLIC_TYPESENSE_SEARCH_KEY=xxx   # read-only key

# Email (enables weekly digest delivery)
RESEND_API_KEY=re_xxx

# Security
REVALIDATION_SECRET=xxx   # random string, shared with WordPress ISR webhook
```

---

## Gemini AI Integration

Already built in `src/lib/gemini.ts`. Two functions:

```typescript
// Draft a weekly briefing (used by /api/digest/send cron)
generateWeeklyBriefing(input: {
  topBills: Bill[],
  topPosts: Post[],
  weekOf: string
}): Promise<{ headline: string; subheadline: string; editorNote: string } | null>

// Analyze a specific bill for operators (used by /bills/[state]/[billId])
generateBillAnalysis(bill: Bill): Promise<{
  plainSummary: string;
  keyProvisions: string[];
  operatorImpact: string;
} | null>
```

**To enable:** Set `GEMINI_API_KEY` in `.env.local`. Returns `null` gracefully if absent.

**Next Gemini use cases to build:**
1. `generatePositionSummary(bill, positions[])` — summarize the community's collective position on a bill
2. `generateFieldReportDigest(posts[])` — extract trends from anonymous field notes
3. Auto-draft the "plain-English" bill summary when a new bill is synced from LegiScan
4. Generate an operator-impact briefing for a specific role (director vs. supplier) from a bill

---

## Phase 2 Priority Build List

These are the highest-value unbuilt features, in order:

### 1. Wire Supabase (1–2 hours once keys are set)
```bash
# After setting SUPABASE env vars:
npx supabase db push   # runs supabase/migrations/001_initial_schema.sql
```
Then update:
- `src/app/api/posts/route.ts` — insert into `posts` table instead of returning mock
- `src/components/community/PostComposer.tsx` — already hits `/api/posts`
- Add `/api/comments/route.ts` — insert into `comments` table
- Add `upvotes` mutation in PostCard

### 2. Bill follow button (interactive)
- The "Follow this bill" CTA in `/bills/[state]/[billId]` is static
- Wire it: Clerk auth → `INSERT INTO bill_follows (profile_id, bill_id, state) VALUES (...)`
- Add count display: `SELECT COUNT(*) FROM bill_follows WHERE bill_id = $1`

### 3. LegiScan bill sync cron
- `src/app/api/bills/sync/route.ts` needs to be created (route exists in `vercel.json`, but handler file is missing)
- Use `src/lib/legiscan.ts` to fetch bills for ACTIVE_STATES
- Upsert into Supabase `bills_cache` table (add this to migration first)
- Return 200 with sync count

### 4. Comment reply form
- `/feed/[postId]/page.tsx` shows mock comments but has no reply UI
- Add a form that POSTs to `/api/comments`
- Requires Clerk auth (use the safe hook pattern from `AuthNav.tsx`)

### 5. Coalition join button
- `CoalitionPanel` in bill detail page shows "Join coalition" CTA (static)
- Wire to `coalition_members` table

---

## Architecture Patterns to Follow

### Safe Clerk hook pattern (critical)
Never call `useUser()` or other Clerk hooks unconditionally in a component that mounts before Clerk is loaded. Always use the inner-component pattern:

```typescript
const IS_CLERK_ENABLED = !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY

function ClerkGatedForm() {
  const { isSignedIn } = useUser()  // safe: only mounts when Clerk is present
  if (!isSignedIn) return <SignedOutPrompt />
  return <TheActualForm />
}

export function GatedComponent() {
  if (IS_CLERK_ENABLED) return <ClerkGatedForm />
  return <SignedOutPrompt />
}
```

See `src/components/layout/AuthNav.tsx` for the reference implementation.

### Mock-data fallback pattern
Every data function in `src/lib/` should check `config.environment.useMockData` (or the relevant env var) and return mock data if the service isn't configured. This makes the app work for demos and development with zero external dependencies.

### RSC vs. client component rule
- Pages that fetch data → RSC (server component, `async function`)
- Components with `useUser()`, event handlers, nuqs, or browser APIs → `'use client'`
- `searchParams` in RSC pages is `Promise<...>` → always `await searchParams`

---

## Deployment Sequence

1. **Push to GitHub** (user does this):
   ```bash
   cd /home/user/deathcare-live
   git remote add origin https://github.com/know-kname/deathcare-live.git
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import the `deathcare-live` GitHub repo
   - Framework: Next.js (auto-detected)
   - Root directory: `/` (it's already at root in the standalone repo)
   - Add environment variables from the list above

3. **Set up Linear** (see `docs/LINEAR_SETUP.md`)

4. **Push Supabase schema**:
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   npx supabase db push
   ```

5. **Index Typesense** (after Supabase data exists):
   ```bash
   npm run index:typesense
   ```

---

## Known Issues / Tech Debt

| Issue | Location | Priority |
|-------|----------|----------|
| 17 files have Prettier formatting issues (in monorepo copy; standalone is clean) | monorepo only | Low |
| `npm run lint` was `next lint` (broken in Next 16) — fixed in standalone | Fixed | Done |
| Mock data `post.id` uses numeric format (`post1`) not UUID — will need migration when Supabase wires | `mock-community.ts` | Medium |
| `generateStaticParams` for `/states/[state]` only generates MI/OH/IL — WA/TX stubs exist but no data | `app/states/[state]/page.tsx` | Low |
| eternavue-web CI still has pre-existing root lint errors (413 ESLint errors) | root project | Separate project |

---

## Design System Quick Reference

| Color | Tailwind | Use |
|-------|----------|-----|
| Teal `#0d9488` | `teal-600` | Primary — brand, CTAs, verified signals |
| Gold `#d19900` | custom `gold-*` | Legislative — bill numbers, bill-related elements |
| Purple `#7a39bb` | `purple-*` | Community — question posts, association role |
| Sky | `sky-*` | Operator role |
| Amber | `amber-*` | Supplier role, position posts |
| Green | `green-*` | Educator role, report posts, signed bills |

Fonts: **Instrument Serif** (`font-display`) + **Inter** (`font-body`)

Component reference: `src/components/` — see `CLAUDE.md` for full structure.
