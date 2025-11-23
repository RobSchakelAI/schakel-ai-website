import { Helmet } from 'react-helmet-async';
import type { BlogPost } from '@shared/schema';

interface BlogSEOProps {
  post: BlogPost;
  url: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export function BlogSEO({ post, url }: BlogSEOProps) {
  const fullUrl = `https://www.schakel.ai${url}`;
  const ogImage = post.ogImage 
    ? `https://www.schakel.ai${post.ogImage}`
    : 'https://www.schakel.ai/logo.png';

  // FAQ items from the blog post
  const faqItems: FAQItem[] = [
    {
      question: "Kan je zonder programmeur een professionele website bouwen met AI?",
      answer: "Ja. Wij deden het. Met moderne AI-tools kun je als niet-programmeur een professionele website bouwen. Je hebt geen code-ervaring nodig, maar wel logisch denkvermogen en begrip van systemen."
    },
    {
      question: "Heb je programmeerervaring nodig om met AI een website te bouwen?",
      answer: "Nee, geen programmeerervaring maar wel logisch denkvermogen. Je moet systemen kunnen begrijpen en AI kritisch kunnen gebruiken, niet klakkeloos volgen."
    },
    {
      question: "Welke AI tools zijn het beste voor website development?",
      answer: "Wij werkten vooral met Replit Agent 3, ChatGPT, en Claude. Daarnaast gebruikten we Codex voor code reviews. De combinatie van meerdere tools werkt beter dan één tool alleen."
    },
    {
      question: "Hoeveel tijd kost het om een website te bouwen met AI?",
      answer: "Dat hangt af van complexiteit. Voor een eenvoudige site: 1 of 2 dagen. Voor onze site met custom animaties en een boodschap die echt goed moest zijn: een klein weekje, waarbij iteratie en verfijning het meeste tijd kostten."
    },
    {
      question: "Is een AI-gebouwde website even goed als een handmatig gecodeerde?",
      answer: "Als je AI goed gebruikt, zelf kwaliteit bewaakt en de code laat reviewen: ja. Maar het kan ook heel snel spaghetti worden. Dat heb je zelf in de hand."
    }
  ];

  // BlogPosting Schema
  const blogPostingSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription,
    "image": ogImage,
    "author": {
      "@type": "Person",
      "name": post.author.name,
      "jobTitle": post.author.role,
      "description": post.author.bio
    },
    "publisher": {
      "@type": "Organization",
      "name": "Schakel",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.schakel.ai/logo.png"
      }
    },
    "datePublished": post.publishDate,
    "dateModified": post.publishDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": fullUrl
    }
  };

  // FAQPage Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.schakel.ai"
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
        "name": post.title,
        "item": fullUrl
      }
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{post.title} | Schakel</title>
      <meta name="title" content={`${post.title} | Schakel`} />
      <meta name="description" content={post.metaDescription} />
      <meta name="author" content={post.author.name} />
      <meta name="keywords" content={post.keywords.join(', ')} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={post.title} />
      <meta property="og:description" content={post.metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Schakel" />
      <meta property="article:published_time" content={post.publishDate} />
      <meta property="article:author" content={post.author.name} />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={post.title} />
      <meta name="twitter:description" content={post.metaDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify(blogPostingSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
}
