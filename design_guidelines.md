# Schakel AI Design Guidelines

## Design Approach

**Selected Approach**: Custom Minimalist System inspired by the logo's professional aesthetic and the "Rust & Rendement" (Peace & Results) philosophy. Drawing from Morningside.com's clarity and Apple HIG's restraint, with Schakel's distinctive mint accent.

**Core Principle**: One clear message, maximum impact, zero clutter. Every element must earn its place.

---

## Brand Colors

**Primary Palette** (derived from logo):
- **Schakel Mint**: `#6EBFAA` - Primary brand accent, CTAs, focus states, logo
- **Deep Charcoal**: `#1A1A1A` - Primary text, headers
- **Warm Grey**: `#4A4A4A` - Secondary text, labels
- **Light Grey**: `#F5F5F5` - Subtle backgrounds, section dividers
- **Pure White**: `#FFFFFF` - Main background, breathing room
- **Success Green**: `#10B981` - Form success states only
- **Alert Red**: `#EF4444` - Form errors only

**Usage Rules**:
- Mint used sparingly: CTAs, active states, logo, accent underlines
- 80% white space, 15% greys/black, 5% mint
- High contrast ratios (minimum 7:1 for text)

---

## Typography

**Font Stack** (Google Fonts):
- **Primary**: Inter (400, 500, 600, 700) - body, UI elements
- **Display**: DM Sans (700) - hero headlines only

**Type Scale** (Tailwind classes):
- **Hero Headline**: `text-5xl md:text-7xl font-bold` (DM Sans, 60px/80px desktop)
- **Section Headers**: `text-3xl md:text-4xl font-semibold` (Inter, 36px/48px desktop)
- **Body Large**: `text-lg md:text-xl` (18px/20px, Why/How/What descriptions)
- **Body**: `text-base` (16px, standard content)
- **Small**: `text-sm` (14px, labels, captions)

**Hierarchy Rules**:
- Maximum 3 font sizes per viewport
- Line-height: 1.6 for body, 1.2 for headlines
- Letter-spacing: tight (-0.02em) for headlines, normal for body

---

## Layout System

**Spacing Primitives** (Tailwind units):
- **Micro**: `2, 3, 4` (8px, 12px, 16px) - component internal spacing
- **Standard**: `6, 8, 12` (24px, 32px, 48px) - element margins
- **Macro**: `16, 20, 24, 32` (64px, 80px, 96px, 128px) - section padding

**Container Strategy**:
- Max-width: `max-w-6xl` (1152px) for content
- Horizontal padding: `px-6 md:px-12` (24px mobile, 48px desktop)
- Sections: `py-20 md:py-32` (80px mobile, 128px desktop)

**Grid System**:
- Single column mobile, strategic 2-column desktop
- Never exceed 2 columns for content sections
- Use asymmetric splits: 60/40 or 55/45 for visual interest

---

## Component Library

### Navigation
- Fixed header, `h-20` (80px), white background with subtle shadow on scroll
- Logo left (40px height), minimal nav links right (About, Contact)
- Language toggle (NL/EN) as subtle text button, no flags
- Mobile: Hamburger menu with full-screen overlay

### Hero Section
- **Layout**: Full-viewport height (90vh), centered content with generous whitespace
- **Structure**: Logo above headline, headline + 3-line Why/How/What stack, single CTA below
- **Background**: Pure white with subtle mint geometric accent (top-right corner, 20% opacity)
- **No hero image** - typography and whitespace create impact
- **CTA**: Mint button `bg-[#6EBFAA]` with blur backdrop if overlaying elements

### Why/How/What Cards
- Horizontal layout desktop (3 columns), stacked mobile
- Each card: Icon (subtle mint tint) + Bold label + 1-2 sentence description
- Cards have minimal borders `border border-gray-200`, generous padding `p-8`
- Hover: subtle lift shadow, no color change

### About Section (Rob & Simon)
- 2-column grid desktop, stacked mobile
- Circular photo placeholders (200px diameter, grayscale with mint border)
- Name as `text-2xl font-semibold`, role as `text-lg text-gray-600`
- Bio: 60 words max, `text-base leading-relaxed`
- No background treatment, pure white with section divider

### Contact Form
- Single column, max-width `max-w-md`, centered
- Input fields: `border-2 border-gray-300 focus:border-[#6EBFAA]`, generous padding `p-4`
- Labels above inputs, `text-sm font-medium text-gray-700`
- Submit button: Full-width mint `bg-[#6EBFAA]`, `h-12`, rounded `rounded-lg`
- Success/error states with icons and color-coded messages

### Footer
- Minimal: Logo + tagline, legal links (Privacy, Disclaimer)
- `py-12`, centered, `text-sm text-gray-500`
- No newsletter signup, no social icons (keep ultra-clean)

---

## Animations

**Strict Minimalism** - Only 2 animation types allowed:
1. **Fade-in on scroll**: Hero and section headers only, subtle `opacity 0→1`, 400ms ease
2. **Hover states**: Buttons lift 2px (`translate-y-[-2px]`), cards add subtle shadow

**Forbidden**: 
- Parallax, scroll-triggered reveals, loading spinners (use instant feedback)
- Auto-playing carousels, typewriter effects, particle systems

---

## Images

### Logo Usage
- Header: 40px height, full-color version
- Favicon: Mint "S" symbol only, 32x32px
- Email footer: 80px height

### About Section Photos
- 2 circular photos (Rob & Simon), 200px diameter
- Professional headshots, desaturated with 10% mint tint overlay
- Alt text: "Rob [Last Name], Co-founder" format

### No Other Images
- No stock photos, no decorative illustrations
- Rely on typography, whitespace, and subtle geometric accents

---

## Accessibility

- All interactive elements: `min-h-[44px]`, touch-friendly
- Focus indicators: `ring-2 ring-[#6EBFAA] ring-offset-2`
- Form labels: always visible, never placeholder-only
- Color contrast: 7:1 minimum for body text, 4.5:1 for large text
- Skip-to-content link for keyboard navigation

---

## Page Structure

**Homepage Sections** (in order):
1. **Header/Navigation** (fixed, 80px)
2. **Hero** (90vh, Why/How/What + CTA)
3. **Core Message Expansion** (3-column cards, desktop)
4. **About** (Rob & Simon, 2-column)
5. **Contact** (form centered, max-w-md)
6. **Footer** (minimal, legal links)

**Total Sections**: 6 (including header/footer)
**Viewport Strategy**: Only hero uses viewport height; all others use natural content height with consistent `py-20 md:py-32` rhythm

---

## Responsive Breakpoints

- Mobile: 0-767px (single column, stacked)
- Desktop: 768px+ (multi-column where appropriate)
- No tablet-specific breakpoint (use fluid scaling)

---

## Performance Optimizations

- Inline critical CSS for above-fold
- Lazy-load About photos only
- Preload Inter/DM Sans fonts
- SVG logo (vector, 2KB max)
- No third-party scripts in initial bundle