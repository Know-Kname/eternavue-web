# Eternavue Figma-to-Code Improvement Plan

**Created:** January 24, 2026
**Status:** Awaiting Approval
**Branch:** `claude/review-figma-eternavue-45xGT`

---

## Executive Summary

Your Eternavue web app has a **solid foundation** with excellent component architecture and design system. However, there are **key gaps between Figma designs and current implementation** that need addressing to achieve design fidelity and unlock strategic features.

### Key Findings

✅ **Strengths:**
- 22 well-organized components across 6 semantic categories
- Comprehensive design system (colors, spacing, typography, tokens)
- Modern tech stack (Next.js 16, React 19, Tailwind CSS v4)
- Mobile-first responsive design
- Clean, type-safe codebase

⚠️ **Critical Gaps (Fix These First):**
1. **Font mismatch**: Figma uses Roboto; code uses Inter + Playfair Display
2. **Missing dark mode**: Figma has dark variants; code has zero dark mode support
3. **No form backend**: All 3 contact forms use console.log (blocking MVP launch)
4. **Design system documentation**: Token alignment incomplete

🎯 **Opportunities:**
- Implement automated Figma↔Code sync
- Add design token documentation
- Create component variant system matching Figma structure
- Set up CI/CD pipelines

---

## Part 1: Figma Design System Analysis

### 1.1 Current Figma Structure

**File 1: Eternavue (Main)**
- Navbar component (Desktop/Mobile variants)
- Header section (with CTA buttons)
- Button component (Primary/Secondary, Small/Large sizes, Dark mode support)
- Logo component

**File 2: eternavueholo**
- Additional holographic design explorations

**File 3: Eternavue - Holistic Holography**
- Site-wide design system

### 1.2 Design System Specifications

| Element | Figma | Current Code | Gap |
|---------|-------|--------------|-----|
| **Fonts** | Roboto (all text) | Inter (body) + Playfair (headings) | ❌ Needs update |
| **Primary Color** | TBD from Figma | #1F3252 (Dark Blue) | ✅ Aligned |
| **Accent Color** | TBD from Figma | #D4A574 (Gold) | ✅ Likely aligned |
| **Holographic** | Cyan glow | #32B8C6 | ✅ Aligned |
| **Button Variants** | Primary, Secondary | Primary, Secondary, Ghost | ⚠️ Extra variant |
| **Button Sizes** | Small, Large | sm, md, lg | ⚠️ Extra size |
| **Dark Mode** | Yes (variants exist) | ❌ No dark mode | ❌ Critical gap |
| **Responsive** | Desktop/Mobile splits | Tailwind breakpoints (md:) | ✅ Aligned |
| **Spacing** | 8px grid system | xs-3xl tokens | ✅ Aligned |

---

## Part 2: Repository Status

### 2.1 Current State
- **Branch:** `claude/review-figma-eternavue-45xGT` (clean, no changes)
- **Components:** 22 organized by semantic category
- **Last Commit:** `a1512a3` Initial commit (4 weeks ago)
- **Status:** Code ready, dependencies need installing

### 2.2 Critical Blockers for MVP Launch

| Issue | Priority | Impact | Time to Fix |
|-------|----------|--------|-------------|
| Form backend integration | 🔴 HIGH | Can't capture leads | 2-3 hours |
| Dependencies not installed | 🔴 HIGH | Can't run dev/build | 5 minutes |
| No CI/CD workflows | 🟡 MEDIUM | Can't deploy safely | 1 hour |
| Font misalignment | 🟡 MEDIUM | Design fidelity issue | 15 minutes |
| Missing dark mode | 🟡 MEDIUM | Incomplete design system | 4-6 hours |

---

## Part 3: Prioritized Improvements

### PHASE 1: Quick Wins (Today - 45 minutes)
**Goal:** Design fidelity improvements with minimal risk

**1.1 Update Fonts to Roboto** ⚡ (15 min)
- Replace Inter + Playfair Display with Roboto (single font family)
- **Files:** `src/app/layout.tsx`, `src/app/globals.css`, `src/design/tokens.ts`
- **Impact:** High visual alignment with Figma
- **Risk:** Low (pure styling change)

**1.2 Install Dependencies** ⚡ (5 min)
- Run `npm install`
- Verify build: `npm run build`
- **Impact:** Enables local testing and development
- **Risk:** None

**1.3 Verify Button Variants** ⚡ (10 min)
- Check if "ghost" variant exists in Figma
- If not: document as code-only extension or remove
- Update documentation
- **Impact:** Consistency documentation
- **Risk:** None

**1.4 Add Quick Documentation** ⚡ (10 min)
- Create `docs/design-system.md` with Figma↔Code mapping
- Document design decisions and gaps
- **Impact:** Team clarity
- **Risk:** None

### PHASE 2: Critical Features (This Week - 6-8 hours)
**Goal:** Complete MVP-launch readiness

**2.1 Integrate Tally Forms** ⚙️ (2-3 hours)
- Replace `console.log` with real form submissions
- Configure Tally API integration
- **Files:** `src/components/forms/*`
- **Status:** Blocking feature - needed for lead capture
- **Verification:** Test all 3 form types (Memorial, Event, Corporate)

**2.2 Implement Dark Mode Foundation** ⚙️ (3-4 hours)
- Add `darkMode: 'class'` to Tailwind config
- Define dark color variants in design tokens
- Add ThemeToggle component
- Install `next-themes` package
- **Files:** `tailwind.config.ts`, `src/design/tokens.ts`, `src/app/layout.tsx`
- **Impact:** Aligns with Figma design system
- **Verification:** Toggle dark mode, all components readable

**2.3 Set Up GitHub Actions CI/CD** ⚙️ (1-2 hours)
- Lint check (ESLint)
- Type check (TypeScript)
- Build verification
- Auto-deploy to Vercel on main branch
- **Files:** `.github/workflows/`
- **Impact:** Safe deployments, catch regressions

### PHASE 3: Design System Excellence (2-3 weeks)
**Goal:** Long-term maintainability and Figma fidelity

**3.1 Complete Dark Mode Component Updates** 📐 (2-3 hours)
- Add `dark:` utilities to all 22 components
- Ensure proper contrast ratios
- **Files:** All component files
- **Verification:** Audit accessibility with dark mode enabled

**3.2 Create Component Variant System** 📐 (2-3 hours)
- Refactor Header → Navbar with explicit variants (Desktop/Mobile)
- Create variant-based component API matching Figma
- **Files:** `src/components/layout/`, all component files
- **Impact:** Better testability, Storybook integration ready

**3.3 Design Token Documentation** 📐 (2-3 hours)
- Extract all tokens from Figma
- Create comprehensive token reference
- Map Figma names to code names
- Document usage patterns
- **Files:** `docs/design-tokens.md`

**3.4 Responsive Design Audit** 📐 (1-2 hours)
- Test at Figma breakpoints (375px mobile, 1440px desktop)
- Fix any layout issues
- Verify button/typography scaling
- **Files:** All components

### PHASE 4: Automation & Scalability (1-2 months)
**Goal:** Sustained design-code alignment

**4.1 Figma API Integration** 🔄 (4-6 hours)
- Automated token extraction from Figma
- Visual regression testing
- Design-code sync on changes
- **Tools:** Figma API, GitHub Actions, Chromatic/Percy
- **Impact:** Prevents future design drift

**4.2 Storybook Setup** 🔄 (3-4 hours)
- Install Storybook
- Create stories for all 22 components
- Embed Figma designs for visual reference
- **Impact:** Developer experience, QA testing

**4.3 Portfolio & Media Assets** 🔄 (Ongoing)
- Add holographic demo imagery
- Create case studies section
- Optimize image delivery
- **Files:** `public/`, new portfolio components

---

## Part 4: Implementation Roadmap

### Week 1: MVP Readiness
```
Day 1 (Today):
  ✅ Phase 1: Quick Wins (45 min)
  ├─ Update fonts to Roboto
  ├─ Install dependencies
  ├─ Verify button variants
  └─ Add design documentation

Day 2-3:
  🔧 Phase 2a: Tally Forms Integration (3 hours)
  ├─ Set up Tally API connection
  ├─ Test all form submissions
  ├─ Verify email notifications

Day 3-4:
  🔧 Phase 2b: Dark Mode (4 hours)
  ├─ Configure Tailwind dark mode
  ├─ Add dark color tokens
  ├─ Create ThemeToggle component
  └─ Test across all pages

Day 5:
  🔧 Phase 2c: CI/CD Setup (2 hours)
  ├─ Create GitHub Actions workflows
  ├─ Test build pipeline
  └─ Configure Vercel deployment

  ✅ MILESTONE: MVP Ready for Launch
```

### Week 2-3: Design Excellence
```
✅ Dark mode component updates (3 hours)
✅ Component variant refactoring (3 hours)
✅ Design token documentation (3 hours)
✅ Responsive design audit (2 hours)
✅ Performance optimization (2 hours)

MILESTONE: Design Fidelity Complete
```

### Month 2+: Automation
```
🔄 Figma API integration
🔄 Storybook setup
🔄 Automated testing
🔄 Portfolio section
🔄 SEO optimization
```

---

## Part 5: File Changes Summary

### Files to Create
```
NEW: /docs/design-system.md                          (Design↔Code mapping)
NEW: /docs/design-tokens.md                          (Token reference)
NEW: .github/workflows/ci.yml                        (ESLint + TypeScript checks)
NEW: .github/workflows/deploy.yml                    (Vercel deployment)
NEW: /src/components/ui/ThemeToggle.tsx              (Dark mode toggle)
NEW: /src/providers/ThemeProvider.tsx                (next-themes setup)
```

### Files to Modify (Phase 1)
```
MODIFY: /src/app/layout.tsx                          (Font imports: Roboto)
MODIFY: /src/app/globals.css                         (Font variables, dark mode)
MODIFY: /src/design/tokens.ts                        (Font tokens, dark colors)
MODIFY: package.json                                 (Add next-themes dependency)
```

### Files to Modify (Phase 2)
```
MODIFY: /src/components/forms/MemorialBookingForm.tsx
MODIFY: /src/components/forms/EventInquiryForm.tsx
MODIFY: /src/components/forms/CorporateContactForm.tsx
        (All: Replace console.log with Tally Forms API)

MODIFY: /tailwind.config.ts                          (darkMode config)
MODIFY: /src/app/layout.tsx                          (ThemeProvider wrapper)
MODIFY: All component files - add dark: utilities
```

### Files to Modify (Phase 3)
```
REFACTOR: /src/components/layout/Header.tsx → Navbar.tsx (variant system)
CREATE: /src/components/layout/DesktopNav.tsx
CREATE: /src/components/layout/MobileNav.tsx
UPDATE: All other components (variant consistency)
```

---

## Part 6: Risk Assessment

| Change | Risk Level | Mitigation |
|--------|-----------|-----------|
| Font update (Roboto) | 🟢 LOW | Pure CSS, no logic changes, easy rollback |
| Dark mode | 🟢 LOW | Feature flag can disable if needed |
| Form integration | 🟡 MEDIUM | Requires Tally API key, test thoroughly |
| Component refactor | 🟡 MEDIUM | Git branch isolation, thorough testing |
| CI/CD setup | 🟢 LOW | Doesn't affect production until enabled |

---

## Part 7: Success Criteria

### Phase 1 Complete When:
- ✅ Fonts render as Roboto across entire site
- ✅ No console.log warnings for missing dependencies
- ✅ Documentation created and accurate
- ✅ Build succeeds: `npm run build`

### Phase 2 Complete When:
- ✅ All 3 form types submit to Tally Forms
- ✅ Test submissions appear in Tally dashboard
- ✅ Dark mode toggle works site-wide
- ✅ All components readable in dark mode
- ✅ CI pipeline runs on every commit
- ✅ Deploy to Vercel succeeds automatically

### Phase 3 Complete When:
- ✅ All 22 components have dark mode support
- ✅ Storybook shows all variants
- ✅ Responsive tests pass at all breakpoints
- ✅ Design token docs complete and accurate
- ✅ Lighthouse score ≥ 90

### Phase 4 Complete When:
- ✅ Figma→Code sync automated
- ✅ Visual regression tests pass
- ✅ Portfolio section built
- ✅ Team trained on new workflows

---

## Part 8: Required Decisions

### Decision 1: Font Family
**Question:** Was Playfair Display intentional for headings, or should we match Figma's Roboto exactly?

**Options:**
- A) **Match Figma exactly:** Use Roboto for all text (highest fidelity)
- B) **Keep Playfair:** Update Figma to reflect elegant serif choice
- C) **Hybrid:** Roboto for body, keep Playfair for display text only

**Recommendation:** Option A (Match Figma exactly) for initial launch, can revisit later.

**Impact:** If A is chosen, Phase 1.1 proceeds as planned.

---

### Decision 2: Button Variants
**Question:** Does Figma include a "ghost" (outline) button variant?

**Options:**
- A) **Keep ghost variant:** Code has more flexibility than Figma
- B) **Remove ghost variant:** Strict adherence to Figma design system
- C) **Add ghost to Figma:** Expand design system to include it

**Recommendation:** Option A (Keep ghost as extension) - provides design flexibility.

**Impact:** If A is chosen, update documentation explaining the addition.

---

### Decision 3: Dark Mode Implementation
**Question:** How should users toggle dark mode?

**Options:**
- A) **Class-based (preferred):** `dark` class on root, user controls toggle
- B) **System preference:** Auto-detect from OS dark mode
- C) **Both:** Respect system preference with manual override

**Recommendation:** Option C (Both) - best user experience.

**Impact:** Phase 2.2 uses this approach; config done in first hour.

---

### Decision 4: Form Backend
**Question:** Which form service to use for Tally Forms integration?

**Options:**
- A) **Tally Forms (current plan):** Spreadsheet collection, easy setup
- B) **Formspree:** Email forwarding, simpler
- C) **Custom backend:** Full control, more complex

**Recommendation:** Option A (Tally Forms) - already mentioned in docs, good for your use case.

**Impact:** If A is chosen, provide Tally Form IDs (one per form type).

---

## Part 9: Questions for You

Before I proceed, please confirm:

1. ✅ **Font Update Approval:** Update all text to Roboto (matching Figma)?
2. ✅ **Phase Priority:** Start with Phase 1 quick wins today?
3. ✅ **Form Backend:** Have Tally Form IDs ready for form integration?
4. ✅ **Dark Mode Scope:** Include dark mode in Phase 2 this week?
5. ✅ **Timeline:** Realistic to complete Phase 1+2 by end of week?

---

## Part 10: Deliverables Summary

### By End of Week 1:
- ✅ Fonts updated to Roboto
- ✅ All dependencies installed
- ✅ Tally Forms integrated (if IDs provided)
- ✅ Dark mode foundation complete
- ✅ GitHub Actions CI/CD running
- ✅ Design documentation created
- ✅ All tests passing
- ✅ Deploy to Vercel staging

### By End of Week 3:
- ✅ Dark mode fully implemented (all components)
- ✅ Component variant system refactored
- ✅ Design token documentation complete
- ✅ Responsive design verified
- ✅ Performance optimized
- ✅ Team documentation updated

### By End of Month 2:
- ✅ Figma↔Code sync automated
- ✅ Storybook setup complete
- ✅ Portfolio section built
- ✅ Analytics integrated
- ✅ SEO optimized
- ✅ Ready for production launch

---

## Next Steps

**To Proceed:**

1. **Review this plan** and provide feedback
2. **Answer the 5 key questions** in Part 9
3. **Provide Tally Form IDs** (if approving form integration)
4. **Confirm timeline** - can your team support this pace?
5. **Approve** and I'll start Phase 1 immediately

**Once Approved:**
- I'll create a git commit for each phase
- Push to `claude/review-figma-eternavue-45xGT` branch
- Provide testing instructions
- Document all changes

**Timeline:**
- Phase 1: Today (45 min)
- Phase 2: This week (6-8 hours)
- Phase 3: Weeks 2-3 (6-8 hours)
- Phase 4: Ongoing automation

---

## Questions? Let's Discuss!

Which improvements would be most valuable for your launch timeline? Any specific areas you'd like me to prioritize?
