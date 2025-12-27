# CLAUDE QUICK START FOR ETERNAVUE

## Use These Exact Prompts

### To check current repo state:
"Read my GitHub repo eternavue-web. What components exist in src/components/? What's missing?"

### To generate the landing page:
"Generate src/app/page.tsx for Eternavue's MVP landing page with:
1. Hero section (tagline: 'Holographic Experiences That Honor Legacy', CTA: 'Request a Demo')
2. Three service cards (Memorials, Events, Corporate)
3. Trust signal: 'Founded at Detroit Memorial Park, serving families since 1925'
4. Contact form (name, email, phone, service interest, message)
5. Footer with links

Use my design tokens. Make it responsive. No animations, just clean design."

### To generate components:
"Generate the following components in src/components/:
- ui/Button.tsx (variants: primary, secondary, ghost; sizes: sm, md, lg)
- ui/Input.tsx (with label, error state)
- content/ServiceCard.tsx (title, description, icon placeholder)
- forms/ContactForm.tsx (integration with Tally Forms)"

### To test the site:
"Deploy the current site to Vercel and test:
1. Mobile (375px) - does it look good?
2. Desktop (1024px) - does text scale properly?
3. Form submission - does it capture data?

Report back with any issues."

## Common Prompts

### Check design system:
"Read my Figma file. What's the design system? What components have I designed?"

### Check for errors:
"npm run build and show me any errors"

### Test performance:
"Run Lighthouse on the deployed site. What's the score? How can I improve it?"

### Fix something:
"The contact form isn't working. Read the code and fix it."

## MCP Connections Status

- ✅ GitHub connected (eternavue-web repo)
- ✅ Figma connected (eternavue file)
- ✅ Code execution enabled

## Files to Always Reference

- Design system: src/design/tokens.ts
- Tailwind config: tailwind.config.ts
- Main page: src/app/page.tsx (what we're building)
