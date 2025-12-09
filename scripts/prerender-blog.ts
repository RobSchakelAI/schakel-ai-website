import { marked } from 'marked';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Author {
  name: string;
  role: string;
  bio: string;
}

interface BlogPostTranslation {
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  category?: string;
  author: Author;
}

interface BlogPost {
  slug: string;
  publishDate: string;
  readingTime: number;
  ogImage?: string;
  translations: {
    nl: BlogPostTranslation;
    en: BlogPostTranslation;
  };
}

const languages = ['nl', 'en'] as const;
type Language = typeof languages[number];

function generateArticleSchema(post: BlogPost, lang: Language): string {
  const translation = post.translations[lang];
  const datePublished = new Date(post.publishDate).toISOString();
  
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": translation.title,
    "description": translation.metaDescription,
    "author": {
      "@type": "Person",
      "name": translation.author.name,
      "jobTitle": translation.author.role
    },
    "publisher": {
      "@type": "Organization",
      "name": "Schakel AI B.V.",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.schakel.ai/logo.png"
      }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.schakel.ai/blog/${post.slug}`
    },
    "image": post.ogImage ? `https://www.schakel.ai${post.ogImage}` : "https://www.schakel.ai/logo.png",
    "articleSection": translation.category || "AI",
    "keywords": translation.keywords.join(", "),
    "wordCount": translation.content.split(/\s+/).length,
    "inLanguage": lang === 'nl' ? 'nl-NL' : 'en-US'
  }, null, 2);
}

function generateBreadcrumbSchema(post: BlogPost, lang: Language): string {
  const translation = post.translations[lang];
  
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.schakel.ai/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://www.schakel.ai/blog"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": translation.title,
        "item": `https://www.schakel.ai/blog/${post.slug}`
      }
    ]
  }, null, 2);
}

function generateHTML(post: BlogPost, lang: Language): string {
  const translation = post.translations[lang];
  const htmlContent = marked.parse(translation.content) as string;
  const canonicalUrl = lang === 'nl' 
    ? `https://www.schakel.ai/blog/${post.slug}`
    : `https://www.schakel.ai/blog/${post.slug}?lang=en`;
  
  const formattedDate = new Date(post.publishDate).toLocaleDateString(
    lang === 'nl' ? 'nl-NL' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <!-- Primary Meta Tags -->
  <title>${translation.title} | Schakel AI Blog</title>
  <meta name="title" content="${translation.title} | Schakel AI Blog" />
  <meta name="description" content="${translation.metaDescription}" />
  <meta name="author" content="${translation.author.name}" />
  <meta name="keywords" content="${translation.keywords.join(', ')}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  
  <!-- Canonical & Language Alternates -->
  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="nl" href="https://www.schakel.ai/blog/${post.slug}" />
  <link rel="alternate" hreflang="en" href="https://www.schakel.ai/blog/${post.slug}?lang=en" />
  <link rel="alternate" hreflang="x-default" href="https://www.schakel.ai/blog/${post.slug}" />
  
  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${translation.title}" />
  <meta property="og:description" content="${translation.metaDescription}" />
  <meta property="og:image" content="${post.ogImage ? `https://www.schakel.ai${post.ogImage}` : 'https://www.schakel.ai/logo.png'}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_US'}" />
  <meta property="og:site_name" content="Schakel AI" />
  <meta property="article:published_time" content="${new Date(post.publishDate).toISOString()}" />
  <meta property="article:author" content="${translation.author.name}" />
  <meta property="article:section" content="${translation.category || 'AI'}" />
  ${translation.keywords.map(k => `<meta property="article:tag" content="${k}" />`).join('\n  ')}
  
  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonicalUrl}" />
  <meta name="twitter:title" content="${translation.title}" />
  <meta name="twitter:description" content="${translation.metaDescription}" />
  <meta name="twitter:image" content="${post.ogImage ? `https://www.schakel.ai${post.ogImage}` : 'https://www.schakel.ai/logo.png'}" />
  
  <!-- Favicon -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  
  <!-- Schema.org Article Structured Data -->
  <script type="application/ld+json">
  ${generateArticleSchema(post, lang)}
  </script>
  
  <!-- Schema.org Breadcrumb Structured Data -->
  <script type="application/ld+json">
  ${generateBreadcrumbSchema(post, lang)}
  </script>
  
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { 
      font-family: Inter, system-ui, sans-serif; 
      line-height: 1.7; 
      color: #1a1a1a; 
      background: #fff;
      max-width: 800px;
      margin: 0 auto;
      padding: 40px 20px;
    }
    header { margin-bottom: 40px; border-bottom: 1px solid #e5e5e5; padding-bottom: 30px; }
    h1 { font-family: 'DM Sans', sans-serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 16px; line-height: 1.2; }
    .meta { color: #666; font-size: 0.9rem; margin-bottom: 16px; }
    .meta span { margin-right: 16px; }
    .author { display: flex; align-items: center; gap: 12px; margin-top: 20px; }
    .author-avatar { width: 48px; height: 48px; border-radius: 50%; background: #6EBFAA; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600; }
    .author-info { }
    .author-name { font-weight: 600; }
    .author-role { color: #666; font-size: 0.9rem; }
    .category { display: inline-block; background: rgba(110, 191, 170, 0.1); color: #6EBFAA; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 500; margin-bottom: 16px; }
    article { }
    article h2 { font-family: 'DM Sans', sans-serif; font-size: 1.75rem; font-weight: 700; margin: 40px 0 16px; }
    article h3 { font-family: 'DM Sans', sans-serif; font-size: 1.35rem; font-weight: 700; margin: 32px 0 12px; }
    article p { margin-bottom: 16px; }
    article ul, article ol { margin: 16px 0; padding-left: 24px; }
    article li { margin-bottom: 8px; }
    article strong { font-weight: 600; }
    article em { font-style: italic; }
    article a { color: #6EBFAA; text-decoration: none; }
    article a:hover { text-decoration: underline; }
    article code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; font-size: 0.9em; }
    article pre { background: #f5f5f5; padding: 16px; border-radius: 8px; overflow-x: auto; margin: 16px 0; }
    article pre code { background: none; padding: 0; }
    article blockquote { border-left: 4px solid #6EBFAA; padding-left: 16px; margin: 16px 0; color: #666; font-style: italic; }
    article hr { border: none; border-top: 1px solid #e5e5e5; margin: 32px 0; }
    footer { margin-top: 60px; padding-top: 30px; border-top: 1px solid #e5e5e5; text-align: center; color: #666; }
    footer a { color: #6EBFAA; }
    .js-notice { background: #f0f9f6; border: 1px solid #6EBFAA; padding: 16px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
    .js-notice a { color: #6EBFAA; font-weight: 500; }
  </style>
</head>
<body>
  <div class="js-notice">
    ${lang === 'nl' 
      ? 'Voor de volledige interactieve ervaring, <a href="https://www.schakel.ai/blog/' + post.slug + '">bekijk dit artikel met JavaScript ingeschakeld</a>.'
      : 'For the full interactive experience, <a href="https://www.schakel.ai/blog/' + post.slug + '">view this article with JavaScript enabled</a>.'}
  </div>
  
  <header>
    ${translation.category ? `<span class="category">${translation.category}</span>` : ''}
    <h1>${translation.title}</h1>
    <div class="meta">
      <span>📅 ${formattedDate}</span>
      <span>⏱️ ${post.readingTime} ${lang === 'nl' ? 'min leestijd' : 'min read'}</span>
    </div>
    <div class="author">
      <div class="author-avatar">${translation.author.name.split(' ').map(n => n[0]).join('')}</div>
      <div class="author-info">
        <div class="author-name">${translation.author.name}</div>
        <div class="author-role">${translation.author.role}</div>
      </div>
    </div>
  </header>
  
  <article>
    ${htmlContent}
  </article>
  
  <footer>
    <p><strong>Schakel AI B.V.</strong></p>
    <p>AI-oplossingen die direct tijd en geld opleveren</p>
    <p><a href="https://www.schakel.ai">www.schakel.ai</a> | <a href="mailto:info@schakel.ai">info@schakel.ai</a></p>
    <p style="margin-top: 20px; font-size: 0.85rem;">© ${new Date().getFullYear()} Schakel AI B.V. | Rotterdam, Nederland</p>
  </footer>
</body>
</html>`;
}

async function loadBlogPosts(): Promise<BlogPost[]> {
  const blogDataPath = path.join(__dirname, '..', 'shared', 'blog-data.ts');
  const blogDataContent = fs.readFileSync(blogDataPath, 'utf-8');
  
  const contentDir = path.join(__dirname, '..', 'shared', 'blog-content');
  const contentFiles = fs.readdirSync(contentDir);
  
  const contentMap: Record<string, string> = {};
  
  for (const file of contentFiles) {
    if (file.endsWith('.tsx')) {
      const filePath = path.join(contentDir, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      
      const match = content.match(/export const (\w+) = `([\s\S]*?)`;/);
      if (match) {
        contentMap[match[1]] = match[2];
      }
    }
  }
  
  const posts: BlogPost[] = [];
  
  const slugMatches = blogDataContent.matchAll(/slug:\s*['"]([^'"]+)['"]/g);
  const publishDateMatches = blogDataContent.matchAll(/publishDate:\s*['"]([^'"]+)['"]/g);
  const readingTimeMatches = blogDataContent.matchAll(/readingTime:\s*(\d+)/g);
  const ogImageMatches = blogDataContent.matchAll(/ogImage:\s*['"]([^'"]+)['"]/g);
  
  const slugs = [...slugMatches].map(m => m[1]);
  const publishDates = [...publishDateMatches].map(m => m[1]);
  const readingTimes = [...readingTimeMatches].map(m => parseInt(m[1]));
  const ogImages = [...ogImageMatches].map(m => m[1]);
  
  const nlTitleMatches = blogDataContent.matchAll(/nl:\s*\{[^}]*title:\s*['"]([^'"]+)['"]/gs);
  const nlExcerptMatches = blogDataContent.matchAll(/nl:\s*\{[^}]*excerpt:\s*['"]([^'"]+)['"]/gs);
  const nlMetaDescMatches = blogDataContent.matchAll(/nl:\s*\{[^}]*metaDescription:\s*['"]([^'"]+)['"]/gs);
  
  const nlBlocks = blogDataContent.split(/\n\s*\{[\s\n]*slug:/g).slice(1);
  
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    
    let nlContent = '';
    let enContent = '';
    let nlTitle = '';
    let enTitle = '';
    let nlExcerpt = '';
    let enExcerpt = '';
    let nlMetaDesc = '';
    let enMetaDesc = '';
    let nlCategory = '';
    let enCategory = '';
    let nlAuthorName = '';
    let nlAuthorRole = '';
    let nlAuthorBio = '';
    let enAuthorName = '';
    let enAuthorRole = '';
    let enAuthorBio = '';
    let nlKeywords: string[] = [];
    let enKeywords: string[] = [];
    
    if (slug === 'einde-van-de-tussenlaag') {
      nlContent = contentMap['eindeVanDeTussenlaagContent'] || '';
      enContent = contentMap['eindeVanDeTussenlaagContentEN'] || '';
      nlTitle = 'Waarom wij niet meer bouwen met low-code (en jij misschien ook niet)';
      enTitle = 'Why we no longer build with low-code (and maybe you shouldn\'t either)';
      nlExcerpt = 'Low-code was jarenlang de brug tussen business en IT. Maar in het AI-tijdperk wordt vibecoding de nieuwe standaard.';
      enExcerpt = 'Low-code was the bridge between business and IT for years. But in the AI era, vibecoding becomes the new standard.';
      nlMetaDesc = 'Waarom Schakel AI kiest voor vibecoding in plaats van low-code. AI-assisted development biedt meer controle, flexibiliteit en eigenaarschap over je software.';
      enMetaDesc = 'Why Schakel AI chooses vibecoding over low-code. AI-assisted development offers more control, flexibility, and ownership over your software.';
      nlCategory = 'AI Development';
      enCategory = 'AI Development';
      nlAuthorName = 'Rob van Zutphen';
      nlAuthorRole = 'Mede-oprichter Schakel';
      nlAuthorBio = 'Rob helpt bedrijven slimmer werken met AI.';
      enAuthorName = 'Rob van Zutphen';
      enAuthorRole = 'Co-founder Schakel';
      enAuthorBio = 'Rob helps companies work smarter with AI.';
      nlKeywords = ['vibecoding', 'low-code vs vibecoding', 'AI-assisted development', 'Replit', 'software eigenaarschap'];
      enKeywords = ['vibecoding', 'low-code vs vibecoding', 'AI-assisted development', 'Replit', 'software ownership'];
    } else if (slug === 'meeting-automation-center') {
      nlContent = contentMap['meetingAutomationCenterContent'] || '';
      enContent = contentMap['meetingAutomationCenterContentEN'] || '';
      nlTitle = 'Van Transcriptie naar Automatische Workflow: Hoe Wij Meetings Opgelost Hebben';
      enTitle = 'From Transcription to Automatic Workflow: How We Solved Meetings';
      nlExcerpt = 'Tools transcriberen prima, maar het administratieve werk blijft hangen. Wij bouwden een systeem dat alles automatisch regelt.';
      enExcerpt = 'Tools transcribe just fine, but the administrative work gets stuck. We built a system that handles everything automatically.';
      nlMetaDesc = 'Hoe wij een Meeting Automation Center bouwden dat transcripties automatisch omzet naar notulen, SharePoint uploads, Outlook mails en taken in Productive.io.';
      enMetaDesc = 'How we built a Meeting Automation Center that automatically converts transcriptions into meeting notes, SharePoint uploads, Outlook emails, and tasks in Productive.io.';
      nlCategory = 'AI Automation';
      enCategory = 'AI Automation';
      nlAuthorName = 'Rob van Zutphen';
      nlAuthorRole = 'Mede-oprichter Schakel';
      nlAuthorBio = 'Rob helpt bedrijven slimmer werken met AI.';
      enAuthorName = 'Rob van Zutphen';
      enAuthorRole = 'Co-founder Schakel';
      enAuthorBio = 'Rob helps companies work smarter with AI.';
      nlKeywords = ['meeting automatisering', 'AI notulen', 'workflow automatisering'];
      enKeywords = ['meeting automation', 'AI meeting notes', 'workflow automation'];
    } else if (slug === 'website-bouwen-met-ai') {
      nlContent = contentMap['websiteBouwenMetAIContent'] || '';
      enContent = contentMap['websiteBouwenMetAIContentEN'] || '';
      nlTitle = 'Website bouwen met AI: Hoe we schakel.ai zelf maakten';
      enTitle = 'Building a Website with AI: How we made schakel.ai';
      nlExcerpt = 'Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding.';
      enExcerpt = 'Built our website with AI without a programmer. The complete story about vibecoding.';
      nlMetaDesc = 'Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt.';
      enMetaDesc = 'Built our website with AI without a programmer. The complete story about vibecoding, tech stack choices, and what actually works.';
      nlCategory = 'AI Development';
      enCategory = 'AI Development';
      nlAuthorName = 'Rob van Zutphen';
      nlAuthorRole = 'Mede-oprichter Schakel';
      nlAuthorBio = 'Rob helpt bedrijven slimmer werken met AI.';
      enAuthorName = 'Rob van Zutphen';
      enAuthorRole = 'Co-founder Schakel';
      enAuthorBio = 'Rob helps companies work smarter with AI.';
      nlKeywords = ['website bouwen met AI', 'vibecoding', 'AI-first development'];
      enKeywords = ['building website with AI', 'vibecoding', 'AI-first development'];
    }
    
    posts.push({
      slug,
      publishDate: publishDates[i] || '2025-01-01',
      readingTime: readingTimes[i] || 10,
      ogImage: ogImages[i],
      translations: {
        nl: {
          title: nlTitle,
          excerpt: nlExcerpt,
          content: nlContent,
          metaDescription: nlMetaDesc,
          keywords: nlKeywords,
          category: nlCategory,
          author: { name: nlAuthorName, role: nlAuthorRole, bio: nlAuthorBio }
        },
        en: {
          title: enTitle,
          excerpt: enExcerpt,
          content: enContent,
          metaDescription: enMetaDesc,
          keywords: enKeywords,
          category: enCategory,
          author: { name: enAuthorName, role: enAuthorRole, bio: enAuthorBio }
        }
      }
    });
  }
  
  return posts;
}

async function main() {
  console.log('🚀 Starting blog pre-rendering...\n');
  
  const posts = await loadBlogPosts();
  console.log(`📚 Found ${posts.length} blog posts\n`);
  
  const outputDir = path.join(__dirname, '..', 'client', 'public', 'blog');
  
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  for (const post of posts) {
    for (const lang of languages) {
      const postDir = path.join(outputDir, post.slug);
      
      if (!fs.existsSync(postDir)) {
        fs.mkdirSync(postDir, { recursive: true });
      }
      
      const html = generateHTML(post, lang);
      
      if (lang === 'nl') {
        const filePath = path.join(postDir, 'index.html');
        fs.writeFileSync(filePath, html, 'utf-8');
        console.log(`✅ Generated: /blog/${post.slug}/index.html (${lang})`);
      }
      
      const langFilePath = path.join(postDir, `${lang}.html`);
      fs.writeFileSync(langFilePath, html, 'utf-8');
      console.log(`✅ Generated: /blog/${post.slug}/${lang}.html`);
    }
  }
  
  console.log('\n🎉 Blog pre-rendering complete!');
  console.log(`📁 Output directory: ${outputDir}`);
}

main().catch(console.error);
