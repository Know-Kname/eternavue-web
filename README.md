# Eternavue Web

**The white-label digital memorial platform for cemeteries and funeral homes.**

> Families don't stop needing a place to gather when the service ends. Eternavue gives cemeteries and funeral homes the platform to be that place — a livestreamed service, a lasting tribute page, a digital keepsake families actually keep — all under your brand. Built by people who have operated a cemetery since 1925. Not a tech company that discovered grief.

Eternavue is Christian Wright Hughes's independent venture. Detroit Memorial Park (est. 1925) is the flagship partner and first customer — not the owner. Tiers: **Basic** (livestream + memorial page) → **Plus** (+ lasting tribute, guestbook, keepsakes) → **Premium** (+ holographic capture / projection — top-tier upsell only).

> **Canonical positioning:** see `Eternavue/Eternavue_Positioning_2026.md`. Eternavue is **not** a "hologram company" — holograms are one Premium-tier feature, never the headline.

---

## 🎯 Product Vision

### What We Do
Eternavue is sold to cemeteries and funeral homes as tiered memorial packages:
- **Basic:** Livestreamed service + a branded memorial event page
- **Plus:** + a lasting online tribute page, guestbook, highlight reel, and digital keepsakes
- **Premium:** + holographic capture / projection (top-tier upsell)

### MVP Goals (Current Phase)
- Landing page with service showcase
- Lead capture and inquiry forms
- Mobile-first responsive design
- Professional, trustworthy brand presence
- Integration with Tally Forms for contact management

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (LTS recommended)
- npm 10+ or pnpm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/eternavue-web.git
cd eternavue-web

# Install dependencies
npm install

# Run development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Build for Production

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
eternavue-web/
├── src/
│   ├── app/                    # Next.js 15 App Router
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Landing page
│   │   └── globals.css        # Global styles
│   ├── components/
│   │   ├── ui/                # Base UI components (Button, Input, etc.)
│   │   ├── content/           # Content components (Hero, ServiceCard, etc.)
│   │   ├── forms/             # Form components (ContactForm, etc.)
│   │   ├── layout/            # Layout components (Header, Footer, etc.)
│   │   ├── media/             # Media components (HolographicImage, etc.)
│   │   └── branding/          # Brand elements (Logo, ColorSwatch, etc.)
│   └── design/
│       └── tokens.ts          # Design system tokens
├── public/                     # Static assets
├── tailwind.config.ts         # Tailwind configuration
└── package.json
```

---

## 🎨 Design System

### Design Tokens

All design values are centralized in `src/design/tokens.ts`:

```typescript
import { tokens } from '@/design/tokens'

// Colors
tokens.colors.primary[500]      // #1F3252 (Eternavue dark blue)
tokens.colors.accent[500]       // #D4A574 (Gold)
tokens.colors.holographic.cyan  // #32B8C6 (Holographic effect color)

// Typography
tokens.typography.fontSize.xl   // 1.25rem
tokens.typography.fontFamily.display  // Georgia (for headings)

// Spacing
tokens.spacing.md               // 16px
tokens.spacing.xl               // 32px
```

### Tailwind Integration

Design tokens are automatically available in Tailwind:

```tsx
<div className="bg-primary-500 text-accent-500 p-md">
  Content styled with design tokens
</div>
```

### Color Palette

- **Primary (Dark Blue):** Professional, trustworthy, dignified
- **Accent (Gold):** Premium, warm, heritage
- **Holographic (Cyan):** Modern, innovative, technology-forward
- **Neutral:** Clean backgrounds and text

---

## 🛠️ Tech Stack

| Category | Technology | Why We Chose It |
|----------|-----------|-----------------|
| **Framework** | Next.js 16 | Server components, excellent performance, industry standard |
| **UI Library** | React 19 | Latest features, robust ecosystem |
| **Styling** | Tailwind v4 | Rapid development, consistent design, small bundle size |
| **Language** | TypeScript | Type safety, better DX, fewer bugs |
| **Hosting** | Vercel | Zero-config deployment, edge functions, perfect Next.js integration |
| **Forms** | Tally Forms | No backend needed for MVP, professional form handling |

---

## 🧩 Component Architecture

### Component Categories

1. **UI Components (`src/components/ui/`)**
   - Primitive, reusable building blocks
   - Examples: Button, Input, Select, Textarea
   - Props-driven, stateless where possible
   
2. **Content Components (`src/components/content/`)**
   - Page sections and content blocks
   - Examples: Hero, ServiceCard, Testimonial, CTA
   
3. **Form Components (`src/components/forms/`)**
   - Specialized forms for different services
   - Examples: ContactForm, MemorialBookingForm, EventInquiryForm

4. **Layout Components (`src/components/layout/`)**
   - Page structure and navigation
   - Examples: Header, Footer, PageWrapper

5. **Media Components (`src/components/media/`)**
   - Image and video handling
   - Examples: HolographicImage, BackgroundVideo, ResponsiveImage

6. **Branding Components (`src/components/branding/`)**
   - Brand-specific elements
   - Examples: Logo, EternavueMark, ColorSwatch

### Component Guidelines

```tsx
// ✅ Good: Type-safe, props interface, clear naming
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  children: React.ReactNode
  onClick?: () => void
}

export function Button({ variant, size = 'md', children, onClick }: ButtonProps) {
  return (
    <button className={`btn-${variant} btn-${size}`} onClick={onClick}>
      {children}
    </button>
  )
}

// ❌ Bad: No types, unclear props, inline styles
export function MyButton(props: any) {
  return <button style={{ color: 'blue' }}>{props.text}</button>
}
```

---

## 📝 Development Guidelines

### Code Style

- Use functional components with TypeScript
- Prefer named exports over default exports
- Use design tokens instead of hardcoded values
- Follow Tailwind utility-first approach
- Keep components small and focused (< 150 lines)

### File Naming

- Components: PascalCase (e.g., `ServiceCard.tsx`)
- Utilities: camelCase (e.g., `formatDate.ts`)
- Constants: UPPER_SNAKE_CASE (e.g., `API_ENDPOINTS.ts`)

### Git Workflow

1. Create feature branch: `git checkout -b feature/hero-component`
2. Make atomic commits with clear messages
3. Push and open PR with description
4. Request review before merging

---

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Vercel auto-deploys on push to `main`
3. Preview deployments for every PR

### Environment Variables

Create `.env.local` for local development:

```env
# Add environment variables here when needed
# NEXT_PUBLIC_TALLY_FORM_ID=your_form_id
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue:** Port 3000 already in use
```bash
# Solution: Kill the process or use a different port
npm run dev -- -p 3001
```

**Issue:** TypeScript errors after pulling
```bash
# Solution: Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

**Issue:** Tailwind classes not working
```bash
# Solution: Restart dev server
# Tailwind v4 may need restart after adding new files
```

---

## 📚 Resources

### Project-Specific
- [CLAUDE_CONTEXT.md](./CLAUDE_CONTEXT.md) - AI-assisted development guide
- [Design Tokens](./src/design/tokens.ts) - Complete design system values
- Figma Design File - [Contact admin for access]

### Framework Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev)
- [Tailwind v4 Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

## 🤝 Contributing

We welcome contributions! Whether you're fixing bugs, adding features, or improving documentation:

1. Check existing issues or create a new one
2. Fork the repository
3. Create your feature branch
4. Make your changes following our guidelines
5. Test thoroughly
6. Submit a pull request

---

## 📄 License

[View License](./LICENSE)

---

## 📞 Contact

**Eternavue**  
Founded at Detroit Memorial Park  
Serving families since 1925

For project questions: [Create an issue](https://github.com/yourusername/eternavue-web/issues)

---

Built for the families and institutions that hold human memory.
