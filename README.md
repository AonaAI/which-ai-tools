# WhichAITools.com

A searchable database/directory of GenAI tools with risk ratings, data handling policies, and compliance flags. Built with Next.js 14 (App Router) and deployed to Firebase Hosting.

## Features

- 📊 **53 AI Tools** with detailed risk assessments
- 🔍 **Smart Search & Filters** by category and risk level
- 📈 **Risk Scoring System** (1-10 scale) based on data handling, compliance, security controls, and transparency
- 🆚 **Side-by-Side Comparison** of up to 3 tools
- ✅ **Compliance Tracking** (SOC 2, GDPR, HIPAA)
- 🎨 **Dark Purple Brand** (#11021d, #1a0533, #2d1054, #6412A6)
- 🚀 **Static Export** for fast, scalable hosting

## Tech Stack

- **Next.js 14** (App Router, static export)
- **TypeScript**
- **Tailwind CSS**
- **Firebase Hosting**

## Project Structure

```
src/
├── app/
│   ├── layout.tsx           # Root layout with navigation
│   ├── page.tsx             # Landing page with search & filters
│   ├── globals.css          # Global styles
│   ├── sitemap.ts           # Auto-generated sitemap
│   ├── about/
│   │   └── page.tsx         # About page with methodology
│   ├── compare/
│   │   ├── layout.tsx       # Compare page layout with metadata
│   │   └── page.tsx         # Tool comparison page
│   └── tools/[slug]/
│       └── page.tsx         # Dynamic tool detail pages (53 pages)
└── data/
    └── tools.ts             # AI tools database (53 tools)
```

## Local Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# The static site will be generated in the out/ directory
```

## Deployment to aitoolrisk.com

### Prerequisites
- Node.js 18+
- Firebase CLI: `npm install -g firebase-tools`
- Firebase project configured for aitoolrisk.com

### Steps

```bash
# 1. Install dependencies
npm install

# 2. Build static site (generates ~3000 tool pages from Supabase)
npm run build

# 3. Deploy to Firebase Hosting
firebase login
firebase deploy
```

### Adding New Supabase Columns (one-time)
If the extended fields (pricing, features, tags, etc.) haven't been added yet:
```bash
# Run supabase-migration.sql in the Supabase SQL Editor
```

### Build Output
The `out/` directory contains the full static site:
- ~3000 individual tool pages at `/tools/[slug]/`
- Admin interface at `/admin/` (password: see source)
- Sitemap at `/sitemap.xml`
- All pages are pre-rendered HTML (fast, crawlable)

### Domain Setup
- Firebase Hosting serves aitoolrisk.com
- Sitemap and robots.txt reference aitoolrisk.com
- OG tags and canonical URLs use aitoolrisk.com

## AI Tools Database

The database includes 53 tools across 6 categories:

- **Chatbots**: ChatGPT, Claude, Gemini, Perplexity, DeepSeek, Microsoft Copilot, Character.AI
- **Code Assistants**: GitHub Copilot, Cursor, Tabnine, Codeium, Amazon CodeWhisperer, Replit AI
- **Image Gen**: Midjourney, DALL-E, Stable Diffusion, Adobe Firefly, Leonardo AI, Runway ML, Stability AI
- **Writing**: Grammarly, Jasper, Copy.ai, Writesonic, Notion AI, Wordtune, QuillBot, Gamma, Tome, Superhuman AI, Mem, Lex, Beautiful.ai
- **Data Analysis**: Julius AI, Tableau AI, Rows AI, DataRobot, ChatPDF, Cleaned, Hex, Scale AI, Humata AI
- **Other**: HuggingFace, ElevenLabs, Synthesia, Descript, Otter.ai, Zapier AI, Loom AI, Fireflies.ai, Pictory, Play.ht, Replicate

Each tool includes:
- Name, category, description
- Risk score (1-10)
- Data handling (storage, retention, training)
- Compliance (SOC 2, GDPR, HIPAA)
- Risk factors
- Security recommendations

## SEO Features

- **Meta Tags**: Optimized titles and descriptions for all pages
- **Schema.org Markup**: Product schema on tool pages
- **Sitemap**: Auto-generated for all 60 pages
- **robots.txt**: Search engine configuration
- **Static URLs**: SEO-friendly trailing slash URLs

## Brand Guidelines

- **Colors**: Dark purple (#11021d, #1a0533, #2d1054), accent (#6412A6)
- **Font**: Manrope
- **Tagline**: "Powered by Aona AI"

## License

© 2026 WhichAITools — Powered by Aona AI
