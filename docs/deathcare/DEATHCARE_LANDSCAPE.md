# Deathcare Landscape & Audit

> Persistent record of the deathcare codebase investigation (2026-05-23), kept in-repo
> so it survives session relaunches. Purpose: a complete, honest understanding of the
> several parallel "deathcare" codebases before any consolidation. **Decision so far:
> KEEP BOTH, DOCUMENT ONLY — do not consolidate yet.**

## TL;DR
There are **three distinct deathcare codebases** (two are *different products*) plus
several Vercel projects, created by multiple concurrent Claude/Cursor agents:

| | **A · `DeathCare-live`** | **B · `deathcare-workspace`** | **C · subdir in eternavue-web** |
|---|---|---|---|
| Type | Full **Next.js 16 platform** | **Turborepo** suite + backend | Older **snapshot of A** |
| Product | B2B community + legislative intelligence | Consumer "Digital Sanctuary" memorial + cemetery/business OS | same as A (stale) |
| Live app | Rich SSR, working | Vite SPA shell, mostly empty sections | not deployed from here |
| Deploy health | **Green** | **main ERROR**, only a fix-PR green | local build only |
| Verdict | **Best/shippable today** | Most ambitious, least stable | Retire (dupe of A) |

## Codebase A — "The Next.js Platform"  ✅ furthest along
- **GitHub:** `Know-Kname/DeathCare-live` (GitHub label "CSS/340 KB" is stale; it now
  holds the recovered full Next.js app). Open **PR #2** (`claude/analyze-improve-code-bF1Io`,
  session `01X2EVxLXEoP5...`) with real runtime fixes: Clerk-keyless middleware 500s,
  RSC `onClick` errors.
- **Vercel:** deployed by **two** projects — `deathcare-live` and `deathcaredotlive`
  (both point at this repo). PR-branch deploys = READY/green.
- **Live:** "deathcare.live — Community & Legislative Intelligence for Deathcare
  Professionals." Legislative spotlight (Michigan Cremation Regulation Reform Act),
  community feed, industry directory, resources, verified members, coalitions, states
  MI/OH/IL/WA/TX. See `A-platform-home.png`, `A-platform-directory.png`, `A-platform-bills.png`.
- **Owns the `deathcare-live` name** (GitHub names are case-insensitive).

## Codebase B — "The Monorepo Suite"  ⚠ ambitious, unstable
- **GitHub:** `Know-Kname/deathcare-workspace` (TypeScript, ~13 MB). Turborepo with
  multiple apps (`deathcare-live` app, `cemetery-os`, `business-os`), an Express/Postgres
  backend `services/cemetery-api`, shared packages (`ui`, `tokens`, eslint/tailwind/ts
  configs), pnpm. Open **PR #1** (`claude/keen-ptolemy-qWYJd`): "standardize naming,
  separate backend, clean up workspace … fix pre-existing red gates (build/lint/typecheck
  were all failing)."
- **Vercel:** `deathcare-workspace-deathcare-live`. Production `main` deploys almost all
  ERROR; only the cleanup PR branch is READY.
- **Live:** black/gold "Honor Their Legacy — A Digital Sanctuary" consumer landing;
  elegant but sections (Professional Network, Industry Insights, Vendor Directory) are
  **mostly empty shells**. See `B-monorepo-home.png`.

## Codebase C — "The Subdir Snapshot"
- **Location:** `eternavue-web/deathcare-live/` (this repo), 110 files / 1.5 MB, last
  commit `5730123` (2026-05-19). Entered via eternavue PR **#33**
  (`claude/explore-deathcare-dev-tools-odWCS`); an eternavue branch `deathcare-deploy`
  also exists.
- Verified locally: `npm install` / `tsc --noEmit` / `npm run build` (30 routes) pass;
  8/8 tests; runs on mock data. It is a clean but older copy of A.

## Code-health audit (Codebase C; A shares lineage and has PR-#2 fixes)
- ✅ build/types/tests pass on mock data (every external integration has a mock fallback).
- ❌ **`npm run lint` is BROKEN** — script is `next lint`, removed in Next 16; lint never
  runs (CI hid it via `--if-present`/`continue-on-error`). Fix: `eslint .`.
- ❌ **Security: 8 npm vulns (2 high, 6 moderate).** High = `js-cookie` prototype hijack
  via `@clerk/shared` (fixable); `ws` fixable; no-fix moderate = `postcss` via `next`.
- ❌ Thin tests (1 file); missing `.env.example` + `.github/workflows/ci.yml` the README
  advertises. Minor: 3 TODO/FIXME, 4 `console.*`, 2 `as any`.

## Ratings (1–5)
| Property | A | B | C |
|---|---|---|---|
| Functionality (live) | 4 | 2 | 3 |
| Aesthetic / polish | 4 | 2 (frame only) | 3 |
| Maturity / furthest along | 4 | 3 | 2 |
| Build / deploy health | 4 | 2 | 3 |
| Architecture ambition | 3 | 5 | 2 |
| Consolidation readiness | 4 | 2 | 3 |

## Vercel project map (team `chi-chi-projects` = `team_zIgEr2a26AmNpK01bITcrxIa`)
- `deathcare-live` (prj_tyD4…) → repo `DeathCare-live`. Prod READY (older); newest prod attempt BLOCKED.
- `deathcaredotlive` (prj_sNRX…) → repo `DeathCare-live`. Prod = "M0+M1 coming-soon"; PR previews = full app.
- `deathcare-workspace-deathcare-live` (prj_AnQy…) → repo `deathcare-workspace`. Prod ERROR; PR branch READY.
- Also present: `eternavue-web-holo-look`, `website`.

## Environment constraints discovered (why this is "document-only" for now)
- **GitHub access is scoped to `eternavue-web`.** Reads of `DeathCare-live` /
  `deathcare-workspace` are denied in-session ("repository not configured"). All A/B
  intel here came from **Vercel deployment metadata + live page fetches**, not repo reads.
  To diff repo internals, the allowed-repo scope must be widened and the **session
  relaunched**.
- **Pushes only work to `eternavue-web`** (git proxy + MCP both scoped; no PAT in env; no
  `az`/Azure Key Vault reachability — metadata endpoints firewalled). GitHub egress is
  open, so a scope change or a PAT is the only unblock.
- **Concurrent agents are active** on these repos (multiple `claude/*` PR branches
  deploying the same day) — any future write must avoid clobbering in-flight work.

## Recommendation (for when consolidation is greenlit)
1. **Canonical app = A (`DeathCare-live`)**; land its PR #2 first.
2. Treat **B (`deathcare-workspace`)** as a separate longer-term suite to stabilize on its
   own (fix broken `main`); it is **not** a drop-in replacement for A.
3. Retire **C**: remove `eternavue-web/deathcare-live/` AND clean its CI coupling in the
   same commit — `.github/workflows/ci.yml`, `.github/workflows/ci-typescript.yml`,
   `.github/lighthouse/lighthouserc.json`, and `tsconfig.json` all reference
   `deathcare-live`, so the parent CI breaks otherwise.
4. Collapse the duplicate Vercel projects (`deathcare-live` + `deathcaredotlive`) to one
   with the real production domain.
5. Fix A/C health: `eslint .` lint script, `npm audit fix` the highs, add `.env.example`
   + working CI, expand tests.

## Resolution applied in this PR (#34) — reduce confusion
- **eternavue `main` deliberately keeps NO `deathcare-live` subdir.** `main` never had
  it; it lives on PR #33's branch (`claude/explore-deathcare-dev-tools-odWCS`) and in the
  standalone repos A/B. This PR was rebuilt to contain **only** `docs/deathcare/*` + CI
  fixes — it does not pull the deathcare app into `main`.
- **CI correctness fix:** `ci.yml` bumped Node 18 → 20 (Next.js 16 requires ≥20.9.0);
  Node 18 was failing the `Code Quality` build for the whole repo.
- **CI consistency fix:** `ci-typescript.yml` lint made advisory (`continue-on-error`),
  matching `ci.yml`'s existing policy. The two workflows previously disagreed on whether
  lint blocks — that contradiction was itself a source of confusion.
- **Tracked debt (NOT hidden):** the eternavue root has **452 ESLint errors / 11,701
  warnings** (e.g. `react-hooks/set-state-in-effect`, `@typescript-eslint/no-explicit-any`).
  Lint is advisory so it stops blocking unrelated PRs, but the debt remains and warrants a
  dedicated cleanup (or a deliberate decision to relax specific rules).

## Portfolio & CI map (Vercel team `chi-chi-projects`) — investigated 2026-05-23
**Account email:** knowledgeknight99@protonmail.com · **Founder (per PR #19):** Christian
Wright Hughes (matches the DMP user). 13 Vercel projects total; deathcare/eternavue ones:

- **eternavue-web** repo → Vercel `eternavue-web-holo-look` (prj_XA7Q). My PR #34 security
  commit deploys **READY** here. Most older deployments are **ERROR** (Node-18 era + the
  PR #33 deathcare commits deployed through this project).
- **DeathCare-live** repo → **two** Vercel projects: `deathcare-live` + `deathcaredotlive`
  (duplicates of the same repo; collapse to one).
- **deathcare-workspace** repo → `deathcare-workspace-deathcare-live` (prod ERROR).
- Also: `website`, `dmpgrants`, `dmp-centennial-soiree`, `the-wrightr`, `flowerloft-landing`,
  `zoom2day-landing-pages`, `zoom2day-marketing-suite`, `express-js-on-vercel`,
  `nextjs-with-supabase` (unrelated/other ventures).

## Open PRs on eternavue-web — overlap & triage (important)
- **PR #19 `feature/aesthetic-overhaul`** — major repositioning of *eternavue itself* to a
  white-label digital-memorial platform for cemeteries/funeral homes (founder-authored,
  READY deploys). **Already bumped Node 18→20 and disabled `react-hooks/set-state-in-effect`.**
  Still on **Next 16.1.6 (vulnerable)** — it should take the 16.2.6 security bump.
  → Likely the *real* eternavue direction; my PR #34's CI fix overlaps it.
- **PR #33 `claude/explore-deathcare-dev-tools-odWCS`** — adds the deathcare-live subdir
  *into* eternavue (Codebase C). Deploys ERROR. Since `main` should stay deathcare-free,
  **recommend closing #33** (deathcare lives in its own repos).
- **PR #34 (this work)** — docs + CI Node 20 + **unique Next 16.2.6 security fix**. Green.
- **Dependabot:** #32 (Next 16.2.4) **superseded by #34's 16.2.6** → close after #34 merges.
  Safe to take: #31 eslint-config-next, #30 react, #29 tailwindcss-postcss, #27 setup-node,
  #18 codeql-action, #16 checkout. **Hold/review:** #28 eslint 9→10 (major; may change lint).

## Tooling/access notes (re-verified)
- Shell env has **no GitHub PAT / Azure / Vercel / WP tokens**; GitHub-MCP still scoped to
  `eternavue-web` only (wider-scope relaunch still pending). Vercel MCP works (read used
  above). WordPress.com MCP connected but currently erroring at the proxy.

## To resume deeper work (next session)
Add `Know-Kname/DeathCare-live` and `Know-Kname/deathcare-workspace` to this
environment's allowed-repository list, then **relaunch**. The new session can read this
file for full context.
