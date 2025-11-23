import type { BlogPost } from './schema';
import { websiteBouwenMetAIContent } from './blog-content/website-bouwen-met-ai';
import { websiteBouwenMetAIContentEN } from './blog-content/website-bouwen-met-ai-en';

// Blog post data - add new posts here
export const blogPosts: BlogPost[] = [
  {
    slug: 'website-bouwen-met-ai',
    publishDate: '2025-11-23',
    readingTime: 12,
    ogImage: '/images/blog/schakel-ai-website-hero.jpg',
    translations: {
      nl: {
        title: 'Website bouwen met AI: Hoe we schakel.ai zelf maakten',
        excerpt: 'Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt. AI-first development uitgelegd.',
        content: websiteBouwenMetAIContent,
        metaDescription: 'Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt. AI-first development uitgelegd.',
        keywords: [
          'website bouwen met AI',
          'AI-first development',
          'vibecoding',
          'Replit Agent',
          'gevibecode website',
          'website bouwen zonder programmeur',
          'React',
          'TypeScript',
          'Vercel',
          'Supabase'
        ],
        category: 'AI Development',
        author: {
          name: 'Rob van Zutphen',
          role: 'Mede-oprichter Schakel',
          bio: 'Rob helpt bedrijven slimmer werken met AI. Achtergrond in finance en BI, nu gefocust op praktische AI-implementaties die écht rendement opleveren.'
        }
      },
      en: {
        title: 'Building a Website with AI: How we made schakel.ai',
        excerpt: 'Built our website with AI without a programmer. The complete story about vibecoding, tech stack choices, and what actually works. AI-first development explained.',
        content: websiteBouwenMetAIContentEN,
        metaDescription: 'Built our website with AI without a programmer. The complete story about vibecoding, tech stack choices, and what actually works. AI-first development explained.',
        keywords: [
          'building website with AI',
          'AI-first development',
          'vibecoding',
          'Replit Agent',
          'vibecoded website',
          'building website without programmer',
          'React',
          'TypeScript',
          'Vercel',
          'Supabase'
        ],
        category: 'AI Development',
        author: {
          name: 'Rob van Zutphen',
          role: 'Co-founder Schakel',
          bio: 'Rob helps companies work smarter with AI. Background in finance and BI, now focused on practical AI implementations that truly deliver results.'
        }
      }
    }
  }
];

// Helper functions
type Language = 'nl' | 'en' | 'ai';

// Localized blog post type with flattened structure
export interface LocalizedBlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
  publishDate: string;
  readingTime: number;
  metaDescription: string;
  keywords: string[];
  ogImage?: string;
  category?: string;
}

export function getBlogPostBySlug(slug: string, language: Language = 'nl'): LocalizedBlogPost | undefined {
  const post = blogPosts.find(p => p.slug === slug);
  if (!post) return undefined;

  // Use NL as fallback if AI language is selected
  const lang = language === 'ai' ? 'nl' : language;
  const translation = post.translations[lang];

  return {
    slug: post.slug,
    publishDate: post.publishDate,
    readingTime: post.readingTime,
    ogImage: post.ogImage,
    ...translation
  };
}

export function getAllBlogPosts(language: Language = 'nl'): LocalizedBlogPost[] {
  // Use NL as fallback if AI language is selected
  const lang = language === 'ai' ? 'nl' : language;
  
  return blogPosts
    .map(post => ({
      slug: post.slug,
      publishDate: post.publishDate,
      readingTime: post.readingTime,
      ogImage: post.ogImage,
      ...post.translations[lang]
    }))
    .sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
}

export function getLatestBlogPost(language: Language = 'nl'): LocalizedBlogPost | undefined {
  return getAllBlogPosts(language)[0];
}
