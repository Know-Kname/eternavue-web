\# Eternavue Project Context



\## Repository Structure



eternavue-web/

├── src/

│ ├── app/

│ │ ├── page.tsx # MAIN: Landing page (what we're building)

│ │ ├── layout.tsx # Root layout

│ │ └── globals.css # Global styles

│ ├── components/

│ │ ├── layout/ # Header, Footer, PageWrapper

│ │ ├── content/ # Hero, ServiceCard, CTA

│ │ ├── forms/ # ContactForm

│ │ └── ui/ # Button, Input, Textarea, Select

│ ├── design/

│ │ └── tokens.ts # Design tokens (colors, spacing, fonts)

│ └── lib/

│ └── (utilities, helpers)

├── public/

│ └── images/ # All image assets

├── tailwind.config.ts

├── tsconfig.json

├── next.config.ts

├── package.json

├── .env.local # Local environment variables

└── .claude/

└── project-context.md # This file







\## Current State



\- ✅ Next.js 16 initialized

\- ✅ TypeScript configured

\- ✅ Tailwind CSS configured

\- ✅ GitHub repo created and pushed

\- ✅ Deployed to Vercel

\- 🔄 Landing page in progress



\## What We're Building NOW



Single landing page with:

1\. Hero section (Eternavue branding + CTA)

2\. Three service cards (Memorials, Events, Corporate)

3\. Trust signal (DMP legacy)

4\. Contact form

5\. Footer



\## Design System



Colors:

\- Primary (deep blue): #1F3252

\- Accent (gold): #D4A574

\- Light: #F5F5FD

\- Holographic cyan: #32B8C6



See src/design/tokens.ts for complete token system.



\## Key Constraints



\- NO blog posts

\- NO multiple pages

\- NO backend database

\- NO authentication

\- One page only

\- Simple form (no validation complexity)

\- Fast to deploy

\- Mobile-first



\## Next Actions



1\. Generate landing page components

2\. Integrate contact form

3\. Test mobile responsiveness

4\. Deploy to Vercel

5\. Share for feedback



