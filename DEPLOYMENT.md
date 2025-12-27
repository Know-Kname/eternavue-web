# 🚀 Eternavue Deployment Guide

## Step 1: View Locally First

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

Visit **http://localhost:3000** in your browser.

---

## Step 2: Deploy to Vercel (Recommended)

### Option A: Via Vercel Website (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com)**
   - Sign up/login with GitHub
   - Click "Add New Project"
   - Import your `eternavue-web` repository
   - Vercel auto-detects Next.js - just click "Deploy"
   - Your site will be live in ~2 minutes at `eternavue-web.vercel.app`

### Option B: Via Vercel CLI

```bash
npm install -g vercel
vercel
```

Follow the prompts. For production: `vercel --prod`

---

## Step 3: Connect Your Custom Domain

### In Vercel Dashboard:

1. Go to your project → **Settings** → **Domains**
2. Enter: `eternavue.com` (or `holisticholography.com`)
3. Click **Add**

### Configure DNS at Your Domain Registrar:

Vercel will show you exact DNS records. Add these:

**For Root Domain:**
- **Type:** `A` or `CNAME`
- **Name:** `@` (or leave blank)
- **Value:** Vercel will show you (usually `76.76.21.21` for A record or `cname.vercel-dns.com` for CNAME)

**For WWW:**
- **Type:** `CNAME`
- **Name:** `www`
- **Value:** `cname.vercel-dns.com`

### Wait for DNS Propagation:
- Usually 15-30 minutes
- Can take up to 48 hours
- Vercel will show "Valid Configuration" when ready

### SSL Certificate:
- Vercel provides free SSL automatically
- Your site will be at `https://eternavue.com`

---

## Quick Commands

```bash
# Local
npm install          # Install dependencies
npm run dev          # View at localhost:3000
npm run build        # Test production build

# Deploy
vercel               # Deploy preview
vercel --prod        # Deploy to production
```

---

## Troubleshooting

**Build fails?**
```bash
rm -rf .next node_modules
npm install
npm run build
```

**Domain not working?**
- Check DNS records match Vercel's instructions
- Wait for DNS propagation (15-30 min)
- Verify "Valid Configuration" in Vercel dashboard

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

