# Linear Setup for deathcare.live

Linear is the recommended project management tool for this platform. The deathcare.live roadmap maps perfectly to Linear's cycles/phases structure, and the GitHub integration creates genuine automation value.

## Why Linear

- **Phase-based roadmap** — Phases 1/2/3 from the strategy doc become Linear Cycles
- **Native GitHub sync** — commits, PRs, and branches auto-link to Linear issues
- **Vercel integration** — deployment status shown inline on issues
- **API automation** — LegiScan webhook → auto-create "write bill analysis" issues when new bills are introduced
- **Bill tracking UX** — use Linear as internal tracking for which bills need analysis, which are published, which need operator outreach

---

## Setup Sequence

### 1. Create workspace

1. Go to [linear.app](https://linear.app) and create a new workspace
2. Workspace name: `deathcare.live`
3. Invite team (if any)

### 2. Create the project

**Team name:** `Platform`

**Default labels to create:**

| Label | Color | Use |
|-------|-------|-----|
| `feature` | Teal | New platform features |
| `bug` | Red | Bugs and regressions |
| `legislation` | Gold/amber | Bill tracking and analysis |
| `data` | Purple | Mock data, content, real data migration |
| `infrastructure` | Gray | CI, deploy, dependencies |
| `design` | Pink | UI/UX changes |
| `docs` | Blue | Documentation |

### 3. Create the Phase 1 backlog (Priority order)

Copy these into Linear as issues under **Phase 1 — Foundation**:

**Must-have (blocking launch)**
- [ ] Connect Supabase: run `supabase db push` with `supabase/migrations/001_initial_schema.sql`
- [ ] Add Clerk keys → enable auth (proxy.ts is ready, just needs env vars)
- [ ] Wire `POST /api/posts` to Supabase (currently returns mock)
- [ ] Upvote button on PostCard → Supabase update
- [ ] Bill follow button → Supabase `bill_follows` table
- [ ] Comment reply form → `POST /api/comments` → Supabase
- [ ] Profile edit page wired to Supabase `profiles` table

**High value**
- [ ] Connect LegiScan API key → live bill data replacing mock
- [ ] `POST /api/bills/sync` cron route (handler is stubbed, needs LegiScan fetch logic)
- [ ] `POST /api/digest/send` cron route (Resend email delivery)
- [ ] Bill follow → Resend alert email when bill status changes
- [ ] Weekly digest (React Email template + cron)

**Polish**
- [ ] Add PNG icons (192×192, 512×512) for PWA install — generate from `src/app/icon.svg`
- [ ] Replace mock stats on homepage with live Supabase `count()` queries
- [ ] Add `og:image` per-page overrides for bill and post pages

### 4. Phase 2 backlog — Legislative layer

- [ ] `POST /api/bills/sync` — full LegiScan implementation
- [ ] Bill coalition builder — `coalitions` + `coalition_members` Supabase tables wired
- [ ] Position aggregator — real-time % support/oppose from `bill_positions` table
- [ ] OH and IL state hubs (generateStaticParams already returns MI/OH/IL)
- [ ] Bill alert emails via Resend when followed bills change status
- [ ] `ActionKit` component — contact reps via Clerk identity

### 5. Phase 3 backlog — Monetization + growth

- [ ] Stripe integration for paid supplier listings
- [ ] Jobs board — paid job postings ($99–299)
- [ ] Association/org pages with official bill positions
- [ ] Public API (`/api/v1/bills/[state]`, `/api/v1/positions/[billId]`) — premium tier
- [ ] Vercel feature flags for staged state rollout (OH, IL, WA, TX)
- [ ] Mobile PWA push notifications for bill status changes

---

## GitHub Integration

1. In Linear: **Settings → Integrations → GitHub**
2. Connect the `deathcare-live` repository
3. Linear will auto-link commits and PRs that mention issue IDs (e.g. `DCA-42`)

**Workflow to establish:**
- Branch naming: `feature/DCA-42-bill-follow-button`
- PR title: `DCA-42: Add bill follow button`
- Commits: `feat(bills): add follow button — DCA-42`

When you merge a PR, Linear auto-closes the linked issue.

---

## Vercel Integration

1. In Linear: **Settings → Integrations → Vercel**
2. Connect the Vercel project
3. Deployment status (preview, production) shows inline on every issue

---

## LegiScan → Linear Automation (Phase 2)

Once the LegiScan API key is connected, set up a webhook or scheduled task:

1. `POST /api/bills/sync` runs every 6h (already in `vercel.json`)
2. When a new bill is returned from LegiScan that touches deathcare keywords, call the Linear API:

```typescript
// POST https://api.linear.app/graphql
// Authorization: Bearer LINEAR_API_KEY
mutation {
  issueCreate(input: {
    teamId: "YOUR_TEAM_ID",
    title: "Write analysis: MI HB 4789 — Green Burial Authorization",
    labelIds: ["legislation-label-id"],
    description: "LegiScan bill_id: 1234. Status: In committee. Introduced 2026-03-01.",
    priority: 2  // High
  }) {
    issue { id identifier }
  }
}
```

This creates a track-and-analyze workflow: every new relevant bill automatically appears as a Linear issue assigned to the editorial/content team.

---

## Useful Linear API snippets

```bash
# List all issues in a team
curl -X POST https://api.linear.app/graphql \
  -H "Authorization: Bearer $LINEAR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"query": "{ issues { nodes { id title state { name } } } }"}'
```

Set `LINEAR_API_KEY` in `.env.local` (not committed — add to `.env.example`).
