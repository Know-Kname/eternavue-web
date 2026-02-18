# Pre-Launch Checklist - Eternavue Web

**Use this checklist before going live on Vercel**

---

## ✅ Code Quality & Architecture

- [ ] Run `npm run lint` - No ESLint errors
- [ ] Run `npm run type-check` - No TypeScript errors
- [ ] Run `npm run validate` - All checks pass
- [ ] Review all console warnings/errors
- [ ] Test responsive design on mobile
- [ ] Test dark mode toggle works
- [ ] Test all interactive components

---

## ✅ Error Handling

- [ ] Test 404 page: Visit `/this-does-not-exist`
- [ ] Verify error.tsx renders user-friendly message
- [ ] Verify "Try Again" button works
- [ ] Check error logs are clear for debugging

---

## ✅ Environment Setup

- [ ] Copy `.env.example` to `.env.local`
- [ ] Fill in all required variables
- [ ] Add all variables to Vercel Settings → Environment Variables:
  - `NEXT_PUBLIC_TALLY_MEMORIAL_ID`
  - `NEXT_PUBLIC_TALLY_EVENT_ID`
  - `NEXT_PUBLIC_TALLY_CORPORATE_ID`
  - `NEXT_PUBLIC_ANALYTICS_ID`

---

## ✅ Security

- [ ] Verify security headers in next.config.ts
- [ ] After deploy, test headers: `curl -I https://eternavue.vercel.app`
- [ ] Confirm these headers present:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), etc.

---

## ✅ Forms & Tally Integration

- [ ] Verify Tally form IDs are correct (check .env.local)
- [ ] Test Memorial form submission
- [ ] Test Event form submission
- [ ] Test Corporate form submission
- [ ] Confirm form data appears in Tally dashboard
- [ ] Test form success messages display

---

## ✅ Analytics

- [ ] Get Google Analytics ID from your account
- [ ] Add to `.env.local`: `NEXT_PUBLIC_ANALYTICS_ID=G-XXXXXXXXXX`
- [ ] After deploy, verify in Google Analytics:
  - Real-time users show 1+ when you visit
  - Page views are being tracked
  - Events are firing

---

## ✅ Performance

- [ ] Run Lighthouse audit:
  ```bash
  # Open DevTools (F12) → Lighthouse tab
  # Run performance, accessibility, best practices, SEO
  ```
- [ ] Scores should be:
  - Performance: > 80
  - Accessibility: > 90
  - Best Practices: > 90
  - SEO: > 90

- [ ] Test on slow 3G (DevTools Network tab)
- [ ] Page loads in < 3 seconds
- [ ] Images load smoothly
- [ ] Animations are smooth (60 fps)

---

## ✅ Accessibility

- [ ] Run Axe DevTools or similar (Chrome Extension)
- [ ] No critical accessibility issues
- [ ] Keyboard navigation works (Tab through all elements)
- [ ] Dark mode colors have sufficient contrast
- [ ] Light mode colors have sufficient contrast
- [ ] Form labels are properly associated with inputs

---

## ✅ SEO

- [ ] Metadata present and correct (check page source)
- [ ] Title tags are descriptive
- [ ] Meta descriptions present
- [ ] Open Graph tags present
- [ ] Twitter card tags present
- [ ] Heading hierarchy is correct (h1, h2, h3, etc.)
- [ ] No broken internal links

**To Add Later:**
- [ ] Create `public/sitemap.xml`
- [ ] Create `public/robots.txt`
- [ ] Submit sitemap to Google Search Console

---

## ✅ Mobile Testing

- [ ] View on iPhone (6.1" screen size)
- [ ] View on Android (typical phone size)
- [ ] Hamburger menu works (if present)
- [ ] Touch interactions work smoothly
- [ ] Forms are easy to fill on mobile
- [ ] CTA buttons are tap-friendly (min 44x44px)
- [ ] No horizontal scroll

---

## ✅ Cross-Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

Verify:
- [ ] No console errors
- [ ] Styling looks correct
- [ ] Animations are smooth
- [ ] Forms work properly

---

## ✅ Deployment

- [ ] Commit all changes to GitHub:
  ```bash
  git add .
  git commit -m "Add error boundaries, security headers, env config"
  git push origin main
  ```

- [ ] Vercel auto-deploys from GitHub
- [ ] Check build status in Vercel dashboard
- [ ] Wait for "Ready" status
- [ ] View live deployment

---

## ✅ Post-Deploy Verification

- [ ] Visit production URL: `https://eternavue.vercel.app`
- [ ] Homepage loads without errors
- [ ] Dark mode works
- [ ] All links work
- [ ] Forms submit properly
- [ ] Security headers present (curl -I)
- [ ] Analytics are tracking
- [ ] No 404 errors in console

---

## ✅ Content Verification

- [ ] All text is spelled correctly
- [ ] Brand name "Eternavue" spelled consistently
- [ ] Detroit Memorial Park mentioned correctly
- [ ] All dates are current (if any)
- [ ] Phone numbers are correct (if added)
- [ ] Email addresses are correct (if added)
- [ ] External links work and open in new tab

---

## ✅ Documentation

- [ ] README.md is up to date
- [ ] DEPLOYMENT.md exists (if needed)
- [ ] Code comments are clear
- [ ] Component props documented
- [ ] Environment variables documented

---

## 🚨 Critical Issues Found?

If you find issues:

1. **Bug:** Create issue on GitHub
2. **Minor:** Fix immediately and redeploy
3. **Major:** Fix, test locally, then redeploy
4. **Security:** Hotfix immediately

---

## ✨ Ready to Launch?

When ALL checkboxes are checked:

✅ **You're ready to go live!**

---

## 📊 Launch Checklist Score

Count checked boxes:
- Total items: ~50
- Required for launch: ~45 (exclude "Later" items)
- You need: >= 90% checked

**When 90%+ are checked: READY FOR LAUNCH** 🚀

---

## 🎉 Celebrate!

You've built something amazing. Your Eternavue Web is professional, modern, and ready for users to experience holographic memorials like never before.

**Great job!** 🎊

---

**Checklist Last Updated:** February 18, 2026  
**For Questions:** Refer to IMPLEMENTATION_GUIDE_AUDIT.md
