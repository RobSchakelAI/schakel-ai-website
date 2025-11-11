# Hoe we schakel.ai bouwden en deployden - Een tech journey

Van logo tot live website in een paar dagen

We hebben de Schakel AI website van nul tot productie gebouwd, volledig custom, en dit is hoe we het deden:

## 🎨 Stap 1: Logo Design met AI

Voordat je een website hebt, heb je branding nodig. We hebben de Schakel AI logo icon ontworpen met een combinatie van:

- **ChatGPT** - Voor concepten en design direction
- **Google Imagen** - AI image generation voor varianten  
- **Nano Banana** - Fine-tuning en optimalisatie

Het resultaat: Een strak mint/teal "S"-icon dat schakelen symboliseert. Clean, modern, herkenbaar.

## 💻 Stap 2: Website Development in Replit

### Wat is Replit?

Replit is een online development environment. Denk aan het als VS Code in de cloud, maar dan met ingebouwde hosting, database, en deployment tools. Je hoeft niks lokaal te installeren.

### Wat hebben we gebouwd?

Een single-page React website met:

- **Tweetalig (Nederlands/Engels)** - Custom i18n systeem met context-based translations
- **Dark/Light mode** - Theme toggle met CSS variables en volledige dark mode support
- **AI View mode** - Machine-readable content voor AI agents (geoptimaliseerd voor scrapers)
- **Responsive design** - Mobile-first approach met Tailwind breakpoints
- **Contact forms (2 stuks)** - Popup CTA én footer formulier met backend integratie
- **Google Maps integratie** - Kantooradres met dark mode support via CSS filters
- **Analytics tracking** - Umami analytics voor volledige gebruikersinzichten

### Tech stack:

```
Frontend:  React + TypeScript + Vite
Styling:   Tailwind CSS + shadcn/ui components
State:     TanStack Query (React Query)
Backend:   Express.js + TypeScript
Email:     MailerSend API
Analytics: Umami Cloud (zelf-gehost analytics platform)
```

### Waarom deze stack?

- **Vite** → Snelste build tool & hot module reload
- **shadcn/ui** → Hoogwaardige, toegankelijke UI components zonder bloat
- **TanStack Query** → Slimme server state management met caching
- **TypeScript** → Type safety = minder bugs in productie
- **Umami** → Privacy-first analytics zonder cookies (GDPR compliant)

## 🔗 Stap 3: Version Control met GitHub

Alle code staat in een GitHub repository: **github.com/RobSchakelAI/schakel-ai-website**

### Waarom GitHub?

- Versiegeschiedenis van elke wijziging
- Automatische deployment triggers
- Samenwerken mogelijk (later met team)
- Backup van je complete codebase

### Workflow:

```
Replit (development) 
    ↓ git push
GitHub (source of truth)
    ↓ automatic trigger
Vercel + Railway (production)
```

## 🌐 Stap 4: Split Deployment - Vercel + Railway

Hier wordt het interessant. We hebben niet gekozen voor één platform, maar een **split architecture**:

### Vercel (Frontend) - schakel.ai

**Wat doet Vercel?**

Vercel host de React applicatie. Ze zijn gemaakt door de mensen achter Next.js en zijn specialist in frontend hosting.

**Waarom Vercel?**

✅ **Blazing fast CDN** - Wereldwijd edge network  
✅ **Automatische SSL** - HTTPS out-of-the-box  
✅ **Preview deployments** - Elke git branch krijgt eigen URL  
✅ **Zero-config** - Detecteert Vite automatisch

**Build configuratie:**

```json
// vercel.json
{
  "buildCommand": "npm install --include=dev && npx vite build",
  "outputDirectory": "dist/public"
}
```

**Environment variables:**

- `VITE_API_URL` → Wijst naar Railway backend API
- `VITE_UMAMI_WEBSITE_ID` → Umami analytics tracking ID

### Railway (Backend API)

**Wat doet Railway?**

Railway host de Express.js backend die het contactformulier afhandelt en emails verstuurt via MailerSend.

**Waarom Railway en niet alles op Vercel?**

✅ **Node.js backend support** - Vercel is vooral frontend  
✅ **Environment secrets** - Veilig API keys opslaan  
✅ **Persistent processes** - Express server draait altijd  
✅ **Database ready** - PostgreSQL beschikbaar (voor later)

**Backend functionaliteit:**

1. `/api/contact` endpoint
2. Valideert formulier data met Zod schemas
3. Verstuurt email via MailerSend
4. Retourneert success/error responses

**CORS configuratie:**

Omdat frontend (Vercel) en backend (Railway) op verschillende domains draaien, hebben we CORS middleware nodig:

```typescript
// server/index.ts
app.use(cors({
  origin: ['https://schakel.ai', 'https://www.schakel.ai'],
  credentials: true
}));
```

Dit zorgt dat de browser de cross-origin requests toestaat.

## 📧 Stap 5: Email met MailerSend

### Wat is MailerSend?

Een transactional email service. Als iemand het contactformulier invult, moet er een email verstuurd worden naar info@schakel.ai.

### Waarom MailerSend (en niet Gmail/Outlook)?

✅ **Deliverability** - Emails komen aan (geen spam folder)  
✅ **SPF/DKIM records** - Email authentication  
✅ **Templates** - HTML emails met branding  
✅ **Tracking** - Open rates, click rates, bounces  
✅ **API-first** - Makkelijk te integreren

### Hoe werkt het?

```
User vult form in → Frontend POST request → Railway backend
                                                  ↓
                                          MailerSend API
                                                  ↓
                                        Email naar info@schakel.ai
```

**Environment secrets (Railway):**

- `MAILERSEND_API_KEY` → API token
- `MAILERSEND_FROM_EMAIL` → noreply@schakel.ai
- `MAILERSEND_TO_EMAIL` → info@schakel.ai

### Contact Form Features:

- **Twee formulieren**: Popup CTA (ExpandingCTA.tsx) + footer formulier (ContactForm.tsx)
- **Optionele velden**: Naam, bedrijf, email, telefoon, bericht
- **Slimme templates**: Email past zich aan op basis van ingevulde velden
- **Reply-to functionaliteit**: Direct terugmailen naar de inzender

## 🌍 Stap 6: DNS Setup met Namecheap

### Wat is DNS?

Domain Name System - vertaalt schakel.ai naar een IP-adres waar je website staat.

### Namecheap configuratie:

| Record Type | Host | Value |
|------------|------|-------|
| A | @ | 76.76.21.21 (Vercel IP) |
| CNAME | www | cname.vercel-dns.com |

**Wat betekent dit?**

- `schakel.ai` → Wijst direct naar Vercel
- `www.schakel.ai` → Wijst ook naar Vercel (via CNAME)

**DNS propagatie:**

Na het instellen duurt het 10-30 minuten voordat het wereldwijd werkt (DNS cache refresh).

## 📊 Stap 7: Analytics met Umami

### Wat is Umami?

Umami is een **privacy-first analytics platform** - het is een moderne, GDPR-compliant alternatief voor Google Analytics. Geen cookies, geen persoonlijke data tracking, gewoon inzichten in hoe bezoekers je site gebruiken.

### Waarom Umami (en niet Google Analytics)?

✅ **Privacy-first** - GDPR compliant zonder cookie banners  
✅ **Lichtgewicht** - Klein script, snel laden  
✅ **Real-time** - Live dashboards  
✅ **Event tracking** - Custom events met properties  
✅ **Open source** - Transparant en zelf te hosten

### Wat tracken we?

**Pageviews & Traffic:**
- Unieke bezoekers
- Pageviews
- Bounce rate
- Geografische data

**User Behavior:**
- `section-view` - Welke secties worden bekeken (Vision, Services, Approach, About, Contact)
- `navigation-click` - Menu navigatie gebruik
- `language-switch` - Taalwisselingen (NL/EN/AI)
- `theme-toggle` - Light/dark mode switches
- `cta-click` - Popup CTA interacties
- `form-submit` - Contact formulier submissions

### Hoe werkt het?

```html
<!-- Umami script in <head> -->
<script defer 
  src="https://cloud.umami.is/script.js" 
  data-website-id="15185f46-0b14-469b-b7bf-d24ef5aea8eb">
</script>
```

**Event tracking helper:**

```typescript
// client/src/lib/analytics.ts
export function trackEvent(eventName: string, eventData?: Record<string, string | number>) {
  const umami = (window as any).umami;
  if (umami && typeof umami.track === 'function') {
    umami.track(eventName, eventData || {});
  }
}
```

**Voorbeeld tracking calls:**

```typescript
// Navigation click
trackEvent('navigation-click', { section: 'services' });

// Language switch  
trackEvent('language-switch', { to: 'en' });

// Section viewed (scroll tracking)
trackEvent('section-view', { section: 'about' });
```

### Scroll Depth Tracking:

We gebruiken een **Intersection Observer** om te meten welke secties bezoekers bekijken:

```typescript
// Trigger wanneer 50%+ van een sectie zichtbaar is
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.5) {
        trackEvent('section-view', { section: sectionId });
      }
    });
  },
  { threshold: [0.5] }
);
```

**Inzichten die je krijgt:**

- Hoeveel mensen scrollen naar "Over Ons"?
- Welke secties worden het meest gelezen?
- Op welke pagina's haken mensen af?

## 🗺️ Stap 8: Google Maps Integratie

### Kantooradres Weergave:

We hebben een Google Maps embed toegevoegd met kantoorlocatie (Coolsingel 65, Rotterdam).

**Layout:**
- Links: Google Maps iframe
- Rechts: Adresgegevens (straat, postcode, stad)

**Dark Mode Challenge:**

Google Maps heeft geen native dark mode parameter, dus we gebruiken **CSS filters**:

```css
/* Dark mode maps via CSS filters */
.dark iframe[src*="google.com/maps"] {
  filter: invert(90%) hue-rotate(180deg) brightness(0.9) contrast(1.1);
}
```

Dit geeft een consistente dark mode ervaring zonder URL parameters!

## 🎯 Eindresultaat: Complete Infrastructure

```
┌─────────────────────────────────────────────────┐
│                 DEVELOPMENT                      │
│              Replit IDE + Preview                │
│         (localhost:5000 development)             │
└────────────────────┬────────────────────────────┘
                     │ git push
                     ▼
┌─────────────────────────────────────────────────┐
│               GitHub Repository                  │
│      Version Control + CI/CD Trigger             │
└────────┬─────────────────────────┬───────────────┘
         │                         │
         │ Auto deploy             │ Auto deploy
         ▼                         ▼
┌─────────────────┐       ┌────────────────────────┐
│     VERCEL      │       │       RAILWAY          │
│   (Frontend)    │◄─────►│      (Backend)         │
│                 │ CORS  │                        │
│  React + Vite   │       │   Express.js API       │
│  Tailwind CSS   │       │   /api/contact         │
│  shadcn/ui      │       │        │               │
│                 │       │        ▼               │
│ schakel.ai      │       │   MailerSend API       │
│ www.schakel.ai  │       │        │               │
└────────┬────────┘       └────────┼───────────────┘
         │                         │
         │                         ▼
         │               ┌──────────────────┐
         │               │  Email Delivery  │
         │               │ info@schakel.ai  │
         │               └──────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────┐
│              Namecheap DNS                       │
│       schakel.ai → Vercel IP                     │
│       www.schakel.ai → Vercel CNAME              │
└─────────────────────────────────────────────────┘
         ▲
         │
         ▼
┌─────────────────────────────────────────────────┐
│              Umami Analytics                     │
│     User behavior tracking + insights            │
│  section-view, navigation, CTA, forms            │
└─────────────────────────────────────────────────┘
```

## 📊 Volledige Tool Stack Overzicht

| Fase | Tool | Functie |
|------|------|---------|
| **Design** | ChatGPT | Logo concepten |
| | Google Imagen | AI image generation |
| | Nano Banana | Design refinement |
| **Development** | Replit | Cloud IDE + preview |
| | React + TypeScript | Frontend framework |
| | Vite | Build tool |
| | Tailwind CSS | Styling framework |
| | shadcn/ui | UI component library |
| | Express.js | Backend server |
| **Version Control** | GitHub | Code repository + CI/CD |
| **Hosting** | Vercel | Frontend deployment |
| | Railway | Backend API deployment |
| **Email** | MailerSend | Transactional emails |
| **DNS** | Namecheap | Domain management |
| **Analytics** | Umami Cloud | Privacy-first analytics |
| **Maps** | Google Maps | Location embed |

## 🚀 Deployment Flow

### Hoe gaat een code change live?

1. **Develop in Replit** → Code wijzigen, direct preview
2. **Git commit** → `git add . && git commit -m "message"`
3. **Git push** → `git push origin main`
4. **GitHub webhook** → Triggert Vercel + Railway
5. **Vercel build** → `npm install && vite build` (30-60 sec)
6. **Railway build** → `esbuild` backend bundle (15-30 sec)
7. **Live!** → Beide platforms deployen tegelijk
8. **DNS routing** → schakel.ai wijst naar nieuwe versie

**Totale deployment tijd: ~2 minuten** ⚡

## 💡 Waarom deze setup zo goed werkt

### 1. Developer Experience
- Code in de cloud (Replit) = overal werken
- Hot reload = direct feedback
- TypeScript = minder bugs
- Real-time analytics = direct inzichten

### 2. Snelheid
- Vite = snelste builds
- Vercel CDN = wereldwijd snel
- Split deploy = frontend & backend parallel
- Umami = lichtgewicht analytics script

### 3. Betrouwbaarheid
- GitHub = versiecontrole + backup
- Auto-deploy = geen handmatige stappen
- Environment secrets = veilig
- Email deliverability via MailerSend

### 4. Privacy & Compliance
- Umami = GDPR compliant zonder cookies
- Geen Google Analytics tracking
- Privacy-first approach
- Transparante data collectie

### 5. Schaalbaarheid
- Vercel schaalt automatisch
- Railway kan upgraden naar dedicated
- Database klaar voor groei (PostgreSQL)
- Analytics schaalt mee

### 6. Cost-effective
- **Vercel:** Free tier (hobby projects)
- **Railway:** $5-10/maand (starter)
- **MailerSend:** Gratis tot 12k emails/maand
- **Umami Cloud:** Gratis tot 100k pageviews/maand

**Totaal: ~$10-15/maand voor professionele setup**

## 🎓 Wat hebben we geleerd?

- ✅ **AI tools kunnen echt design werk doen** (logo!)
- ✅ **Modern web development is cloud-first**
- ✅ **Split architectures geven flexibiliteit** (Vercel + Railway)
- ✅ **Automation bespaart enorm veel tijd** (CI/CD)
- ✅ **Type safety (TypeScript) = must-have**
- ✅ **Privacy-first analytics is de toekomst** (Umami > GA)
- ✅ **CSS filters kunnen dark mode fixen** (Google Maps hack)
- ✅ **Event tracking geeft waardevolle inzichten** (section views!)

## 🔮 Volgende Stappen

**Short-term:**
- A/B testing voor CTA teksten
- Performance optimalisatie (Core Web Vitals)
- Lighthouse audit scores (100/100)

**Long-term:**
- Blog functionaliteit (Markdown CMS)
- Case studies pagina's
- Client dashboard (login area)
- Newsletter integratie

---

**De complete tech stack draait nu live op schakel.ai** 🚀

Van logo ontwerp tot deployment, van analytics tot email delivery - alles werkt samen in een moderne, schaalbare, privacy-first architectuur.
