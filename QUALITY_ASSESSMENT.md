# Eternavue Web - Application Quality Assessment (Validated)

**Assessment Date:** February 7, 2026
**Assessor:** Automated Quality Analysis (Cloud Agent)
**Application:** eternavue-web v0.1.0
**Tech Stack:** Next.js 16.0.5 / React 19.2.0 / TypeScript 5.9 / Tailwind CSS 4
**Total Source Lines:** ~1,976 across 22 source files
**Validation:** All claims verified against build output, rendered HTML, npm audit JSON, WCAG contrast calculations, and static analysis

---

## Executive Summary

| Category                    | Original | Validated | Grade | Change |
|-----------------------------|----------|-----------|-------|--------|
| Code Quality & Architecture | 62       | 55/100    | D+    | -7 (tokens/TW4 arch issue worse than stated) |
| UI/UX Design                | 72       | 68/100    | C+    | -4 (dead links worse than stated) |
| Accessibility (a11y)        | 35       | 28/100    | F     | -7 (opacity:0 SSR issue is critical) |
| Security                    | 30       | 35/100    | F     | +5 (3 of 6 CVEs actually apply, not all 6) |
| Performance                 | 58       | 55/100    | D+    | -3 (opacity:0 kills perceived performance) |
| Testing                     | 0        | 0/100     | F     | -- (confirmed: zero tests) |
| SEO & Discoverability       | 45       | 50/100    | D     | +5 (Twitter cards auto-generated) |
| Documentation               | 70       | 62/100    | C-    | -8 (stale/misleading docs worse than stated) |
| DevOps & CI/CD              | 25       | 28/100    | F     | +3 (CI exists on another branch, just not merged) |
| Maintainability             | 55       | 48/100    | D     | -7 (dead code, dual config, memory leaks) |
| **Overall**                 | **45**   | **43/100**| **D** | **-2** |

**Verdict:** Validation revealed the app is slightly worse than initially assessed. Key corrections: Framer Motion `opacity:0` makes all content invisible without JavaScript (a major issue missed initially), the design token system is effectively dead code due to Tailwind v4 architecture, and several memory leak risks exist. However, the security score improved because only 3 of 6 reported CVEs actually apply to this codebase.

---

## Validation Methodology

Each claim from the original assessment was verified using:

| Tool/Technique | What It Validated |
|---|---|
| `npm audit --json` | Exact CVE ranges, CVSS scores, applicability analysis |
| `npm run build` + HTML inspection | SSR output quality, pre-rendered content, opacity:0 elements |
| Python WCAG 2.1 contrast calculator | Exact contrast ratios for 15 color pairs |
| `npm run lint` (re-run) | Confirmed 8 errors, 6 warnings unchanged |
| `npx tsc --noEmit` (re-run) | Confirmed 0 TypeScript errors |
| Rendered HTML analysis | Semantic HTML audit, ARIA attribute count, anchor link validation |
| Static code analysis | `use client` necessity, key prop usage, memory leaks, XSS vectors |
| Bundle size measurement | Exact gzipped sizes for each JS/CSS chunk |
| GitHub CLI (`gh`) | Repo settings, CI history, branch analysis |

---

## 1. Code Quality & Architecture (55/100 - Grade: D+)

### CORRECTION: Score lowered from 62 to 55

**New findings that worsened the score:**

#### 1.1 Tailwind v4 Architecture Problem (NEW - Critical)
The project has a **dual configuration problem** caused by migration to Tailwind CSS v4:

- `globals.css` uses `@import "tailwindcss"` and `@theme { }` (TW v4 way)
- `tailwind.config.ts` imports `tokens.ts` (TW v3 way)
- No `@config` directive in CSS, meaning `tailwind.config.ts` is likely **ignored by TW v4**
- `globals.css @theme` defines **11 colors not present in `tokens.ts`** (primary-800/900/950, accent-400, neutral-200/300/400/500/600/700)
- `tokens.ts` is therefore **stale/dead code** that misleads developers

This is worse than the original "partially duplicated" assessment. The tokens.ts and tailwind.config.ts files are effectively dead code creating a false source of truth.

#### 1.2 React Key Prop Anti-patterns (NEW)
4 instances of using array index as React key:

| File | Line | Context |
|------|------|---------|
| `page.tsx` | 115 | Service features list `.map((item, i) => <li key={i}>)` |
| `page.tsx` | 190 | How It Works steps `.map((item, idx) => ... key={idx})` |
| `Hero.tsx` | 69 | Title word splitting `.map((word, i) => <span key={i}>)` |
| `ServiceCard.tsx` | 47 | Features list `.map((feature, index) => <li key={index}>)` |

For static lists this is acceptable, but it violates React best practices and could cause bugs if lists become dynamic.

#### 1.3 Memory Leak Risks (NEW)
- `page.tsx`: `setTimeout` in `handleServiceInquiry` without `clearTimeout` cleanup
- `NewsletterForm.tsx`: `setTimeout` for auto-dismissing success state without cleanup. If the component unmounts during the 3-second timer (e.g., via AnimatePresence), it would attempt `setState` on an unmounted component.

#### 1.4 `use client` Directive Issues (NEW)
- `Footer.tsx`: Has `'use client'` but uses **zero** hooks, event handlers, or browser APIs. Only imports Lucide icons (which are pure SVG server components). This is **unnecessary** and forces the footer into the client bundle.
- `ServiceCard.tsx`: Has `onClick` prop but no `'use client'` directive. Works only because it's imported from `page.tsx` which is already client-side.

#### Confirmed findings from original assessment:
- 8 ESLint errors, 6 warnings (re-verified, identical results)
- 0 TypeScript errors (re-verified)
- 5 `console.log()` calls in production
- 3 `alert()` calls as form feedback
- 1 TODO comment, 1 stale comment in GlassCard
- GlassCard imports `cn` but uses template literals (inconsistency)

---

## 2. UI/UX Design (68/100 - Grade: C+)

### CORRECTION: Score lowered from 72 to 68

#### 2.1 Dead Links - Worse Than Reported (CORRECTED)
Validation against rendered HTML found **12 dead anchor links** (originally reported as "multiple"):

| Anchor | Used In | Target Exists? |
|--------|---------|----------------|
| `#memorial` | Header, Footer | **NO** (no element with `id="memorial"`) |
| `#events` | Header, Footer | **NO** |
| `#corporate` | Header, Footer | **NO** |
| `#about` | Header, Footer | **NO** |
| `#technology` | Footer | **NO** |
| `#contact` | Footer | **NO** |
| `#careers` | Footer | **NO** |
| `#press` | Footer | **NO** |

Only 2 IDs exist in the rendered HTML: `#services` and `#_R_` (internal React).
The `#services` ID exists but **no navigation link points to it**.

#### 2.2 Non-functional Interactive Elements (confirmed)
- "Watch Video" button: No handler attached (confirmed in HTML output)
- "View Our Portfolio" button: No `onSecondaryClick` passed (confirmed)
- 3 social media links: `href="#"` with no real URLs (confirmed)
- Privacy/Terms links: `href="#"` (confirmed)

#### 2.3 Missing Asset (confirmed)
- `/grid.svg` referenced in Hero and CTA backgrounds does not exist in `/public/`. Only `file.svg`, `globe.svg`, `next.svg`, `vercel.svg`, `window.svg` exist (all default Next.js assets, none custom).

---

## 3. Accessibility (28/100 - Grade: F)

### CORRECTION: Score lowered from 35 to 28

#### 3.1 CRITICAL NEW FINDING: Content Invisible Without JavaScript

**18 elements** in the pre-rendered HTML have `style="opacity:0"` or `style="opacity:0;transform:translateY(...)"`

This means ALL page content (hero, services, testimonials, how-it-works) is **invisible** in the server-rendered HTML until JavaScript hydrates and Framer Motion triggers the entrance animations. Users with JavaScript disabled, slow connections, or screen readers that don't execute JS see a blank page with only the header and footer.

Affected elements include:
- Hero content wrapper (`opacity:0; transform:translateY(20px)`)
- Hero CTA buttons (`opacity:0; transform:translateY(10px)`)
- Trust signal text (`opacity:0`)
- Services section title and subtitle
- All 3 service cards
- All "How It Works" steps
- Testimonials section title

**This is a WCAG 2.1 Level A failure** (1.3.1 Info and Relationships, 1.3.2 Meaningful Sequence).

#### 3.2 WCAG Contrast Ratio Results (Validated with calculation)

| Color Combination | Ratio | AA Normal | AA Large | AAA Normal |
|---|---|---|---|---|
| text-neutral-400 on primary-950 | 8.09:1 | PASS | PASS | PASS |
| text-neutral-300 on primary-900 | 13.31:1 | PASS | PASS | PASS |
| **text-neutral-500 on primary-950 (footer)** | **4.31:1** | **FAIL** | PASS | FAIL |
| text-white/50 on primary-900 | 5.00:1 | PASS | PASS | FAIL |
| **text-white/30 placeholder on white/5** | **2.30:1** | **FAIL** | **FAIL** | **FAIL** |
| text-white on primary-950 | 20.41:1 | PASS | PASS | PASS |
| text-holographic-cyan on primary-950 | 8.56:1 | PASS | PASS | PASS |
| text-accent-500 on primary-950 | 9.17:1 | PASS | PASS | PASS |
| text-white on primary-500 (button) | 12.83:1 | PASS | PASS | PASS |
| text-primary-950 on accent-500 (secondary btn) | 9.17:1 | PASS | PASS | PASS |
| **text-green-600 success on white** | **3.30:1** | **FAIL** | PASS | FAIL |
| **text-neutral-500 footer copyright** | **4.31:1** | **FAIL** | PASS | FAIL |

**CORRECTION from original:** `text-neutral-400 on primary-950` actually **PASSES** WCAG AA at 8.09:1. The original assessment incorrectly flagged this. However, `text-neutral-500` (footer copyright, 4.31:1), `text-white/30` placeholders (2.30:1), and `text-green-600` success message (3.30:1) do genuinely fail.

**4 WCAG AA failures confirmed** (down from originally implied ~5, but with exact ratios).

#### 3.3 ARIA Audit (Validated from rendered HTML)
- `aria-label`: **1 total** ("Toggle menu" on mobile hamburger)
- `aria-hidden`: **0** (decorative orbs/gradients need `aria-hidden="true"`)
- `aria-expanded`: **0** (mobile menu toggle needs this)
- `aria-live`: **0** (form submission feedback needs this)
- `role`: **0**
- Social media icon links: **3 links with NO accessible text** (confirmed - screen readers see empty links)
- No `<blockquote>` for testimonial quotes
- No `<ol>` for numbered "How It Works" steps

---

## 4. Security (35/100 - Grade: F)

### CORRECTION: Score raised from 30 to 35

#### 4.1 CVE Applicability Analysis (CORRECTED)
Deep analysis of the 6 reported CVEs against actual codebase usage:

| CVE | CVSS | Applies? | Reasoning |
|---|---|---|---|
| RCE in React flight protocol | **10.0** | **YES** | RSC protocol is used even with `'use client'`. Layout is a server component. RSC payloads served via `_next/static`. **CRITICAL.** |
| Server Actions source code exposure | 5.3 | **NO** | No `'use server'` directives in codebase. No server actions defined. |
| DoS with Server Components | 7.5 | **YES** | Layout.tsx is a server component. RSC endpoint exists. Static generation mitigates but doesn't eliminate. |
| DoS via Image Optimizer remotePatterns | 5.9 | **NO** | No `remotePatterns` in `next.config.ts`. No remote images configured. |
| HTTP request deserialization DoS | 7.5 | **YES** | RSC deserialization at framework level. Malformed requests could trigger. |
| Unbounded Memory via PPR Resume | 5.9 | **NO** | PPR not enabled in `next.config.ts`. |

**Result: 3 of 6 CVEs apply** (CVSS 10.0, 7.5, 7.5). The original assessment stated all 6 applied, which was inaccurate. The RCE (CVSS 10.0) still makes this a critical issue regardless.

#### 4.2 XSS Analysis (NEW - Validated)
- No `dangerouslySetInnerHTML` anywhere (confirmed)
- Dynamic `href` props in Hero.tsx and CTA.tsx could allow `javascript:` protocol injection, but all values are hardcoded or from component props (not user input). **Low risk currently, but no URL validation exists.**
- React JSX auto-escaping protects all text content. **No XSS vectors found.**

#### 4.3 Confirmed findings:
- No security headers (no middleware.ts, no CSP, no HSTS)
- No form backend (all forms are client-side only)
- No input sanitization (forms rely on HTML5 `required` only)
- No CSRF protection needed (no backend exists)
- No environment variables or secrets in source code

---

## 5. Performance (55/100 - Grade: D+)

### CORRECTION: Score lowered from 58 to 55

#### 5.1 Bundle Size Analysis (Validated with exact measurements)

| Chunk | Raw | Gzipped | Purpose |
|---|---|---|---|
| `bdee61417ebd6dc8.js` | 293.3 KB | 87.2 KB | React + ReactDOM runtime |
| `c4e527d22dfaf34a.js` | 180.5 KB | 56.1 KB | Page component + Framer Motion |
| `ee23c10f124185e0.js` | 88.4 KB | 22.5 KB | Next.js framework |
| `42879de7b8087bc9.js` | 27.4 KB | 6.8 KB | Router/hydration |
| `fd5f064b2a3f9309.js` | 13.0 KB | 4.7 KB | RSC client runtime |
| `turbopack-*.js` | 9.6 KB | 3.8 KB | Turbopack runtime |
| `699977e15a5cfb3e.css` | 42.7 KB | 7.7 KB | All CSS |
| `a6dad97d9634a72d.js` | 110.0 KB | 38.6 KB | noModule polyfill (old browsers only) |

**Modern browser total: 654.9 KB raw / 188.8 KB gzipped**

This is **moderate** for a React SPA with Framer Motion animations. Framer Motion alone contributes ~50KB gzipped. Without it, the bundle would be ~140KB gzipped which is acceptable.

#### 5.2 SSR/Rendering Correction (IMPORTANT)

**Original claim:** "The entire page is client-rendered, defeating Next.js server component benefits."

**Corrected:** The page IS pre-rendered as static HTML (SSG). The pre-rendered HTML is 35.0 KB and contains all content. Next.js generates `index.html` with full markup. However:

1. Framer Motion's `initial={{ opacity: 0 }}` renders as `style="opacity:0"` in the HTML
2. This makes content **visually invisible** until JavaScript hydrates
3. The SSR benefit for **visual rendering** is completely negated
4. The SSR benefit for **SEO crawlers** that parse HTML source still exists (Googlebot reads content even if opacity:0)
5. The SSR benefit for **meta tags** is preserved

#### 5.3 No `prefers-reduced-motion` Support (confirmed)
- Zero matches for `prefers-reduced-motion` in codebase
- 18 animation states that force motion on all users
- 3 infinite CSS/Framer animations (background orbs, logo pulse)

---

## 6. Testing (0/100 - Grade: F)

**Confirmed: Zero test infrastructure.**
- No `.test.ts`, `.test.tsx`, `.spec.ts`, `.spec.tsx` files
- No testing framework in dependencies (no Jest, Vitest, Testing Library, Playwright, Cypress)
- No test scripts in `package.json`
- No `__tests__` directories

---

## 7. SEO & Discoverability (50/100 - Grade: D)

### CORRECTION: Score raised from 45 to 50

**New finding:** Next.js auto-generates Twitter Card meta tags not explicitly set in source code.

#### Tags confirmed present in rendered HTML:
- `<title>` (proper)
- `meta description` (proper, ~190 chars)
- `meta author` (Eternavue)
- `meta keywords` (6 terms)
- `og:title`, `og:description`, `og:type` (explicit)
- `twitter:card` = summary (auto-generated by Next.js)
- `twitter:title`, `twitter:description` (auto-generated)
- `<link rel="icon">` with cache-busting
- `<link rel="preload">` for fonts (auto-generated by next/font)
- `<meta charset="utf-8">`
- `<meta name="viewport">`
- `<html lang="en">`

#### Still missing:
- `og:image` / `twitter:image` (no social share image)
- `og:url` / `canonical` link
- `og:locale`
- `robots.txt`
- `sitemap.xml`
- JSON-LD structured data (LocalBusiness schema would be ideal)
- Custom 404 page (uses default Next.js 404)

#### Opacity:0 SEO Impact:
Google's crawler executes JavaScript and should see the content. However, the raw HTML has content at `opacity:0` which older crawlers or social media preview generators may interpret as hidden content (potential ranking penalty).

---

## 8. Documentation (62/100 - Grade: C-)

### CORRECTION: Score lowered from 70 to 62

#### Stale/misleading documentation is worse than stated:

| Document | Issue |
|---|---|
| `README.md` | Says "Next.js 15" in project structure, actual is Next.js 16 |
| `README.md` | Links to "Next.js 15 Docs" |
| `README.md` | Clone URL uses placeholder `yourusername` |
| `README.md` | Documents `tokens.ts` as the design system source of truth, but `globals.css @theme` is the actual source |
| `.claude/project-context.md` | Says "Next.js 14 initialized" (two major versions off) |
| `.claude/project-context.md` | Lists `images/` in public dir (doesn't exist) |
| `.claude/project-context.md` | Lists `.env.local` in structure (doesn't exist) |
| `CONTRIBUTING.md` | **Empty file** |
| `CLAUDE_CONTEXT.md` | References Figma MCP connection (not available in this context) |
| `tokens.ts` | Documents font family as `Georgia` when actual is `Playfair Display` (Georgia is fallback - misleading, not wrong) |

#### Positive documentation:
- README is well-structured with clear sections
- DEPLOYMENT.md provides clear Vercel deployment instructions
- Component interfaces serve as inline API documentation
- Design token comments explain color purposes

---

## 9. DevOps & CI/CD (28/100 - Grade: F)

### CORRECTION: Score raised from 25 to 28

**New finding:** A CI/CD pipeline (`ci.yml`) exists on the `claude/review-figma-eternavue-45xGT` branch but was never merged to `main`. It includes:
- ESLint + TypeScript + Build quality checks
- Design token sync from Figma (requires `FIGMA_TOKEN` secret)
- Security audit (`npm audit`)
- Vercel deployment
- Lighthouse performance checks on PRs
- Slack notifications on failure

However, the 3 recorded CI runs all **failed**, and the pipeline was never merged. The `continue-on-error: true` on lint means lint failures wouldn't block deployment (bad practice).

**Still missing on `main`:**
- Any CI/CD pipeline
- Pre-commit hooks (Husky/lint-staged)
- Prettier/code formatting
- `.editorconfig`
- `.env.example`
- Branch protection rules

---

## 10. Maintainability (48/100 - Grade: D)

### CORRECTION: Score lowered from 55 to 48

#### New issues affecting maintainability:

1. **Dead code architecture:** `tokens.ts` + `tailwind.config.ts` form a coherent design system that is **not actually used** by Tailwind v4. The real config is in `globals.css @theme`. New developers would be misled.

2. **Footer `'use client'` is unnecessary:** Adds Footer to client bundle for no reason.

3. **Unused components:** `ServiceCard`, `Testimonial`, `ColorSwatch`, `EternavueMark`, `BackgroundVideo`, `HolographicImage`, `ResponsiveImage`, `NewsletterForm` are all built but never rendered on the page. 8 of 22 source files (36%) are dead code.

4. **Form logic duplication:** Three form components (`MemorialBookingForm`, `EventInquiryForm`, `CorporateContactForm`) share ~80% identical logic with no abstraction.

5. **Memory leak risks:** 2 uncleared `setTimeout` calls could cause React warnings in strict mode.

6. **No custom hooks:** No shared logic extraction despite identical patterns across forms.

---

## Corrections Summary

| Finding | Original Claim | Validated Result | Impact |
|---|---|---|---|
| CVEs applicable | All 6 apply | Only 3 of 6 apply | Security score +5 |
| `text-neutral-400` contrast | "May fail WCAG AA" | Passes at 8.09:1 | Accessibility: slight improvement |
| `text-white/30` contrast | Flagged | Confirmed FAIL at 2.30:1 | Confirmed |
| Page rendering | "Entirely client-rendered" | SSR'd to HTML, but opacity:0 hides content | Performance/A11y: major new finding |
| Twitter meta tags | "No Twitter card metadata" | Auto-generated by Next.js | SEO score +5 |
| Token system | "Partially duplicated" | Dead code (TW v4 ignores tailwind.config.ts) | Code quality/maintainability -7 each |
| CI/CD | "No CI pipeline" | CI exists on unmerged branch, all runs failed | DevOps +3 |
| Index keys | Not mentioned | 4 instances found | Code quality -2 |
| Memory leaks | Not mentioned | 2 uncleared setTimeout | Code quality -2 |
| Footer `use client` | Not mentioned | Unnecessary directive | Performance -1 |
| Unused components | Mentioned 4 | Actually 8 of 22 files (36%) unused | Maintainability -5 |
| Opacity:0 invisibility | Not mentioned | **18 elements invisible without JS** | **A11y -7, Performance -3** |
| Dead anchor links | "Multiple" | **12 dead links, 0 blank links** | UI/UX -4 |
| Font tokens | "Doesn't match loaded fonts" | Georgia is fallback, Playfair is primary (misleading, not wrong) | Neutral |

---

## Final Validated Scores

| Category | Score | Grade | Key Blocker |
|---|---|---|---|
| Code Quality & Architecture | 55/100 | D+ | Dead token system, lint errors, memory leaks |
| UI/UX Design | 68/100 | C+ | 12 dead links, non-functional buttons |
| Accessibility | 28/100 | F | Content invisible without JS, 4 contrast failures, minimal ARIA |
| Security | 35/100 | F | Next.js RCE vulnerability (CVSS 10.0) |
| Performance | 55/100 | D+ | 189KB gzipped JS, opacity:0 kills perceived load |
| Testing | 0/100 | F | Zero tests exist |
| SEO & Discoverability | 50/100 | D | No robots.txt, sitemap, structured data, OG image |
| Documentation | 62/100 | C- | Stale version refs, dead token docs, empty CONTRIBUTING |
| DevOps & CI/CD | 28/100 | F | No CI on main, no pre-commit hooks |
| Maintainability | 48/100 | D | 36% unused files, dead config, no abstractions |
| **Overall** | **43/100** | **D** | Not production-ready |

---

## Top 5 Highest-Impact Fixes

1. **Upgrade Next.js** (`npm install next@16.1.6`) - Fixes CVSS 10.0 RCE vulnerability. 5 minutes.
2. **Fix Framer Motion opacity:0** - Add `initial={false}` or use CSS animations with `@starting-style`. Restores content visibility without JS. 2 hours.
3. **Add basic test suite** - Install Vitest + Testing Library. Write smoke tests for each component. 1 day.
4. **Clean up dead code** - Remove unused `tokens.ts`/`tailwind.config.ts`, unused components, or integrate them. 2 hours.
5. **Fix all ESLint errors** - Escape HTML entities in JSX, remove unused imports. `npx eslint --fix` handles most. 15 minutes.

---

*This validated assessment was produced through: `npm audit --json` (CVE analysis), `npm run build` + HTML output inspection (SSR validation), Python WCAG 2.1 relative luminance calculation (contrast ratios for 15 color pairs), `npm run lint` (ESLint verification), `npx tsc --noEmit` (TypeScript verification), rendered HTML parsing (semantic audit, ARIA count, anchor link validation, opacity analysis), static code analysis (use client necessity, key props, memory leaks, XSS vectors), bundle size measurement (gzip compression of each chunk), and GitHub CLI (repo settings, CI history).*
