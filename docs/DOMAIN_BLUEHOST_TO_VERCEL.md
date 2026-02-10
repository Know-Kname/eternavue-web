# Bluehost to Vercel Domain Runbook (eternavue.com)

This runbook prepares `eternavue.com` to move from Bluehost DNS hosting to Vercel project hosting without downtime.

## Current status

- Aesthetic overhaul branch: `feature/aesthetic-overhaul`
- PR: `https://github.com/Know-Kname/eternavue-web/pull/19`
- Local preview: `http://localhost:3000`
- Vercel Git deployments are currently failing on the team scope and require account re-authentication before domain cutover.

## 1) Recover Vercel preview first

Before touching production DNS, get a healthy Vercel preview deployment.

1. Open PR checks and click failed deployment links:
   - `https://vercel.com/chi-chi-projects/eternavue-web/Hi8qP9duLrAHLBbQRFiePbjhpega`
   - `https://vercel.com/chi-chi-projects/eternavue-web-xplr/FUcMWsxomLnbMYLfKcARuLnrGzCi`
2. Sign in to Vercel with access to team `chi-chi-projects`.
3. In the failed deployment UI, note the first failing build step and fix it.
4. Re-run deployment from the Vercel deployment page or push a new commit.
5. Confirm a green preview URL is generated and loads the updated UI.

### Common Vercel failure checks

- Project root directory points to repo root.
- Build command is default (`next build`) or equivalent.
- Node version in Project Settings is compatible with Next.js 16.
- Environment variables required at build/runtime are set in Vercel.

## 2) Decide primary project

Two Vercel projects are currently connected:

- `eternavue-web`
- `eternavue-web-xplr`

Pick one as canonical production target (recommended: `eternavue-web`) and disable production domain assignment on the other to avoid DNS conflicts.

## 3) Add domain in Vercel (do this before DNS changes)

In Vercel project settings:

1. Go to **Project -> Settings -> Domains**
2. Add:
   - `eternavue.com`
   - `www.eternavue.com`
3. Keep this screen open. Vercel will show required DNS records and verification status.

Use the values shown in Vercel UI as source of truth if they differ from the defaults below.

## 4) Update DNS in Bluehost (Zone Editor)

At Bluehost DNS Zone Editor for `eternavue.com`:

1. Lower TTL to `300` on existing web records (optional but recommended) 15-30 minutes before cutover.
2. Replace/add records for web traffic:

   - Type: `A`
   - Host/Name: `@`
   - Value: `76.76.21.21`
   - TTL: `300`

   - Type: `CNAME`
   - Host/Name: `www`
   - Value: `cname.vercel-dns.com`
   - TTL: `300`

3. Keep all email records intact (`MX`, `TXT` SPF/DKIM/DMARC, mail host records).

Do not change nameservers unless intentionally moving full DNS hosting away from Bluehost.

## 5) Verify propagation and certificate

After DNS update:

1. Verify DNS:
   - `nslookup -type=A eternavue.com`
   - `nslookup -type=CNAME www.eternavue.com`
2. In Vercel Domains page, click verify/recheck if needed.
3. Wait for SSL certificate to become active.
4. Confirm:
   - `https://eternavue.com` loads correctly
   - `https://www.eternavue.com` loads and redirects as expected

## 6) Redirect strategy

Choose one canonical host:

- Option A: apex canonical (`eternavue.com`)
- Option B: `www` canonical

Configure redirect in Vercel Domains settings so only one canonical URL remains indexed.

## 7) Rollback plan (if anything breaks)

If production fails after cutover:

1. Restore previous Bluehost `A/CNAME` web records from backup.
2. Wait for DNS TTL propagation.
3. Keep Vercel domain assignment in place, fix deployment, and retry cutover later.

## 8) Recommended safe sequence

1. Fix preview deployment first.
2. Validate PR preview with stakeholders.
3. Merge PR.
4. Verify production deployment in Vercel (without DNS cutover yet).
5. Execute DNS cutover during low-traffic window.
6. Monitor for 24 hours.
