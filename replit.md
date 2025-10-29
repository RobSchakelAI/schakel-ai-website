# Schakel AI - Replit Agent Guide

## Overview

Schakel AI is a minimalist Dutch AI consultancy website built with a modern JAMstack architecture. The site communicates the core message "Rust & Rendement" (Peace & Results) through a single-page design featuring a hero section, vision statement, approach timeline, team profiles, and contact form. The project emphasizes performance, accessibility, and clean design inspired by Morningside.com and Apple's minimalist aesthetic.

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
- In-memory storage implementation (`MemStorage`) currently active
- Database-backed storage ready via Drizzle ORM
- **Rationale:** Allows rapid prototyping before database provisioning

### Data Storage

**Database:**
- **PostgreSQL** via Neon serverless (configured but not actively used)
- **Problem:** Need for scalable, serverless database with connection pooling
- **Solution:** Neon's serverless Postgres with WebSocket connections
- **Trade-offs:** Cold start latency vs. traditional always-on database

**ORM Choice:**
- **Drizzle ORM** over Prisma or TypeORM
- **Problem:** Need type-safe database queries with minimal overhead
- **Solution:** Drizzle's lightweight, SQL-like syntax with full TypeScript inference
- **Rationale:** Better performance than Prisma, more TypeScript-native than TypeORM
- **Pros:** Zero runtime overhead, excellent TypeScript support, schema migrations
- **Cons:** Smaller ecosystem than Prisma

**Schema Design:**
- Simple user schema with UUID primary keys
- Zod integration via `drizzle-zod` for runtime validation
- Schema located in `shared/schema.ts` for frontend/backend sharing

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

**Planned Deployment Targets:**
- **Frontend/Static:** Vercel (JAMstack hosting)
- **API:** Railway (backend hosting)
- **DNS:** Namecheap (manual configuration required)

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

**Database:**
- `drizzle-orm` - TypeScript ORM
- `drizzle-zod` - Zod schema generation from Drizzle schemas
- `@neondatabase/serverless` - Neon Postgres client with WebSocket support
- `ws` - WebSocket library for Neon connection

**Routing:**
- `wouter` - Lightweight React router (< 2KB)
- **Rationale:** Chosen over React Router for minimal bundle size

**Development Tools:**
- `@replit/vite-plugin-runtime-error-modal` - Enhanced error reporting in Replit
- `@replit/vite-plugin-cartographer` - Development tooling
- `tsx` - TypeScript execution for development server

### API Integrations

**Current State:**
- No external API integrations active
- Contact form uses mock submission (TODO: connect to actual API/email service)
- **Future Integration Points:**
  - Email service (e.g., SendGrid, Resend) for contact form
  - Analytics (e.g., Plausible, Simple Analytics) for privacy-focused tracking
  - DNS setup instructions needed for Namecheap → Vercel

### Environment Variables

**Required:**
- `DATABASE_URL` - PostgreSQL connection string (Neon)
- `NODE_ENV` - Environment flag (development/production)

**Optional (future):**
- Email service API keys
- Analytics tracking IDs
- Replit-specific variables (`REPL_ID` for plugin activation)