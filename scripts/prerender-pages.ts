import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['nl', 'en'] as const;
type Language = typeof languages[number];

interface BlogPostData {
  slug: string;
  title: string;
  excerpt: string;
  publishDate: string;
  readingTime: number;
  category: string;
  authorName: string;
}

const blogPosts: Record<Language, BlogPostData[]> = {
  nl: [
    {
      slug: 'zenuwstelsel-van-ons-bedrijf',
      title: 'Het zenuwstelsel van ons bedrijf',
      excerpt: 'Wij kijken anders naar automatiseren met AI. Niet als iets magisch, maar als een fundamentele manier om werk opnieuw te organiseren.',
      publishDate: '2025-12-20',
      readingTime: 5,
      category: 'AI Strategy',
      authorName: 'Simon Voorbergen'
    },
    {
      slug: 'toekomst-van-software',
      title: 'De toekomst van software: van tools naar autonome workflows',
      excerpt: 'Wat gebeurt er met software wanneer het niet langer ondersteunt, maar daadwerkelijk werk uitvoert?',
      publishDate: '2025-12-19',
      readingTime: 5,
      category: 'AI Development',
      authorName: 'Rob van Zutphen'
    },
    {
      slug: 'einde-van-de-tussenlaag',
      title: 'Het einde van de tussenlaag: waarom wij de low-code route overslaan',
      excerpt: 'Low-code was jarenlang de brug tussen business en IT. Maar in het AI-tijdperk wordt vibecoding de nieuwe standaard.',
      publishDate: '2025-12-08',
      readingTime: 8,
      category: 'AI Development',
      authorName: 'Rob van Zutphen'
    },
    {
      slug: 'meeting-automation-center',
      title: 'Van Transcriptie naar Automatische Workflow: Hoe Wij Meetings Opgelost Hebben',
      excerpt: 'Tools transcriberen prima, maar het administratieve werk blijft hangen. Wij bouwden een systeem dat alles automatisch regelt.',
      publishDate: '2025-11-30',
      readingTime: 10,
      category: 'AI Automation',
      authorName: 'Rob van Zutphen'
    },
    {
      slug: 'website-bouwen-met-ai',
      title: 'Website bouwen met AI: Hoe we schakel.ai zelf maakten',
      excerpt: 'Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding.',
      publishDate: '2025-11-23',
      readingTime: 12,
      category: 'AI Development',
      authorName: 'Rob van Zutphen'
    }
  ],
  en: [
    {
      slug: 'zenuwstelsel-van-ons-bedrijf',
      title: 'The nervous system of our company',
      excerpt: 'We view AI automation differently. Not as something magical, but as a fundamental way to reorganize work.',
      publishDate: '2025-12-20',
      readingTime: 5,
      category: 'AI Strategy',
      authorName: 'Simon Voorbergen'
    },
    {
      slug: 'toekomst-van-software',
      title: 'The future of software: from tools to autonomous workflows',
      excerpt: 'What happens to software when it no longer just supports, but actually performs work?',
      publishDate: '2025-12-19',
      readingTime: 5,
      category: 'AI Development',
      authorName: 'Rob van Zutphen'
    },
    {
      slug: 'einde-van-de-tussenlaag',
      title: 'The end of the middle layer: why we skip the low-code route',
      excerpt: 'Low-code was the bridge between business and IT for years. But in the AI era, vibecoding becomes the new standard.',
      publishDate: '2025-12-08',
      readingTime: 8,
      category: 'AI Development',
      authorName: 'Rob van Zutphen'
    },
    {
      slug: 'meeting-automation-center',
      title: 'From Transcription to Automatic Workflow: How We Solved Meetings',
      excerpt: 'Tools transcribe just fine, but the administrative work gets stuck. We built a system that handles everything automatically.',
      publishDate: '2025-11-30',
      readingTime: 10,
      category: 'AI Automation',
      authorName: 'Rob van Zutphen'
    },
    {
      slug: 'website-bouwen-met-ai',
      title: 'Building a Website with AI: How we made schakel.ai',
      excerpt: 'Built our website with AI without a programmer. The complete story about vibecoding.',
      publishDate: '2025-11-23',
      readingTime: 12,
      category: 'AI Development',
      authorName: 'Rob van Zutphen'
    }
  ]
};

const translations = {
  nl: {
    blog: {
      title: 'Blog',
      subtitle: 'Inzichten, cases en praktische tips over AI-implementatie',
      metaDescription: 'Blog van Schakel AI met praktische inzichten over AI-automatisering, workflow optimalisatie en digitale transformatie.',
      readMore: 'Lees meer',
      minRead: 'min leestijd'
    },
    tools: {
      title: 'Tools Portal',
      subtitle: 'Toegang tot onze interne AI-tools en platforms',
      metaDescription: 'Schakel AI Tools Portal - Toegang tot Meeting Automation Platform en andere AI-tools voor klanten.',
      mapName: 'Meeting Automation Platform',
      mapDescription: 'Automatiseer je meeting workflows: van transcriptie naar notulen, taken en opvolging.',
      loginRequired: 'Login vereist voor toegang'
    },
    aiView: {
      title: 'AI View',
      subtitle: 'Technische documentatie en specificaties voor AI-agents',
      metaDescription: 'AI View pagina van Schakel AI met technische documentatie en machine-leesbare content voor AI-agents en crawlers.'
    }
  },
  en: {
    blog: {
      title: 'Blog',
      subtitle: 'Insights, cases, and practical tips on AI implementation',
      metaDescription: 'Schakel AI blog with practical insights on AI automation, workflow optimization, and digital transformation.',
      readMore: 'Read more',
      minRead: 'min read'
    },
    tools: {
      title: 'Tools Portal',
      subtitle: 'Access to our internal AI tools and platforms',
      metaDescription: 'Schakel AI Tools Portal - Access to Meeting Automation Platform and other AI tools for clients.',
      mapName: 'Meeting Automation Platform',
      mapDescription: 'Automate your meeting workflows: from transcription to notes, tasks, and follow-up.',
      loginRequired: 'Login required for access'
    },
    aiView: {
      title: 'AI View',
      subtitle: 'Technical documentation and specifications for AI agents',
      metaDescription: 'AI View page of Schakel AI with technical documentation and machine-readable content for AI agents and crawlers.'
    }
  }
};

function getBaseStyles(): string {
  return `
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: Inter, system-ui, sans-serif; 
      line-height: 1.7; 
      color: #1a1a1a; 
      background: #fff;
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    header { margin-bottom: 40px; border-bottom: 1px solid #e5e5e5; padding-bottom: 30px; }
    h1 { font-family: 'DM Sans', sans-serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 16px; line-height: 1.2; }
    h2 { font-family: 'DM Sans', sans-serif; font-size: 1.5rem; font-weight: 700; margin-bottom: 12px; }
    .subtitle { color: #666; font-size: 1.1rem; margin-bottom: 20px; }
    .meta { color: #666; font-size: 0.85rem; }
    .category { display: inline-block; background: rgba(110, 191, 170, 0.1); color: #6EBFAA; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; margin-bottom: 8px; }
    a { color: #6EBFAA; text-decoration: none; }
    a:hover { text-decoration: underline; }
    .card { border: 1px solid #e5e5e5; border-radius: 8px; padding: 24px; margin-bottom: 20px; }
    .card:hover { border-color: #6EBFAA; }
    .card h2 a { color: #1a1a1a; }
    .card p { color: #666; margin-bottom: 12px; }
    footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid #e5e5e5; text-align: center; color: #666; }
    .js-notice { background: #f0f9f6; border: 1px solid #6EBFAA; padding: 16px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
    .js-notice a { color: #6EBFAA; font-weight: 500; }
    .tool-card { display: flex; align-items: flex-start; gap: 16px; }
    .tool-icon { width: 60px; height: 60px; background: rgba(110, 191, 170, 0.1); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #6EBFAA; font-size: 24px; }
    .tool-content { flex: 1; }
    .badge { display: inline-block; background: #6EBFAA; color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; margin-bottom: 16px; }
  `;
}

function generateBlogIndexHTML(lang: Language): string {
  const t = translations[lang];
  const posts = blogPosts[lang];
  const canonicalUrl = lang === 'nl' 
    ? 'https://www.schakel.ai/blog'
    : 'https://www.schakel.ai/blog?lang=en';
  
  const postsHTML = posts.map(post => {
    const formattedDate = new Date(post.publishDate).toLocaleDateString(
      lang === 'nl' ? 'nl-NL' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
    const postUrl = lang === 'nl' 
      ? `https://www.schakel.ai/blog/${post.slug}`
      : `https://www.schakel.ai/blog/${post.slug}?lang=en`;
    
    return `
      <article class="card">
        <span class="category">${post.category}</span>
        <h2><a href="${postUrl}">${post.title}</a></h2>
        <p>${post.excerpt}</p>
        <div class="meta">
          ${formattedDate} &bull; ${post.readingTime} ${t.blog.minRead} &bull; ${post.authorName}
        </div>
      </article>
    `;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>${t.blog.title} | Schakel AI</title>
  <meta name="description" content="${t.blog.metaDescription}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="nl" href="https://www.schakel.ai/blog" />
  <link rel="alternate" hreflang="en" href="https://www.schakel.ai/blog?lang=en" />
  <link rel="alternate" hreflang="x-default" href="https://www.schakel.ai/blog" />
  
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${t.blog.title} | Schakel AI" />
  <meta property="og:description" content="${t.blog.metaDescription}" />
  <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_US'}" />
  <meta property="og:site_name" content="Schakel AI" />
  
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${t.blog.title} | Schakel AI" />
  <meta name="twitter:description" content="${t.blog.metaDescription}" />
  
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "${t.blog.title} - Schakel AI",
    "description": "${t.blog.metaDescription}",
    "url": "${canonicalUrl}",
    "publisher": {
      "@type": "Organization",
      "name": "Schakel AI B.V.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.schakel.ai/logo.png"
      }
    },
    "blogPost": [
      ${posts.map(post => `{
        "@type": "BlogPosting",
        "headline": "${post.title}",
        "description": "${post.excerpt}",
        "url": "https://www.schakel.ai/blog/${post.slug}",
        "datePublished": "${post.publishDate}",
        "author": {
          "@type": "Person",
          "name": "${post.authorName}"
        }
      }`).join(',\n      ')}
    ]
  }
  </script>
  
  <style>${getBaseStyles()}</style>
</head>
<body>
  <div class="js-notice">
    ${lang === 'nl' 
      ? 'Voor de volledige interactieve ervaring, <a href="https://www.schakel.ai/blog">bekijk de blog met JavaScript ingeschakeld</a>.'
      : 'For the full interactive experience, <a href="https://www.schakel.ai/blog">view the blog with JavaScript enabled</a>.'}
  </div>
  
  <header>
    <h1>${t.blog.title}</h1>
    <p class="subtitle">${t.blog.subtitle}</p>
  </header>
  
  <main>
    ${postsHTML}
  </main>
  
  <footer>
    <p><strong>Schakel AI B.V.</strong></p>
    <p><a href="https://www.schakel.ai">www.schakel.ai</a> | <a href="mailto:info@schakel.ai">info@schakel.ai</a></p>
    <p style="margin-top: 20px; font-size: 0.85rem;">&copy; ${new Date().getFullYear()} Schakel AI B.V. | Rotterdam, Nederland</p>
  </footer>
</body>
</html>`;
}

function generateToolsHTML(lang: Language): string {
  const t = translations[lang];
  const canonicalUrl = lang === 'nl' 
    ? 'https://www.schakel.ai/tools'
    : 'https://www.schakel.ai/tools?lang=en';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>${t.tools.title} | Schakel AI</title>
  <meta name="description" content="${t.tools.metaDescription}" />
  <meta name="robots" content="index, follow" />
  
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="nl" href="https://www.schakel.ai/tools" />
  <link rel="alternate" hreflang="en" href="https://www.schakel.ai/tools?lang=en" />
  <link rel="alternate" hreflang="x-default" href="https://www.schakel.ai/tools" />
  
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${t.tools.title} | Schakel AI" />
  <meta property="og:description" content="${t.tools.metaDescription}" />
  <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_US'}" />
  <meta property="og:site_name" content="Schakel AI" />
  
  <meta name="twitter:card" content="summary" />
  <meta name="twitter:title" content="${t.tools.title} | Schakel AI" />
  <meta name="twitter:description" content="${t.tools.metaDescription}" />
  
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "${t.tools.title}",
    "description": "${t.tools.metaDescription}",
    "url": "${canonicalUrl}",
    "publisher": {
      "@type": "Organization",
      "name": "Schakel AI B.V."
    }
  }
  </script>
  
  <style>${getBaseStyles()}</style>
</head>
<body>
  <div class="js-notice">
    ${lang === 'nl' 
      ? 'Voor volledige toegang tot de tools, <a href="https://www.schakel.ai/tools">bekijk deze pagina met JavaScript ingeschakeld</a>.'
      : 'For full access to the tools, <a href="https://www.schakel.ai/tools">view this page with JavaScript enabled</a>.'}
  </div>
  
  <header>
    <span class="badge">Tools</span>
    <h1>${t.tools.title}</h1>
    <p class="subtitle">${t.tools.subtitle}</p>
  </header>
  
  <main>
    <article class="card">
      <div class="tool-card">
        <div class="tool-icon">MAP</div>
        <div class="tool-content">
          <h2>${t.tools.mapName}</h2>
          <p>${t.tools.mapDescription}</p>
          <p class="meta">${t.tools.loginRequired} &bull; <a href="https://map.schakel.ai" rel="noopener noreferrer">map.schakel.ai</a></p>
        </div>
      </div>
    </article>
  </main>
  
  <footer>
    <p><strong>Schakel AI B.V.</strong></p>
    <p><a href="https://www.schakel.ai">www.schakel.ai</a> | <a href="mailto:info@schakel.ai">info@schakel.ai</a></p>
    <p style="margin-top: 20px; font-size: 0.85rem;">&copy; ${new Date().getFullYear()} Schakel AI B.V. | Rotterdam, Nederland</p>
  </footer>
</body>
</html>`;
}

function generateAIViewHTML(lang: Language): string {
  const t = translations[lang];
  const canonicalUrl = lang === 'nl' 
    ? 'https://www.schakel.ai/ai-view'
    : 'https://www.schakel.ai/ai-view?lang=en';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>${t.aiView.title} | Schakel AI</title>
  <meta name="description" content="${t.aiView.metaDescription}" />
  <meta name="robots" content="index, follow" />
  
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="nl" href="https://www.schakel.ai/ai-view" />
  <link rel="alternate" hreflang="en" href="https://www.schakel.ai/ai-view?lang=en" />
  <link rel="alternate" hreflang="x-default" href="https://www.schakel.ai/ai-view" />
  
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${t.aiView.title} | Schakel AI" />
  <meta property="og:description" content="${t.aiView.metaDescription}" />
  <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_US'}" />
  <meta property="og:site_name" content="Schakel AI" />
  
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "name": "${t.aiView.title}",
    "description": "${t.aiView.metaDescription}",
    "url": "${canonicalUrl}",
    "publisher": {
      "@type": "Organization",
      "name": "Schakel AI B.V."
    },
    "about": {
      "@type": "Organization",
      "name": "Schakel AI B.V.",
      "description": "AI Consultancy & Implementation - Practical AI solutions that deliver measurable results",
      "url": "https://www.schakel.ai",
      "email": "info@schakel.ai",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Coolsingel 65",
        "addressLocality": "Rotterdam",
        "postalCode": "3012 AC",
        "addressCountry": "NL"
      }
    }
  }
  </script>
  
  <style>${getBaseStyles()}
    .info-block { background: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px; }
    .info-block h3 { font-size: 1rem; color: #6EBFAA; margin-bottom: 8px; text-transform: uppercase; letter-spacing: 0.5px; }
    .info-block p { margin-bottom: 8px; }
    .info-block ul { list-style: none; padding: 0; }
    .info-block li { padding: 4px 0; border-bottom: 1px solid #e5e5e5; }
    .info-block li:last-child { border-bottom: none; }
  </style>
</head>
<body>
  <div class="js-notice">
    ${lang === 'nl' 
      ? 'Voor de volledige interactieve AI View, <a href="https://www.schakel.ai/ai-view">bekijk met JavaScript ingeschakeld</a>.'
      : 'For the full interactive AI View, <a href="https://www.schakel.ai/ai-view">view with JavaScript enabled</a>.'}
  </div>
  
  <header>
    <span class="badge">AI View</span>
    <h1>${t.aiView.title}</h1>
    <p class="subtitle">${t.aiView.subtitle}</p>
  </header>
  
  <main>
    <div class="info-block">
      <h3>Company</h3>
      <p><strong>Schakel AI B.V.</strong></p>
      <p>AI Consultancy & Implementation</p>
      <p>Coolsingel 65, 3012 AC Rotterdam, Netherlands</p>
      <p>KVK: 98312529 | BTW: NL868441119B01</p>
    </div>
    
    <div class="info-block">
      <h3>Core Services</h3>
      <ul>
        <li>Workflow Automation - Automate repetitive tasks and connect systems</li>
        <li>Customer Service AI - Chat & Voice assistants, 24/7 multilingual support</li>
        <li>Internal Support Agents - HR, IT, and operational question handling</li>
        <li>AI Sales & Marketing - Lead qualification and follow-up automation</li>
        <li>Email Management - AI-powered email sorting and response</li>
        <li>Content Generation - Scalable, consistent content creation</li>
      </ul>
    </div>
    
    <div class="info-block">
      <h3>Team</h3>
      <ul>
        <li><strong>Rob van Zutphen</strong> - Co-founder | Data & AI Solutions</li>
        <li><strong>Simon</strong> - Co-founder | Process & Results</li>
      </ul>
    </div>
    
    <div class="info-block">
      <h3>Approach</h3>
      <p>4-week implementation method: Explore → Design → Implement → Results</p>
      <p>Focus on one process at a time with measurable outcomes within 30 days.</p>
    </div>
    
    <div class="info-block">
      <h3>Machine-Readable Resources</h3>
      <ul>
        <li><a href="/llms.txt">llms.txt</a> - Detailed company information for LLMs</li>
        <li><a href="/sitemap.xml">sitemap.xml</a> - Complete site structure</li>
        <li><a href="/robots.txt">robots.txt</a> - Crawler permissions</li>
      </ul>
    </div>
    
    <div class="info-block">
      <h3>Contact</h3>
      <p>Email: <a href="mailto:info@schakel.ai">info@schakel.ai</a></p>
      <p>Website: <a href="https://www.schakel.ai">www.schakel.ai</a></p>
    </div>
  </main>
  
  <footer>
    <p><strong>Schakel AI B.V.</strong></p>
    <p><a href="https://www.schakel.ai">www.schakel.ai</a> | <a href="mailto:info@schakel.ai">info@schakel.ai</a></p>
    <p style="margin-top: 20px; font-size: 0.85rem;">&copy; ${new Date().getFullYear()} Schakel AI B.V. | Rotterdam, Nederland</p>
  </footer>
</body>
</html>`;
}

async function main() {
  console.log('🚀 Starting page pre-rendering...\n');
  
  // Output to _seo directory to avoid conflicting with SPA routes
  // This ensures Vercel serves the React SPA for all routes
  // while static HTML remains available at /_seo/* for crawlers
  const seoDir = path.join(__dirname, '..', 'client', 'public', '_seo');
  
  // Generate Blog Index pages
  const blogDir = path.join(seoDir, 'blog');
  if (!fs.existsSync(blogDir)) {
    fs.mkdirSync(blogDir, { recursive: true });
  }
  
  for (const lang of languages) {
    const html = generateBlogIndexHTML(lang);
    if (lang === 'nl') {
      fs.writeFileSync(path.join(blogDir, 'index.html'), html, 'utf-8');
      console.log('✅ Generated: /_seo/blog/index.html (nl)');
    }
    fs.writeFileSync(path.join(blogDir, `${lang}.html`), html, 'utf-8');
    console.log(`✅ Generated: /_seo/blog/${lang}.html`);
  }
  
  // Generate Tools pages
  const toolsDir = path.join(seoDir, 'tools');
  if (!fs.existsSync(toolsDir)) {
    fs.mkdirSync(toolsDir, { recursive: true });
  }
  
  for (const lang of languages) {
    const html = generateToolsHTML(lang);
    if (lang === 'nl') {
      fs.writeFileSync(path.join(toolsDir, 'index.html'), html, 'utf-8');
      console.log('✅ Generated: /_seo/tools/index.html (nl)');
    }
    fs.writeFileSync(path.join(toolsDir, `${lang}.html`), html, 'utf-8');
    console.log(`✅ Generated: /_seo/tools/${lang}.html`);
  }
  
  // Generate AI View pages
  const aiViewDir = path.join(seoDir, 'ai-view');
  if (!fs.existsSync(aiViewDir)) {
    fs.mkdirSync(aiViewDir, { recursive: true });
  }
  
  for (const lang of languages) {
    const html = generateAIViewHTML(lang);
    if (lang === 'nl') {
      fs.writeFileSync(path.join(aiViewDir, 'index.html'), html, 'utf-8');
      console.log('✅ Generated: /_seo/ai-view/index.html (nl)');
    }
    fs.writeFileSync(path.join(aiViewDir, `${lang}.html`), html, 'utf-8');
    console.log(`✅ Generated: /_seo/ai-view/${lang}.html`);
  }
  
  console.log('\n🎉 Page pre-rendering complete!');
  console.log('📁 All static SEO pages now in /_seo/ directory');
}

main().catch(console.error);
