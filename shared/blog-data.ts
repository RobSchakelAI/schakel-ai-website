import type { BlogPost } from './schema';
import { websiteBouwenMetAIContent } from './blog-content/website-bouwen-met-ai';
import { websiteBouwenMetAIContentEN } from './blog-content/website-bouwen-met-ai-en';
import { meetingAutomationCenterContent } from './blog-content/meeting-automation-center';
import { meetingAutomationCenterContentEN } from './blog-content/meeting-automation-center-en';
import { eindeVanDeTussenlaagContent } from './blog-content/einde-van-de-tussenlaag';
import { eindeVanDeTussenlaagContentEN } from './blog-content/einde-van-de-tussenlaag-en';
import { waaromStructuurContent } from './blog-content/waarom-structuur-belangrijker-is-dan-technologie';
import { waaromStructuurContentEN } from './blog-content/waarom-structuur-belangrijker-is-dan-technologie-en';

// Blog post data - add new posts here
export const blogPosts: BlogPost[] = [
  {
    slug: 'waarom-structuur-belangrijker-is-dan-technologie',
    publishDate: '2025-12-11',
    readingTime: 5,
    ogImage: '/images/blog/waarom-structuur-belangrijker-is-dan-technologie.jpg',
    translations: {
      nl: {
        title: 'Waarom structuur belangrijker is dan technologie',
        excerpt: 'Meer dan 80% van AI-projecten faalt. Niet door technologie, maar door gebrek aan structuur. Ontdek waarom tooling nooit het probleem is en hoe je wél resultaat behaalt met AI.',
        content: waaromStructuurContent,
        metaDescription: 'Meer dan 80% van AI-projecten faalt. Niet door technologie, maar door gebrek aan structuur. Ontdek waarom tooling nooit het probleem is en hoe je wél resultaat behaalt met AI.',
        keywords: [
          'AI implementatie',
          'AI projecten falen',
          'structuur voor AI',
          'AI strategie',
          'procesoptimalisatie',
          'AI ROI',
          'Quick Wins AI',
          'organisatiestructuur',
          'AI adoptie',
          'verbetercyclus'
        ],
        category: 'AI Strategy',
        author: {
          name: 'Simon Voorbergen',
          role: 'Mede-oprichter Schakel',
          bio: 'Simon helpt bedrijven hun processen te optimaliseren voor AI-succes. 11 jaar ervaring in business transformatie, gefocust op rust, ritme en rendement.'
        }
      },
      en: {
        title: 'Why structure matters more than technology',
        excerpt: 'Over 80% of AI projects fail. Not because of technology, but due to lack of structure. Discover why tooling is never the problem and how to actually achieve results with AI.',
        content: waaromStructuurContentEN,
        metaDescription: 'Over 80% of AI projects fail. Not because of technology, but due to lack of structure. Discover why tooling is never the problem and how to actually achieve results with AI.',
        keywords: [
          'AI implementation',
          'AI projects fail',
          'structure for AI',
          'AI strategy',
          'process optimization',
          'AI ROI',
          'Quick Wins AI',
          'organizational structure',
          'AI adoption',
          'improvement cycle'
        ],
        category: 'AI Strategy',
        author: {
          name: 'Simon Voorbergen',
          role: 'Co-founder Schakel',
          bio: 'Simon helps companies optimize their processes for AI success. 11 years of business transformation experience, focused on calm, rhythm, and results.'
        }
      }
    }
  },
  {
    slug: 'niet-meer-bouwen-met-low-code',
    publishDate: '2025-12-08',
    readingTime: 4,
    ogImage: '/images/blog/niet-meer-bouwen-met-low-code.jpg',
    translations: {
      nl: {
        title: 'Waarom wij niet meer bouwen met low-code (en jij misschien ook niet)',
        excerpt: 'Low-code was jarenlang de brug tussen business en IT. Maar in het AI-tijdperk wordt vibecoding de nieuwe standaard. Meer controle, meer flexibiliteit, meer eigenaarschap.',
        content: eindeVanDeTussenlaagContent,
        metaDescription: 'Waarom Schakel AI kiest voor vibecoding in plaats van low-code. AI-assisted development biedt meer controle, flexibiliteit en eigenaarschap over je software.',
        keywords: [
          'vibecoding',
          'low-code vs vibecoding',
          'AI-assisted development',
          'Replit',
          'Lovable',
          'Cursor',
          'no-code alternatief',
          'software eigenaarschap',
          'AI coding',
          'full-code development'
        ],
        category: 'AI Development',
        author: {
          name: 'Rob van Zutphen',
          role: 'Mede-oprichter Schakel',
          bio: 'Rob helpt bedrijven slimmer werken met AI. Achtergrond in finance en BI, nu gefocust op praktische AI-implementaties die echt rendement opleveren.'
        }
      },
      en: {
        title: 'Why we no longer build with low-code (and maybe you shouldn\'t either)',
        excerpt: 'Low-code was the bridge between business and IT for years. But in the AI era, vibecoding becomes the new standard. More control, more flexibility, more ownership.',
        content: eindeVanDeTussenlaagContentEN,
        metaDescription: 'Why Schakel AI chooses vibecoding over low-code. AI-assisted development offers more control, flexibility, and ownership over your software.',
        keywords: [
          'vibecoding',
          'low-code vs vibecoding',
          'AI-assisted development',
          'Replit',
          'Lovable',
          'Cursor',
          'no-code alternative',
          'software ownership',
          'AI coding',
          'full-code development'
        ],
        category: 'AI Development',
        author: {
          name: 'Rob van Zutphen',
          role: 'Co-founder Schakel',
          bio: 'Rob helps companies work smarter with AI. Background in finance and BI, now focused on practical AI implementations that truly deliver results.'
        }
      }
    }
  },
  {
    slug: 'meeting-automation-center',
    publishDate: '2025-11-30',
    readingTime: 8,
    ogImage: '/images/blog/meeting-automation-center.jpg',
    translations: {
      nl: {
        title: 'Van Transcriptie naar Automatische Workflow: Hoe Wij Meetings Opgelost Hebben',
        excerpt: 'Tools transcriberen prima, maar het administratieve werk blijft hangen. Wij bouwden een systeem dat alles automatisch regelt: van meeting tot notulen in SharePoint en taken in Productive.io.',
        content: meetingAutomationCenterContent,
        metaDescription: 'Hoe wij een Meeting Automation Center bouwden dat transcripties automatisch omzet naar notulen, SharePoint uploads, Outlook mails en taken in Productive.io.',
        keywords: [
          'meeting automatisering',
          'AI notulen',
          'Fireflies.ai',
          'Claude AI',
          'workflow automatisering',
          'SharePoint integratie',
          'Productive.io',
          'transcriptie naar taken',
          'meeting notes automation',
          'AI workflow'
        ],
        category: 'AI Automation',
        author: {
          name: 'Rob van Zutphen',
          role: 'Mede-oprichter Schakel',
          bio: 'Rob helpt bedrijven slimmer werken met AI. Achtergrond in finance en BI, nu gefocust op praktische AI-implementaties die écht rendement opleveren.'
        }
      },
      en: {
        title: 'From Transcription to Automatic Workflow: How We Solved Meetings',
        excerpt: 'Tools transcribe just fine, but the administrative work gets stuck. We built a system that handles everything automatically: from meeting to notes in SharePoint and tasks in Productive.io.',
        content: meetingAutomationCenterContentEN,
        metaDescription: 'How we built a Meeting Automation Center that automatically converts transcriptions into meeting notes, SharePoint uploads, Outlook emails, and tasks in Productive.io.',
        keywords: [
          'meeting automation',
          'AI meeting notes',
          'Fireflies.ai',
          'Claude AI',
          'workflow automation',
          'SharePoint integration',
          'Productive.io',
          'transcription to tasks',
          'meeting notes automation',
          'AI workflow'
        ],
        category: 'AI Automation',
        author: {
          name: 'Rob van Zutphen',
          role: 'Co-founder Schakel',
          bio: 'Rob helps companies work smarter with AI. Background in finance and BI, now focused on practical AI implementations that truly deliver results.'
        }
      }
    }
  },
  {
    slug: 'website-bouwen-met-ai',
    publishDate: '2025-11-23',
    readingTime: 8,
    ogImage: '/images/blog/website-bouwen-met-ai.jpg',
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
