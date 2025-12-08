# Schakel AI - Replit Agent Guide

## Overview

Schakel AI is a minimalist Dutch AI consultancy website built with a modern JAMstack architecture. The site communicates the core message "Rust & Rendement" (Peace & Results) through a single-page design featuring a hero section, vision statement, approach timeline, team profiles, and contact form. The project emphasizes performance, accessibility, and clean design inspired by Morningside.com and Apple's minimalist aesthetic.

**IMPORTANT - Deployment Workflow:**
- **DO NOT use Replit's publish/deploy feature**
- Push changes to GitHub (DEV branch) → Merge to Main → Auto-deploys to Vercel + Railway
- User works via Replit Agent, never locally

## Recent Changes (December 8, 2025)

**New Blog Post: "Het einde van de tussenlaag"**
- Added third blog post about vibecoding vs low-code development
- Slug: `einde-van-de-tussenlaag`
- Author: Rob van Zutphen
- Category: AI Development
- Reading time: 8 minutes
- Full NL/EN translations with complete SEO metadata
- Static HTML pre-rendered for crawlers and LLM agents
- Updated sitemap.xml with new post URLs and hreflang
- Updated llms.txt with new post summary for AI crawlers

**Blog Addition Workflow:**
When adding new blog posts, update these files:
1. Create `shared/blog-content/<slug>.tsx` (Dutch content)
2. Create `shared/blog-content/<slug>-en.tsx` (English translation)
3. Add import + metadata to `shared/blog-data.ts`
4. Add post data to `scripts/prerender-blog.ts` (hardcoded section)
5. Add post data to `scripts/prerender-pages.ts` (blogPosts array)
6. Update `client/public/sitemap.xml` with new URL
7. Update `client/public/llms.txt` with new post summary
8. Run: `npx tsx scripts/prerender-blog.ts && npx tsx scripts/prerender-pages.ts`

---

## Previous Changes (December 7, 2025)

**Complete SEO Pre-rendering for Crawlers & LLMs:**

All SPA pages now have static HTML equivalents for crawlers (Google, Bing) and AI agents (ChatGPT, Claude, Perplexity):

- **Blog Posts:** `scripts/prerender-blog.ts` generates `/blog/<slug>/index.html`
- **Other Pages:** `scripts/prerender-pages.ts` generates `/blog/index.html`, `/tools/index.html`, `/ai-view/index.html`
- **Full SEO Metadata:** Title, description, keywords, canonical URLs, hreflang tags (NL/EN)
- **Open Graph & Twitter Cards:** Complete social sharing metadata
- **Schema.org Structured Data:** Article, Blog, WebPage, TechArticle, Breadcrumb schemas
- **Readable Content:** Full page content in styled HTML for crawlers and LLMs

**How to regenerate static pages:**
```bash
# After adding/updating blog posts:
npx tsx scripts/prerender-blog.ts

# After changing other pages (tools, ai-view, blog index):
npx tsx scripts/prerender-pages.ts
```
Run these commands before deploying, then commit the generated files.

**Tools Portal:**
- Added `/tools` page for internal tools access
- Login button in header (desktop & mobile)
- Meeting Automation Platform (map.schakel.ai) as first tool

**Logo Width Fix:**
- Fixed logo width in header to prevent layout shift during theme switching

---

## Previous Changes (November 28, 2025)

**Contact API Security Hardening (Architect Approved):**
- **Shared Schema:** Created `shared/contact.ts` with Zod validation schema used by both frontend and backend
- **MailerSend Service:** Singleton pattern in `server/services/mailer.ts` to avoid per-request instantiation
- **Server-side Validation:** All contact submissions validated via Zod before processing
- **Rate Limiting:** 10 requests/hour per client identifier (IP + User-Agent) with bounded memory store (10k max entries, 20% LRU eviction)
- **Honeypot Protection:** Silent acceptance of honeypot submissions to fool bots
- **Environment Validation:** Fail-fast at startup when required vars missing in production (MAILERSEND_API_KEY)
- **CORS Hardening:** Explicit allowed origins list (schakel.ai, www.schakel.ai, localhost in dev), no wildcards
- **i18n Centralization:** Contact metadata moved from hardcoded values to i18n files

**Previous Changes (November 14, 2025):**

**Google Search Console Integration:**
- Added Google Search Console verification file (`googledf62b6f2cc2593ac.html`) to `client/public/` for domain verification
- Enables tracking of search performance, indexing status, and Core Web Vitals in Google Search Console

**Hero Section Cleanup:**
- Removed trust indicator badges ("⚡ AI First • Resultaat binnen 30 dagen") for ultra-minimal design
- Hero now features only: pre-title badge, headline, description, and CTA buttons

**Changes from November 13, 2025:**

**Comprehensive SEO Optimization (Production-Ready - Architect Approved):**
- **robots.txt**: Explicit allow rules for AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Applebot-Extended), sitemap reference
- **llms.txt**: Machine-readable company overview following 2024 standard - includes expertise, team, approach, contact info
- **sitemap.xml**: XML sitemap with hreflang annotations (nl/en/x-default), proper lastmod and priority settings
- **Schema.org Structured Data (6 types - all validated)**:
  - LocalBusiness schema with geo coordinates, opening hours, founder profiles (no fake ratings - removed for authenticity)
  - Service schema with OfferCatalog listing all 6 AI solutions
  - FAQPage schema with 5 common questions about AI implementation
  - WebSite schema with SearchAction for Google search box integration
  - Organization schema (extended) with legal entities, contact points, founding date, slogan
  - BreadcrumbList schema for navigation structure (Home → AI-oplossingen → Over ons → Contact)
- **Enhanced Meta Tags**:
  - Canonical URLs, hreflang tags (nl/en/x-default)
  - Extended Open Graph properties (image dimensions, locale, site_name)
  - Twitter Card markup (summary_large_image)
  - Comprehensive robots directives (max-image-preview, max-snippet, max-video-preview)
- **Noscript Fallback (Crawler-optimized)**:
  - Semantically structured HTML with microdata (LocalBusiness → OfferCatalog → Offer → Service)
  - SEO-optimized content with natural keyword integration
  - Full business info, services, team, and contact details for non-JS crawlers

**Previous Changes (November 11, 2025):**
- Timeline Component: CSS Grid layout, green arrows between completed steps
- AI View Page: Optimized whitespace, 1000px content width, 133-char separator lines

**Tech Stack:**
- **Frontend:** React + TypeScript + Vite
- **Styling:** Tailwind CSS + shadcn/ui components
- **Backend:** Express.js (Node.js)
- **Database:** PostgreSQL via Neon (serverless)
- **ORM:** Drizzle ORM
- **Internationalization:** Custom context-based i18n (NL/EN)
- **State Management:** TanStack Query (React Query)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Component Structure:**
- Single-page application (SPA) using Wouter for client-side routing
- Component-based architecture with shadcn/ui as the design system foundation
- Custom minimalist design system with specific brand colors (Schakel Mint `#6EBFAA`, Deep Charcoal `#1A1A1A`)
- Responsive-first approach with mobile and desktop breakpoints

**Key Design Decisions:**
- **Problem:** Need for consistent, accessible UI components across the application
- **Solution:** Integrated shadcn/ui component library with custom Tailwind configuration
- **Rationale:** Provides pre-built accessible components while maintaining full customization control
- **Trade-offs:** Adds component boilerplate but ensures accessibility (WCAG AA) and consistency

**Internationalization:**
- **Problem:** Support for Dutch (primary) and English content
- **Solution:** Context-based i18n system with JSON language files (`nl.json`, `en.json`)
- **Rationale:** Lightweight alternative to heavy i18n libraries for a simple two-language site
- **Alternatives Considered:** react-i18next (rejected due to overhead for simple use case)

**State Management:**
- **Problem:** Server state synchronization and caching
- **Solution:** TanStack Query for async state management
- **Rationale:** Built-in caching, refetching, and loading states without Redux complexity
- **Trade-offs:** Primarily designed for server state; local state handled via React hooks

### Backend Architecture

**Server Framework:**
- **Express.js** with TypeScript for type safety
- **Problem:** Need for simple API endpoints and static file serving
- **Solution:** Express middleware pattern with Vite development server integration
- **Rationale:** Minimal setup, familiar patterns, excellent TypeScript support

**Development/Production Split:**
- Development: Vite dev server with HMR via middleware mode
- Production: Pre-built static assets served via Express
- Custom logging middleware for API request tracking

**Storage Layer:**
- **No database required** for this project
- Site is purely informational with contact form (email-only backend)
- Database infrastructure (Drizzle + Neon) available but unused
- **Rationale:** Simple static site doesn't need data persistence

### Build System

**Vite Configuration:**
- **Problem:** Need fast development experience with HMR and optimized production builds
- **Solution:** Vite as the primary build tool
- **Rationale:** Fastest HMR in the ecosystem, native ESM support, superior to Webpack/Create React App
- **Trade-offs:** Limited plugin ecosystem compared to Webpack

**Build Process:**
1. Frontend: `vite build` → outputs to `dist/public`
2. Backend: `esbuild` bundles server code → outputs to `dist/index.js`
3. Production: Single Node.js process serves static files and API

**Path Aliases:**
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

### Styling System

**Tailwind Configuration:**
- Custom color system using CSS variables for theme consistency
- HSL color format with alpha channel support for dynamic opacity
- Custom border radius values: `lg: 9px`, `md: 6px`, `sm: 3px`
- Elevation system via `hover-elevate` and `active-elevate-2` utilities

**Design Tokens:**
- Light/dark mode support via CSS custom properties
- Semantic color naming (primary, secondary, destructive, muted, accent)
- Button outline variables for consistent borders

**Typography:**
- Primary: Inter (body, UI)
- Display: DM Sans (headlines only)
- Loaded via Google Fonts with preconnect optimization

## External Dependencies

### Third-Party Services

**Neon Database:**
- Serverless PostgreSQL with WebSocket connections
- Configured via `DATABASE_URL` environment variable
- Connection pooling via `@neondatabase/serverless`

**Deployment:**
- **Frontend:** Vercel (schakel.ai) - static site hosting with automatic pre-rendering
- **Backend:** Railway - API endpoints only
- **Email:** MailerSend (transactional email service)
- **DNS:** Namecheap (domain management)
- **Git Workflow:** Push to GitHub DEV branch → Merge DEV to Main → Auto-deploys to Vercel + Railway
- **Architecture:** Split deployment - Vercel serves static frontend, Railway serves API

### Key NPM Dependencies

**UI Framework:**
- `@radix-ui/*` - Headless UI primitives (30+ components)
- `class-variance-authority` - Component variant management
- `tailwindcss` - Utility-first CSS framework
- `lucide-react` - Icon library

**Forms & Validation:**
- `react-hook-form` - Performant form state management
- `zod` - TypeScript-first schema validation
- `@hookform/resolvers` - Integration between react-hook-form and Zod

**Data Fetching:**
- `@tanstack/react-query` - Async state management
- Server-side fetch with credential support

**Email:**
- `mailersend` - Email delivery SDK
- Handles contact form submissions with branded templates

**Routing:**
- `wouter` - Lightweight React router (< 2KB)
- **Rationale:** Chosen over React Router for minimal bundle size

**Development Tools:**
- `@replit/vite-plugin-runtime-error-modal` - Enhanced error reporting in Replit
- `@replit/vite-plugin-cartographer` - Development tooling
- `tsx` - TypeScript execution for development server

### API Integrations

**Active Integrations:**
- **MailerSend** - Transactional email delivery
  - Contact form submissions sent via `/api/contact` endpoint
  - Branded HTML email templates with conditional field rendering
  - Reply-to functionality for easy responses
  - **Contact Form Fields:** name, company, email, phone, message (all optional)
  - **Form Locations:** Bottom section (ContactForm.tsx) and popup overlay (ExpandingCTA.tsx)
  - Email templates adapt based on which fields are filled in
  
**Future Integration Points:**
  - Analytics (e.g., Plausible, Simple Analytics) for privacy-focused tracking
  - Status monitoring (e.g., UptimeRobot, Better Uptime)

### Environment Variables

**Required:**
- `NODE_ENV` - Environment flag (development/production)
- `MAILERSEND_API_KEY` - MailerSend API token for email delivery
- `MAILERSEND_FROM_EMAIL` - Verified sender email address (e.g., noreply@schakel.ai)
- `MAILERSEND_TO_EMAIL` - Contact form recipient email (e.g., info@schakel.ai)

**Optional:**
- Analytics tracking IDs (when implemented)
- Replit-specific variables (`REPL_ID` for plugin activation)