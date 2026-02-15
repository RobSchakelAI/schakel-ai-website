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

const DIST_DIR = path.join(__dirname, '..', 'dist', 'public');

function extractAssetTags(indexHtml: string): { scripts: string; styles: string; analytics: string } {
  // Hardened regexes: match script/link tags more robustly with flexible attribute ordering
  const scriptMatches = indexHtml.match(/<script(?:\s+[a-z-]+=(?:"[^"]*"|'[^']*'|\S+))*?\s+type="module"\s+[^>]*src="\/assets\/[^"]*"[^>]*><\/script>/gi) || 
                        indexHtml.match(/<script(?:\s+[a-z-]+=(?:"[^"]*"|'[^']*'|\S+))*?\s+src="\/assets\/[^"]*"[^>]*type="module"[^>]*><\/script>/gi) || [];
  
  const styleMatches = indexHtml.match(/<link(?:\s+[a-z-]+=(?:"[^"]*"|'[^']*'|\S+))*?\s+rel="stylesheet"\s+[^>]*href="\/assets\/[^"]*"[^>]*>/gi) || 
                       indexHtml.match(/<link(?:\s+[a-z-]+=(?:"[^"]*"|'[^']*'|\S+))*?\s+href="\/assets\/[^"]*"[^>]*rel="stylesheet"[^>]*>/gi) || [];
  
  const analyticsMatch = indexHtml.match(/<script(?:\s+[a-z-]+=(?:"[^"]*"|'[^']*'|\S+))*?\s+src="https:\/\/cloud\.umami\.is\/[^"]*"[^>]*(?:async|defer)?[^>]*><\/script>/gi) || [];

  return {
    scripts: scriptMatches.join('\n  '),
    styles: styleMatches.join('\n  '),
    analytics: analyticsMatch.join('\n  ')
  };
}

function generateArticleSchema(post: BlogPost, lang: 'nl' | 'en'): string {
  const t = post.translations[lang];
  const datePublished = new Date(post.publishDate).toISOString();
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": t.title,
    "description": t.metaDescription,
    "author": { "@type": "Person", "name": t.author.name, "jobTitle": t.author.role },
    "publisher": {
      "@type": "Organization",
      "name": "Schakel AI B.V.",
      "logo": { "@type": "ImageObject", "url": "https://www.schakel.ai/logo.png" }
    },
    "datePublished": datePublished,
    "dateModified": datePublished,
    "mainEntityOfPage": { "@type": "WebPage", "@id": `https://www.schakel.ai/blog/${post.slug}` },
    "image": post.ogImage ? `https://www.schakel.ai${post.ogImage}` : "https://www.schakel.ai/logo.png",
    "articleSection": t.category || "AI",
    "keywords": t.keywords.join(", "),
    "wordCount": t.content.split(/\s+/).length,
    "inLanguage": lang === 'nl' ? 'nl-NL' : 'en-US'
  }, null, 2);
}

function generateBreadcrumbSchema(post: BlogPost, lang: 'nl' | 'en'): string {
  const t = post.translations[lang];
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.schakel.ai/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://www.schakel.ai/blog" },
      { "@type": "ListItem", "position": 3, "name": t.title, "item": `https://www.schakel.ai/blog/${post.slug}` }
    ]
  }, null, 2);
}

function generateBlogPostPage(post: BlogPost, lang: 'nl' | 'en', assets: { scripts: string; styles: string; analytics: string }): string {
  const t = post.translations[lang];
  const htmlContent = marked.parse(t.content) as string;
  const canonicalUrl = `https://www.schakel.ai/blog/${post.slug}${lang === 'en' ? '?lang=en' : ''}`;
  const formattedDate = new Date(post.publishDate).toLocaleDateString(
    lang === 'nl' ? 'nl-NL' : 'en-US',
    { year: 'numeric', month: 'long', day: 'numeric' }
  );

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

  <title>${t.title} | Schakel AI Blog</title>
  <meta name="title" content="${t.title} | Schakel AI Blog" />
  <meta name="description" content="${t.metaDescription}" />
  <meta name="author" content="${t.author.name}" />
  <meta name="keywords" content="${t.keywords.join(', ')}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

  <link rel="canonical" href="${canonicalUrl}" />
  <link rel="alternate" hreflang="nl" href="https://www.schakel.ai/blog/${post.slug}" />
  <link rel="alternate" hreflang="en" href="https://www.schakel.ai/blog/${post.slug}?lang=en" />
  <link rel="alternate" hreflang="x-default" href="https://www.schakel.ai/blog/${post.slug}" />

  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonicalUrl}" />
  <meta property="og:title" content="${t.title}" />
  <meta property="og:description" content="${t.metaDescription}" />
  <meta property="og:image" content="${post.ogImage ? `https://www.schakel.ai${post.ogImage}` : 'https://www.schakel.ai/logo.png'}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_US'}" />
  <meta property="og:site_name" content="Schakel AI" />
  <meta property="article:published_time" content="${new Date(post.publishDate).toISOString()}" />
  <meta property="article:author" content="${t.author.name}" />
  <meta property="article:section" content="${t.category || 'AI'}" />
  ${t.keywords.map(k => `<meta property="article:tag" content="${k}" />`).join('\n  ')}

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content="${canonicalUrl}" />
  <meta name="twitter:title" content="${t.title}" />
  <meta name="twitter:description" content="${t.metaDescription}" />
  <meta name="twitter:image" content="${post.ogImage ? `https://www.schakel.ai${post.ogImage}` : 'https://www.schakel.ai/logo.png'}" />

  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/favicon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <script type="application/ld+json">
  ${generateArticleSchema(post, lang)}
  </script>
  <script type="application/ld+json">
  ${generateBreadcrumbSchema(post, lang)}
  </script>

  ${assets.styles}
  ${assets.analytics}
</head>
<body>
  <div id="root">
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.7; color: #1a1a1a;">
      <nav style="margin-bottom: 32px;">
        <a href="/" style="color: #6EBFAA; text-decoration: none; font-weight: 500;">Schakel AI</a>
        <span style="color: #999; margin: 0 8px;">/</span>
        <a href="/blog" style="color: #6EBFAA; text-decoration: none;">Blog</a>
      </nav>
      <header style="margin-bottom: 40px; border-bottom: 1px solid #e5e5e5; padding-bottom: 30px;">
        ${t.category ? `<span style="display: inline-block; background: rgba(110, 191, 170, 0.1); color: #6EBFAA; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 500; margin-bottom: 16px;">${t.category}</span>` : ''}
        <h1 style="font-family: 'DM Sans', sans-serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 16px; line-height: 1.2;">${t.title}</h1>
        <div style="color: #666; font-size: 0.9rem; margin-bottom: 16px;">
          <span style="margin-right: 16px;">${formattedDate}</span>
          <span>${post.readingTime} ${lang === 'nl' ? 'min leestijd' : 'min read'}</span>
        </div>
        <div style="display: flex; align-items: center; gap: 12px; margin-top: 20px;">
          <div style="width: 48px; height: 48px; border-radius: 50%; background: #6EBFAA; display: flex; align-items: center; justify-content: center; color: white; font-weight: 600;">${t.author.name.split(' ').map(n => n[0]).join('')}</div>
          <div>
            <div style="font-weight: 600;">${t.author.name}</div>
            <div style="color: #666; font-size: 0.9rem;">${t.author.role}</div>
          </div>
        </div>
      </header>
      <article style="font-size: 1.05rem;">
        ${htmlContent}
      </article>
      <footer style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #e5e5e5; text-align: center; color: #666;">
        <p><strong>Schakel AI B.V.</strong></p>
        <p>${lang === 'nl' ? 'AI-oplossingen die direct tijd en geld opleveren' : 'AI solutions that directly save time and money'}</p>
        <p><a href="https://www.schakel.ai" style="color: #6EBFAA;">www.schakel.ai</a> | <a href="mailto:info@schakel.ai" style="color: #6EBFAA;">info@schakel.ai</a></p>
      </footer>
    </div>
  </div>
  ${assets.scripts}
</body>
</html>`;
}

function generateBlogIndexPage(posts: BlogPost[], lang: 'nl' | 'en', assets: { scripts: string; styles: string; analytics: string }): string {
  const title = lang === 'nl' ? 'Blog | Schakel AI' : 'Blog | Schakel AI';
  const description = lang === 'nl'
    ? 'Artikelen over AI-implementatie, procesautomatisering en de toekomst van werk. Praktische inzichten van Schakel AI.'
    : 'Articles about AI implementation, process automation and the future of work. Practical insights from Schakel AI.';

  const postListHtml = posts.map(post => {
    const t = post.translations[lang];
    const formattedDate = new Date(post.publishDate).toLocaleDateString(
      lang === 'nl' ? 'nl-NL' : 'en-US',
      { year: 'numeric', month: 'long', day: 'numeric' }
    );
    return `
      <article style="margin-bottom: 40px; padding-bottom: 40px; border-bottom: 1px solid #e5e5e5;">
        ${t.category ? `<span style="display: inline-block; background: rgba(110, 191, 170, 0.1); color: #6EBFAA; padding: 2px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 500; margin-bottom: 12px;">${t.category}</span>` : ''}
        <h2 style="font-family: 'DM Sans', sans-serif; font-size: 1.75rem; font-weight: 700; margin-bottom: 12px; line-height: 1.3;">
          <a href="/blog/${post.slug}" style="color: #1a1a1a; text-decoration: none;">${t.title}</a>
        </h2>
        <p style="color: #555; margin-bottom: 12px; line-height: 1.6;">${t.excerpt}</p>
        <div style="color: #999; font-size: 0.85rem;">
          <span>${t.author.name}</span>
          <span style="margin: 0 8px;">|</span>
          <span>${formattedDate}</span>
          <span style="margin: 0 8px;">|</span>
          <span>${post.readingTime} ${lang === 'nl' ? 'min leestijd' : 'min read'}</span>
        </div>
      </article>`;
  }).join('\n');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />

  <title>${title}</title>
  <meta name="title" content="${title}" />
  <meta name="description" content="${description}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />

  <link rel="canonical" href="https://www.schakel.ai/blog${lang === 'en' ? '?lang=en' : ''}" />
  <link rel="alternate" hreflang="nl" href="https://www.schakel.ai/blog" />
  <link rel="alternate" hreflang="en" href="https://www.schakel.ai/blog?lang=en" />
  <link rel="alternate" hreflang="x-default" href="https://www.schakel.ai/blog" />

  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://www.schakel.ai/blog" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="https://www.schakel.ai/logo.png" />
  <meta property="og:locale" content="${lang === 'nl' ? 'nl_NL' : 'en_US'}" />
  <meta property="og:site_name" content="Schakel AI" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="https://www.schakel.ai/logo.png" />

  <link rel="icon" type="image/png" sizes="32x32" href="/favicon.png" />
  <link rel="apple-touch-icon" href="/favicon.png" />

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">

  <script type="application/ld+json">
  ${JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Schakel AI Blog",
    "description": description,
    "url": "https://www.schakel.ai/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Schakel AI B.V.",
      "logo": { "@type": "ImageObject", "url": "https://www.schakel.ai/logo.png" }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.translations[lang].title,
      "description": post.translations[lang].metaDescription,
      "datePublished": new Date(post.publishDate).toISOString(),
      "author": { "@type": "Person", "name": post.translations[lang].author.name },
      "url": `https://www.schakel.ai/blog/${post.slug}`
    }))
  }, null, 2)}
  </script>

  ${assets.styles}
  ${assets.analytics}
</head>
<body>
  <div id="root">
    <div style="font-family: Inter, system-ui, sans-serif; max-width: 800px; margin: 0 auto; padding: 40px 20px; line-height: 1.7; color: #1a1a1a;">
      <nav style="margin-bottom: 32px;">
        <a href="/" style="color: #6EBFAA; text-decoration: none; font-weight: 500;">Schakel AI</a>
        <span style="color: #999; margin: 0 8px;">/</span>
        <span>Blog</span>
      </nav>
      <header style="margin-bottom: 48px;">
        <h1 style="font-family: 'DM Sans', sans-serif; font-size: 2.5rem; font-weight: 700; margin-bottom: 16px;">Blog</h1>
        <p style="color: #666; font-size: 1.1rem;">${lang === 'nl' ? 'Inzichten over AI, automatisering en de toekomst van werk.' : 'Insights about AI, automation and the future of work.'}</p>
      </header>
      <main>
        ${postListHtml}
      </main>
      <footer style="margin-top: 60px; padding-top: 30px; border-top: 1px solid #e5e5e5; text-align: center; color: #666;">
        <p><strong>Schakel AI B.V.</strong></p>
        <p><a href="https://www.schakel.ai" style="color: #6EBFAA;">www.schakel.ai</a> | <a href="mailto:info@schakel.ai" style="color: #6EBFAA;">info@schakel.ai</a></p>
      </footer>
    </div>
  </div>
  ${assets.scripts}
</body>
</html>`;
}

async function main() {
  console.log('🚀 Starting SEO page generation (post-build)...\n');

  const indexHtmlPath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/public/index.html not found. Run vite build first.');
    process.exit(1);
  }

  const indexHtml = fs.readFileSync(indexHtmlPath, 'utf-8');
  const assets = extractAssetTags(indexHtml);

  console.log('📦 Extracted asset tags from built index.html');
  console.log(`   Scripts: ${assets.scripts ? 'found' : 'none'}`);
  console.log(`   Styles: ${assets.styles ? 'found' : 'none'}`);
  console.log(`   Analytics: ${assets.analytics ? 'found' : 'none'}\n`);

  const blogDataModule = await import('../shared/blog-data.js');
  const posts: BlogPost[] = blogDataModule.blogPosts;
  console.log(`📚 Found ${posts.length} blog posts\n`);

  let generated = 0;

  for (const post of posts) {
    if (!post.translations.nl.content && !post.translations.en.content) {
      console.warn(`⚠️  Skipping ${post.slug} - no content`);
      continue;
    }

    const postDir = path.join(DIST_DIR, 'blog', post.slug);
    fs.mkdirSync(postDir, { recursive: true });

    const nlHtml = generateBlogPostPage(post, 'nl', assets);
    fs.writeFileSync(path.join(postDir, 'index.html'), nlHtml, 'utf-8');
    console.log(`✅ /blog/${post.slug}/index.html (nl)`);
    generated++;
  }

  const blogDir = path.join(DIST_DIR, 'blog');
  fs.mkdirSync(blogDir, { recursive: true });

  const blogIndexHtml = generateBlogIndexPage(posts, 'nl', assets);
  fs.writeFileSync(path.join(blogDir, 'index.html'), blogIndexHtml, 'utf-8');
  console.log(`✅ /blog/index.html (nl)`);
  generated++;

  console.log(`\n🎉 SEO page generation complete! Generated ${generated} pages.`);
  console.log('📁 Pages are in dist/public/ at actual URL paths.');
  console.log('🔍 Crawlers will now see full content + meta tags at real URLs.');
  console.log('🖥️  Users get static content first, then the SPA loads on top.\n');
}

main().catch(err => {
  console.error('❌ SEO page generation failed:', err);
  process.exit(1);
});
