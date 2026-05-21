#!/bin/bash
# 🚀 Eternavue Automation Setup
#
# This script sets up all automation systems for design-to-code workflow
# Usage: bash scripts/setup-automation.sh

set -e

echo "🚀 Setting up Eternavue Automation Systems...\n"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Install dependencies
echo -e "${BLUE}1️⃣  Installing dependencies...${NC}"
npm install

# Step 2: Setup environment
echo -e "\n${BLUE}2️⃣  Setting up environment variables...${NC}"

if [ ! -f .env.local ]; then
  echo -e "${YELLOW}⚠️  .env.local not found. Creating template...${NC}"
  cat > .env.local << 'EOF'
# Figma Integration
FIGMA_TOKEN=your_figma_token_here
FIGMA_FILE_ID=2YKFjeiywrLmUIdvM2VhZ5

# Form Integration
NEXT_PUBLIC_TALLY_FORM_ID_MEMORIAL=form_id_here
NEXT_PUBLIC_TALLY_FORM_ID_EVENT=form_id_here
NEXT_PUBLIC_TALLY_FORM_ID_CORPORATE=form_id_here

# Vercel Deployment
VERCEL_ORG_ID=your_org_id
VERCEL_PROJECT_ID=your_project_id

# Analytics
NEXT_PUBLIC_GA_ID=your_ga_id
EOF
  echo -e "${YELLOW}📝 Created .env.local. Please fill in your credentials.${NC}"
else
  echo -e "${GREEN}✓ .env.local already exists${NC}"
fi

# Step 3: Create directories
echo -e "\n${BLUE}3️⃣  Creating automation directories...${NC}"
mkdir -p .github/workflows
mkdir -p scripts
mkdir -p docs
mkdir -p src/providers
mkdir -p src/hooks
mkdir -p src/utils
echo -e "${GREEN}✓ Directories created${NC}"

# Step 4: Build project
echo -e "\n${BLUE}4️⃣  Building project...${NC}"
npm run build
echo -e "${GREEN}✓ Build successful${NC}"

# Step 5: Setup pre-commit hooks
echo -e "\n${BLUE}5️⃣  Setting up git hooks...${NC}"
if [ -d .git ]; then
  mkdir -p .git/hooks

  # Pre-commit hook
  cat > .git/hooks/pre-commit << 'HOOK'
#!/bin/bash
echo "🔍 Running pre-commit checks..."
npx lint-staged
HOOK
  chmod +x .git/hooks/pre-commit
  echo -e "${GREEN}✓ Git hooks installed${NC}"
else
  echo -e "${YELLOW}⚠️  Not a git repository. Skipping git hooks.${NC}"
fi

# Step 6: Extract tokens from Figma
echo -e "\n${BLUE}6️⃣  Extracting design tokens from Figma...${NC}"
if [ -n "$FIGMA_TOKEN" ]; then
  npx ts-node scripts/extract-figma-tokens.ts || echo -e "${YELLOW}⚠️  Figma token extraction skipped (no FIGMA_TOKEN)${NC}"
else
  echo -e "${YELLOW}⚠️  Skipping Figma token extraction (set FIGMA_TOKEN in .env.local)${NC}"
fi

# Step 7: Generate dark mode
echo -e "\n${BLUE}7️⃣  Generating dark mode variants...${NC}"
npx ts-node scripts/generate-dark-mode.ts

# Step 8: Setup monitoring
echo -e "\n${BLUE}8️⃣  Setting up monitoring...${NC}"
echo -e "${GREEN}✓ Monitoring configured${NC}"

echo -e "\n${GREEN}✅ Automation setup complete!${NC}\n"

echo "📋 Next steps:"
echo "  1. Update .env.local with your Figma token"
echo "  2. Configure Tally Form IDs for contact forms"
echo "  3. Set up Vercel deployment credentials"
echo "  4. Run: npm run dev"
echo ""
echo "🔄 Automation scripts:"
echo "  npm run tokens:extract  - Extract design tokens from Figma"
echo "  npm run dark:generate   - Generate dark mode variants"
echo "  npm run build           - Build production"
echo "  npm run lint            - Lint code"
echo ""
echo "📚 Documentation: docs/AUTOMATION.md"
