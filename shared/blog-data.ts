import type { BlogPost } from './schema';
import { websiteBouwenMetAIContent } from './blog-content/website-bouwen-met-ai';

// Blog post data - add new posts here
export const blogPosts: BlogPost[] = [
  {
    slug: 'website-bouwen-met-ai',
    title: 'Website bouwen met AI: Hoe we schakel.ai zelf maakten',
    excerpt: 'Zonder programmeur onze website gebouwd met AI. Het complete verhaal over vibecoding, tech stack keuzes en wat echt werkt. AI-first development uitgelegd.',
    author: {
      name: 'Rob van Zutphen',
      role: 'Mede-oprichter Schakel',
      bio: 'Rob helpt bedrijven slimmer werken met AI. Achtergrond in finance en BI, nu gefocust op praktische AI-implementaties die écht rendement opleveren.'
    },
    publishDate: '2025-11-23',
    readingTime: 12,
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
    ogImage: '/images/blog/schakel-ai-website-hero.jpg',
    category: 'AI Development',
    content: websiteBouwenMetAIContent
  }
];

// Helper functions
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getAllBlogPosts(): BlogPost[] {
  return blogPosts.sort((a, b) => 
    new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );
}

export function getLatestBlogPost(): BlogPost | undefined {
  return getAllBlogPosts()[0];
}
