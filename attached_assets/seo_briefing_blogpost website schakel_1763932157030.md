# SEO Briefing: Blogpost "Website bouwen met AI"

## 1. Meta Tags (VERPLICHT)

### Title Tag
```html
<title>Website bouwen met AI: Hoe we schakel.ai zelf maakten | Schakel</title>
```
- Lengte: 62 karakters (perfect voor Google)
- Bevat primair keyword: "website bouwen met AI"
- Bevat brand: "Schakel"

### Meta Description
```html
<meta name="description" content="Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt. AI-first development uitgelegd.">
```
- Lengte: 154 karakters
- Bevat call-to-action elementen
- Bevat primair + secundair keywords

### Canonical URL
```html
<link rel="canonical" href="https://schakel.ai/blog/website-bouwen-met-ai">
```

---

## 2. URL Structuur

**Aanbevolen URL:**
```
https://schakel.ai/blog/website-bouwen-met-ai
```

**Alternatieven (als bovenstaande niet werkt):**
- `https://schakel.ai/blog/ai-first-website-development`
- `https://schakel.ai/blog/vibecoding-schakel-verhaal`

**Niet gebruiken:**
- URLs langer dan 60 karakters
- URLs met datum (/2024/11/23/)
- URLs met stopwoorden (hoe, we, onze, het)

---

## 3. Heading Structuur (H1-H3)

### H1 (slechts 1x op de pagina!)
```
Website bouwen met AI: Hoe we schakel.ai zelf maakten
```

### H2 headings (gebruik deze exact)
1. AI-first bouwen: dit is hoe wij werken
2. Waarom deze architectuur: future-proof zonder gedoe
3. Onze Schakel Core Stack (de stabiele basis onder alles)
4. Build tooling (voor deze site): gewoon wat nu het lekkerst werkt
5. Frontend: vooral de animatie (en de tekst!) waren werk
6. Backend: simpel, duidelijk, en exact wat het moet doen (niet meer)
7. Deployment: frontend op Vercel, backend op Railway
8. DNS: klein onderdeel, maar cruciaal
9. Code review met AI: maar eerst, onze Schakel Standards
10. Analytics: Umami (licht, cookieloos, simpel)
11. AI tijdens bouwen & schrijven: supercharger, geen vervanging
12. Vibecode-notities: wat tegenviel en wat meeviel
13. Slot
14. Veelgestelde vragen over website bouwen met AI

---

## 4. Afbeeldingen (MINIMAAL 3 TOEVOEGEN)

### Verplichte afbeeldingen:

**1. Hero image / Featured image**
- Bestandsnaam: `schakel-ai-website-hero.jpg` of `.webp`
- Alt-tekst: `Schakel.ai website gebouwd met AI-first development methode`
- Plaats: Bovenaan de blogpost
- Optimale grootte: 1200x630px (voor social sharing)

**2. Tech Stack Diagram**
- Bestandsnaam: `schakel-tech-stack-diagram.jpg`
- Alt-tekst: `Tech stack overzicht Schakel: Supabase, Vercel, Railway, Replit en GitHub`
- Plaats: Bij hoofdstuk 3 "Onze Schakel Core Stack"
- Kan een simpel schema zijn met logos

**3. Screenshot animatie of website**
- Bestandsnaam: `schakel-website-animatie.jpg`
- Alt-tekst: `Custom hero animatie op Schakel.ai website gebouwd met Replit Agent 3`
- Plaats: Bij hoofdstuk 5 "Frontend"

### Extra aanbevolen afbeeldingen:
- Architecture diagram (bij hoofdstuk 2)
- Code review workflow (bij hoofdstuk 9)
- Before/after comparison

### Afbeelding optimalisatie checklist:
- [ ] WebP formaat gebruiken (betere compressie)
- [ ] Max bestandsgrootte: 200KB per afbeelding
- [ ] Responsive images met srcset
- [ ] Lazy loading enabled (loading="lazy")
- [ ] Alt-tekst voor ELKE afbeelding
- [ ] Descriptieve bestandsnamen (geen IMG_1234.jpg)

---

## 5. Schema Markup (JSON-LD)

Voeg toe in de `<head>` sectie:

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Website bouwen met AI: Hoe we schakel.ai zelf maakten",
  "description": "Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt.",
  "image": "https://schakel.ai/images/schakel-ai-website-hero.jpg",
  "author": {
    "@type": "Person",
    "name": "[Jouw naam]"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Schakel",
    "logo": {
      "@type": "ImageObject",
      "url": "https://schakel.ai/logo.png"
    }
  },
  "datePublished": "2024-11-23",
  "dateModified": "2024-11-23",
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": "https://schakel.ai/blog/website-bouwen-met-ai"
  }
}
</script>
```

### FAQ Schema (voor extra zichtbaarheid)

```json
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Kan je zonder programmeur een professionele website bouwen met AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ja. Wij deden het. Met moderne AI-tools kun je als niet-programmeur een professionele website bouwen. Je hebt geen code-ervaring nodig, maar wel logisch denkvermogen en begrip van systemen."
      }
    },
    {
      "@type": "Question",
      "name": "Heb je programmeerervaring nodig om met AI een website te bouwen?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Nee, geen programmeerervaring maar wel logisch denkvermogen. Je moet systemen kunnen begrijpen en AI kritisch kunnen gebruiken, niet klakkeloos volgen."
      }
    },
    {
      "@type": "Question",
      "name": "Welke AI tools zijn het beste voor website development?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Wij werkten vooral met Replit Agent 3, ChatGPT, en Claude. Daarnaast gebruikten we Codex voor code reviews. De combinatie van meerdere tools werkt beter dan één tool alleen."
      }
    },
    {
      "@type": "Question",
      "name": "Hoeveel tijd kost het om een website te bouwen met AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Dat hangt af van complexiteit. Voor een eenvoudige site: 1 of 2 dagen. Voor onze site met custom animaties en een boodschap die echt goed moest zijn: een klein weekje, waarbij iteratie en verfijning het meeste tijd kostten."
      }
    },
    {
      "@type": "Question",
      "name": "Is een AI-gebouwde website even goed als een handmatig gecodeerde?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Als je AI goed gebruikt, zelf kwaliteit bewaakt en de code laat reviewen: ja. Maar het kan ook heel snel spaghetti worden. Dat heb je zelf in de hand."
      }
    }
  ]
}
</script>
```

---

## 6. Open Graph Tags (Social Media)

```html
<!-- Open Graph / Facebook -->
<meta property="og:type" content="article">
<meta property="og:url" content="https://schakel.ai/blog/website-bouwen-met-ai">
<meta property="og:title" content="Website bouwen met AI: Hoe we schakel.ai zelf maakten">
<meta property="og:description" content="Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt.">
<meta property="og:image" content="https://schakel.ai/images/schakel-ai-website-hero.jpg">
<meta property="og:site_name" content="Schakel">
<meta property="article:published_time" content="2024-11-23T10:00:00+00:00">
<meta property="article:author" content="[Jouw naam]">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:url" content="https://schakel.ai/blog/website-bouwen-met-ai">
<meta name="twitter:title" content="Website bouwen met AI: Hoe we schakel.ai zelf maakten">
<meta name="twitter:description" content="Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding en wat echt werkt.">
<meta name="twitter:image" content="https://schakel.ai/images/schakel-ai-website-hero.jpg">
```

---

## 7. Internal Linking Strategie

**Verplichte interne links (minimaal 5):**

1. Link naar homepage: `[Schakel](https://schakel.ai)` (2x in tekst)
2. Link naar over ons: `[over ons](https://schakel.ai/over)` of `/about`
3. Link naar services: `[onze aanpak](https://schakel.ai)` of `/diensten`
4. Link naar contact: `[neem contact op](https://schakel.ai/contact)`
5. Link naar andere blogposts (indien beschikbaar): `[Lees ook: ...]`

**Waar deze links plaatsen:**
- In de inleiding (homepage link)
- Bij hoofdstuk 1 (over ons)
- Bij hoofdstuk 3 (Development Standards link)
- Onderaan bij CTA (services + contact)

---

## 8. External Linking (al in de tekst)

Externe links zijn al correct geplaatst naar:
- Supabase
- Vercel
- Railway
- GitHub
- Replit
- Umami

**Belangrijk:** Zorg dat externe links `rel="noopener"` hebben voor security:
```html
<a href="https://supabase.com" target="_blank" rel="noopener">Supabase</a>
```

---

## 9. Keyword Optimalisatie

### Primair keyword: **"website bouwen met AI"**
- Frequentie in tekst: 5-7x (niet geforceerd)
- In H1: ✅
- In URL: ✅
- In meta description: ✅
- In eerste 100 woorden: ✅
- In alt-teksten: ✅

### Secundaire keywords:
- "AI-first development" (3-4x)
- "vibecoding" (4-5x)
- "gevibecode website" (2-3x)
- "website bouwen zonder programmeur" (2x)
- "Replit Agent" (3-4x)

### LSI Keywords (contextueel):
- React
- TypeScript
- Vercel
- Supabase
- web development
- code review
- tech stack
- deployment

---

## 10. Technische SEO Checklist

### Page Speed
- [ ] Minimaal lazy loading voor afbeeldingen
- [ ] CSS en JS minified
- [ ] GZIP/Brotli compressie enabled
- [ ] Font optimization (preload critical fonts)

### Mobile Optimization
- [ ] Responsive design
- [ ] Touch targets minimaal 48x48px
- [ ] Viewport meta tag correct
- [ ] Geen horizontal scroll

### Accessibility
- [ ] Alle afbeeldingen hebben alt-tekst
- [ ] Heading hiërarchie klopt (H1→H2→H3)
- [ ] Voldoende kleurcontrast (WCAG AA)
- [ ] Focus states zichtbaar

### Core Web Vitals targets
- LCP (Largest Contentful Paint): < 2.5s
- FID (First Input Delay): < 100ms
- CLS (Cumulative Layout Shift): < 0.1

---

## 11. Content Formatting

### Paragrafen
- Max 3-4 zinnen per paragraaf
- Witruimte tussen secties
- Gebruik korte zinnen (max 20 woorden gemiddeld)

### Lists
- Gebruik bullets (•) zoals nu in de tekst
- Maximaal 7 items per lijst (daarna opsplitsen)

### Code blocks
- Gebruik `<code>` tags voor inline code
- Gebruik `<pre><code>` voor code blocks
- Syntax highlighting waar mogelijk

### Emphasis
- **Bold** voor belangrijke punten (max 3-5 per sectie)
- *Italic* spaarzaam gebruiken
- Geen CAPS voor emphasis

---

## 12. Call-to-Actions (CTA)

**Primaire CTA (onderaan artikel):**
```html
<div class="cta-box">
  <h3>Wil je ook AI-first bouwen?</h3>
  <p>Bekijk onze aanpak of neem contact op voor een gesprek over jouw project.</p>
  <a href="https://schakel.ai" class="btn-primary">Bekijk onze aanpak</a>
  <a href="https://schakel.ai/contact" class="btn-secondary">Neem contact op</a>
</div>
```

**Secundaire CTA (midden in artikel, na hoofdstuk 6):**
```
💡 Nieuwsgierig hoe wij werken? [Bekijk onze services](https://schakel.ai)
```

---

## 13. Breadcrumbs

Implementeer breadcrumb navigatie:
```html
<nav aria-label="Breadcrumb">
  <ol>
    <li><a href="https://schakel.ai">Home</a></li>
    <li><a href="https://schakel.ai/blog">Blog</a></li>
    <li aria-current="page">Website bouwen met AI</li>
  </ol>
</nav>
```

Met bijbehorende schema:
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://schakel.ai"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Blog",
      "item": "https://schakel.ai/blog"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Website bouwen met AI",
      "item": "https://schakel.ai/blog/website-bouwen-met-ai"
    }
  ]
}
```

---

## 14. Related Content Section

Onderaan de blogpost, voor de CTA:

```html
<section class="related-posts">
  <h3>Gerelateerde artikelen</h3>
  <!-- Zodra er meer blogposts zijn, hier 2-3 related posts tonen -->
  <p><em>Meer blogposts komen binnenkort</em></p>
</section>
```

---

## 15. Analytics & Tracking

### Umami events tracken:
- Pageview (automatisch)
- Scroll depth (25%, 50%, 75%, 100%)
- CTA clicks
- External link clicks
- Time on page
- Section views

### Goal tracking:
- Contact form submissions vanuit deze post
- Downloads (indien van toepassing)
- Social shares

---

## 16. Post-Publication Checklist

Na publicatie:

**Dag 1:**
- [ ] Test URL in Google Search Console
- [ ] Request indexing in GSC
- [ ] Test alle links (internal + external)
- [ ] Test op mobiel
- [ ] Test page speed (PageSpeed Insights)
- [ ] Check meta tags met Meta Tags checker

**Week 1:**
- [ ] Monitor positie in Google voor "website bouwen met AI"
- [ ] Check Core Web Vitals in GSC
- [ ] Analyseer eerste engagement data in Umami
- [ ] Deel op LinkedIn/social media

**Maand 1:**
- [ ] Analyseer which sections meest gelezen worden
- [ ] Check inbound links (wie linkt naar je?)
- [ ] Update content indien nodig
- [ ] Voeg related posts toe (indien nieuwe content live)

---

## 17. Prompt voor Replit

Gebruik deze prompt om alles in één keer te implementeren:

```
Ik wil een SEO-geoptimaliseerde blogpost implementeren op schakel.ai/blog/website-bouwen-met-ai

Implementeer het volgende:

1. URL: /blog/website-bouwen-met-ai
2. Title tag: "Website bouwen met AI: Hoe we schakel.ai zelf maakten | Schakel" (exact 62 karakters)
3. Meta description: "Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt. AI-first development uitgelegd." (154 karakters)
4. Canonical URL naar https://schakel.ai/blog/website-bouwen-met-ai
5. Open Graph tags voor social sharing (zie briefing)
6. JSON-LD schema voor BlogPosting + FAQPage (zie briefing)
7. Breadcrumb navigatie
8. Responsive images met lazy loading en correcte alt-teksten
9. Internal links naar: homepage (2x), over, services, contact
10. External links hebben rel="noopener"
11. Optimale heading structuur (H1, H2, H3)
12. Mobile-first responsive design
13. Page speed optimalisaties (minify, compress, cache headers)

De volledige content staat in de attached markdown file.

Zorg dat:
- Core Web Vitals groen zijn
- Alle afbeeldingen WebP formaat hebben
- De pagina <2.5s laadt
- Perfect werkt op mobile
- Alle SEO best practices gevolgd worden
```

---

## Samenvatting: Top Prioriteiten

**Must-haves (kunnen niet zonder):**
1. ✅ Correcte title tag (62 karakters)
2. ✅ Meta description (154 karakters)
3. ✅ Minimaal 3 afbeeldingen met alt-tekst
4. ✅ JSON-LD schema (BlogPosting + FAQ)
5. ✅ 5+ interne links
6. ✅ Open Graph tags
7. ✅ Canonical URL
8. ✅ Mobile responsive

**Should-haves (sterk aanbevolen):**
9. Breadcrumb navigatie
10. Page speed < 2.5s
11. WebP afbeeldingen
12. Lazy loading
13. Related content sectie

**Nice-to-haves (later toevoegen):**
14. Social share buttons
15. Reading time indicator
16. Table of contents
17. Author bio box

---

**Verwachte resultaten na 30 dagen:**
- Ranking in top 10 voor "website bouwen met AI" (mits backlinks)
- Featured snippet voor FAQ vragen
- Organische traffic: 50-200 bezoekers/maand
- Engagement: 3-5 min gemiddelde tijd op pagina