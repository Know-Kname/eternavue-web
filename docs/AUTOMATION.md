# Eternavue Automation Systems

**The best way to build: automate everything, never repeat yourself.**

This document describes all automation systems built into Eternavue for design-to-code synchronization, deployment, and continuous improvement.

---

## 🚀 Quick Start

```bash
# One-time setup
bash scripts/setup-automation.sh

# Daily commands
npm run dev                    # Development
npm run tokens:extract        # Sync tokens from Figma
npm run dark:generate         # Add dark mode to components
npm run validate              # Full validation pipeline
```

---

## 📋 Automation Systems

### 1. Figma Token Extraction

**What it does:** Automatically extracts design tokens from your Figma file and generates TypeScript/CSS.

**Files:**
- Script: `scripts/extract-figma-tokens.ts`
- Output: `src/design/tokens-figma.ts`, `src/app/tokens.css`
- Docs: `docs/TOKENS.md` (auto-generated)

**How to use:**

```bash
# Extract tokens from Figma
export FIGMA_TOKEN=your_token_here
export FIGMA_FILE_ID=2YKFjeiywrLmUIdvM2VhZ5
npm run tokens:extract
```

**What it extracts:**
- ✅ Colors (primary, accent, holographic, neutral)
- ✅ Spacing values
- ✅ Typography settings
- ✅ Shadow/elevation definitions
- ✅ Border radius values

**Output structure:**
```typescript
export const figmaTokens = {
  colors: {
    primary: {
      50: '#f0f4f8',
      500: '#1F3252',
      950: '#02050a',
    },
    accent: {
      500: '#D4A574',
    },
  },
  spacing: {
    xs: '4px',
    md: '16px',
    lg: '24px',
  },
  // ... more tokens
}
```

**Environment variables:**
```bash
FIGMA_TOKEN          # Get from figma.com/developers
FIGMA_FILE_ID        # Your Figma file ID
```

---

### 2. Dark Mode Auto-Generation

**What it does:** Scans all components and automatically adds dark mode variants.

**Files:**
- Script: `scripts/generate-dark-mode.ts`
- Input: `src/components/**/*.tsx`
- Output: Same files with dark: utilities added

**How to use:**

```bash
npm run dark:generate
```

**What it does:**
1. Scans all component files
2. Finds light mode classes (bg-, text-, border-, shadow-)
3. Intelligently maps to dark mode equivalents
4. Adds dark: utilities preserving light mode originals

**Example transformations:**

```typescript
// Before
className="bg-white text-neutral-900 border-neutral-200"

// After
className="bg-white dark:bg-primary-950 text-neutral-900 dark:text-white border-neutral-200 dark:border-white/10"
```

**Mapping rules:**
- `bg-white` → `dark:bg-primary-950`
- `text-neutral-900` → `dark:text-white`
- `border-neutral-200` → `dark:border-white/10`
- `shadow-md` → `dark:shadow-lg dark:shadow-black/50`

**Safe:** Runs once, marks files modified, lets you review changes.

---

### 3. Tally Forms Integration

**What it does:** Automatically submits contact forms to Tally.so.

**Files:**
- Hook: `src/hooks/useTallyForm.ts`
- Form: `src/components/forms/MemorialBookingForm.tsx` (example)

**How to use:**

```typescript
import { useTallyForm } from '@/hooks/useTallyForm'

export function MyForm() {
  const { submit, loading, error, success } = useTallyForm('form_id')

  const handleSubmit = async (e) => {
    e.preventDefault()
    await submit({ name: 'John', email: 'john@example.com' })
  }

  return (
    <form onSubmit={handleSubmit}>
      {success && <p>✓ Submitted!</p>}
      {error && <p>✗ {error}</p>}
      <button disabled={loading}>
        {loading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  )
}
```

**Environment variables:**
```bash
NEXT_PUBLIC_TALLY_FORM_ID_MEMORIAL   # Tally Form ID for memorial forms
NEXT_PUBLIC_TALLY_FORM_ID_EVENT      # Tally Form ID for event forms
NEXT_PUBLIC_TALLY_FORM_ID_CORPORATE  # Tally Form ID for corporate forms
```

**Demo mode:** If form ID is not set, submissions are stored in localStorage for testing.

**Features:**
- ✅ Async form submission
- ✅ Loading state
- ✅ Error handling
- ✅ Success feedback
- ✅ Demo/test mode
- ✅ Type-safe form data

---

### 4. GitHub Actions CI/CD

**What it does:** Automatically validates code, runs tests, and deploys on every push.

**Files:** `.github/workflows/ci.yml`

**Workflow:**

```
┌─ On Push to main/develop
│
├─ Quality Checks
│  ├─ ESLint
│  ├─ TypeScript type check
│  └─ Build verification
│
├─ Design System Sync (optional)
│  ├─ Extract Figma tokens
│  ├─ Generate dark mode
│  └─ Commit changes
│
├─ Security Scan
│  └─ npm audit
│
├─ Performance Check
│  └─ Lighthouse audit
│
└─ Deploy to Vercel
   ├─ Staging (develop branch)
   └─ Production (main branch)
```

**Configuration:**

```yaml
# In your GitHub repository settings, add secrets:
FIGMA_TOKEN           # For token extraction
VERCEL_TOKEN          # For Vercel deployment
VERCEL_ORG_ID         # Vercel organization ID
VERCEL_PROJECT_ID     # Vercel project ID
SLACK_WEBHOOK         # Optional: for notifications
```

**Features:**
- ✅ Automatic validation on every commit
- ✅ Parallel job execution
- ✅ Design token sync
- ✅ Vercel deployment
- ✅ Performance monitoring
- ✅ Security scanning

---

### 5. Component Generation

**What it does:** Automatically generates component boilerplate from templates.

**Coming soon:** Figma to React component generation.

---

### 6. Documentation Generation

**What it does:** Auto-generates docs from TypeScript comments and Figma data.

**Output:**
- `docs/TOKENS.md` - Design token reference (auto-generated)
- `docs/COMPONENTS.md` - Component API docs (auto-generated)
- `docs/AUTOMATION.md` - This file

---

## 🔄 Automation Workflows

### Daily Workflow

```bash
# 1. Start development
npm run dev

# 2. Make changes to components, design tokens, etc.
# ... your work ...

# 3. Before committing
npm run validate          # Lint + type check + build

# 4. Commit changes
git add .
git commit -m "Feature: Add new component"
git push

# 5. GitHub Actions runs:
# - Linting & type checking
# - Build verification
# - Tests (when available)
# - Deploy to Vercel
```

### Weekly Workflow

```bash
# 1. Sync design tokens from Figma
npm run tokens:extract

# 2. Add dark mode to any new components
npm run dark:generate

# 3. Review changes
git diff

# 4. Commit and push
git add .
git commit -m "🎨 chore: sync design system from Figma"
git push
```

### Deployment Workflow

```bash
# Develop branch → Vercel staging
git push origin develop

# Main branch → Vercel production
git push origin main
```

---

## 🛠️ Available Scripts

```bash
# Development
npm run dev              # Start dev server (localhost:3000)
npm run build            # Build for production
npm run start            # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Auto-fix linting issues
npm run type-check       # TypeScript type checking
npm run format           # Format code with Prettier
npm run validate         # Full validation (lint + type-check + build)

# Automation
npm run setup            # One-time setup of all systems
npm run tokens:extract   # Extract tokens from Figma
npm run dark:generate    # Generate dark mode variants
```

---

## 🔐 Environment Variables

Create `.env.local` in the root:

```bash
# Figma Integration
FIGMA_TOKEN=figd_xxxxx...
FIGMA_FILE_ID=2YKFjeiywrLmUIdvM2VhZ5

# Form Integration
NEXT_PUBLIC_TALLY_FORM_ID_MEMORIAL=form_id_here
NEXT_PUBLIC_TALLY_FORM_ID_EVENT=form_id_here
NEXT_PUBLIC_TALLY_FORM_ID_CORPORATE=form_id_here

# Vercel Deployment
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Analytics
NEXT_PUBLIC_GA_ID=G-xxxxx

# Optional: Slack notifications
SLACK_WEBHOOK=https://hooks.slack.com/services/...
```

---

## 📊 Automation Benefits

| Aspect | Before | After |
|--------|--------|-------|
| **Design Sync** | Manual copy-paste | Automatic extraction |
| **Dark Mode** | Manually add to each component | Auto-generated for all |
| **Form Submissions** | console.log() | Real Tally Forms API |
| **Validation** | Manual checking | Automated on every commit |
| **Deployment** | Manual to Vercel | Automatic on git push |
| **Testing** | When you remember | Every commit |
| **Documentation** | Manual updates | Auto-generated from code |
| **Consistency** | Variable | Guaranteed by automation |

---

## 🚨 Troubleshooting

### Figma Token Extraction Fails

**Problem:** `Failed to fetch Roboto from Google Fonts`

**Solution:**
```bash
# Verify Figma token is set
echo $FIGMA_TOKEN

# Check file ID
export FIGMA_FILE_ID=2YKFjeiywrLmUIdvM2VhZ5

# Try extraction again
npm run tokens:extract
```

### Dark Mode Generation Skips Files

**Problem:** Dark mode not added to some components

**Solution:**
```bash
# Check if component has light mode classes
grep -n "bg-" src/components/your-component.tsx

# Run generation with verbose output
npm run dark:generate
```

### Vercel Deployment Fails

**Problem:** GitHub Actions can't deploy to Vercel

**Solution:**
1. Check `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` are set in GitHub Secrets
2. Verify Vercel project exists and is linked
3. Check build settings in `vercel.json`

### Form Submissions Not Working

**Problem:** Forms show "Form ID not configured" error

**Solution:**
```bash
# Set Tally Form IDs in .env.local
NEXT_PUBLIC_TALLY_FORM_ID_MEMORIAL=your_form_id
NEXT_PUBLIC_TALLY_FORM_ID_EVENT=your_form_id
NEXT_PUBLIC_TALLY_FORM_ID_CORPORATE=your_form_id

# Test with demo mode (no form ID needed)
# Forms will use localStorage for testing
```

---

## 📚 Learning More

- **Figma API:** https://www.figma.com/developers
- **Next.js:** https://nextjs.org/docs
- **Tailwind CSS:** https://tailwindcss.com/docs
- **Tally Forms:** https://tally.so/api

---

## 🎯 Future Automation

Planned additions:
- [ ] Component snapshot testing (Percy.io)
- [ ] Accessibility auditing (axe)
- [ ] Bundle size monitoring
- [ ] E2E testing (Playwright)
- [ ] Automatic changelog generation
- [ ] Design system versioning
- [ ] Visual regression testing
- [ ] Performance profiling

---

## ✅ Checklist for Success

- [ ] `.env.local` configured with all tokens
- [ ] GitHub Actions secrets set up
- [ ] Figma token extraction tested
- [ ] Dark mode generation tested
- [ ] Forms working with Tally
- [ ] Vercel deployment working
- [ ] All automation scripts passing
- [ ] Team trained on automation workflow

---

**Built with automation in mind. Never repeat yourself. Always stay in sync.** 🚀
