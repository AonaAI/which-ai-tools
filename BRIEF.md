# WhichAITools.com — Project Brief

## What
A searchable database/directory of GenAI tools employees might use, with risk ratings, data handling policies, and compliance flags. Think "G2 meets SecurityScorecard" for AI tool risk. IT/security teams bookmark this. Massive long-tail SEO surface.

## Tech Stack
- **Next.js 14** (App Router, static export), **Tailwind CSS**, **TypeScript**
- Firebase Hosting (`output: "export"`, `distDir: "out"`)

## Brand
- Dark purple `#11021d` / `#1a0533` / `#2d1054`, accent `#6412A6`, Manrope font
- "Powered by Aona AI"

## Pages

### 1. Landing/Directory Page (`/`)
- Hero: "AI Tools Risk Directory — Know the Risk Before Your Employees Use It"
- Search bar (filter by name, category, risk level)
- Category filters: Chatbots, Code Assistants, Image Gen, Writing, Data Analysis, Other
- Risk level filters: Low, Medium, High, Critical
- Grid/list of AI tools with cards showing: name, logo placeholder, category, risk score badge

### 2. Tool Detail Pages (`/tools/[slug]`)
- Generate static pages for 50+ popular AI tools
- For each tool show:
  - Tool name, category, description
  - **Risk Score** (1-10 scale with color coding)
  - **Data Handling**: Where data is stored, retention policy, training policy
  - **Compliance**: SOC 2, GDPR, HIPAA status
  - **Risk Factors**: What makes it risky (data retention, training on inputs, etc.)
  - **Recommendations**: How to use safely
  - "Manage this tool with Aona AI" CTA

### 3. Compare Page (`/compare`)
- Side-by-side comparison of 2-3 AI tools
- Risk scores, compliance, data handling compared in table

### 4. About (`/about`)
- Why this directory exists
- Methodology for risk scoring
- Aona AI plug

## AI Tools Database
Create a comprehensive `src/data/tools.ts` file with 50+ tools including:
- ChatGPT, GPT-4, Claude, Gemini, Perplexity, DeepSeek
- GitHub Copilot, Cursor, Tabnine, Codeium, Amazon CodeWhisperer
- Midjourney, DALL-E, Stable Diffusion, Adobe Firefly
- Notion AI, Grammarly, Jasper, Copy.ai, Writesonic
- And 30+ more popular tools

Each tool entry: name, slug, category, description, riskScore (1-10), dataHandling, compliance, riskFactors, recommendations.

## SEO
- Meta: "AI Tools Risk Directory — Security Ratings for Enterprise AI Tools"
- Each tool page is an SEO page targeting "[tool name] security", "[tool name] data privacy"
- Schema.org: Dataset + Product markup

## Firebase
- `firebase.json` → `out/`
- `.firebaserc` → project: `aona-which-ai-tools`
