import { useEffect, useState } from 'react';
import { useRoute, Link } from 'wouter';
import { Calendar, Clock, Share2, Home, BookOpen } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { getBlogPostBySlug } from '@shared/blog-data';
import { BlogSEO } from '@/components/BlogSEO';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NotFound from '@/pages/not-found';
import { trackEvent } from '@/lib/analytics';

export default function BlogPost() {
  const [, params] = useRoute('/blog/:slug');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('');
  const [tableOfContents, setTableOfContents] = useState<Array<{ id: string; title: string }>>([]);
  
  const post = params?.slug ? getBlogPostBySlug(params.slug) : undefined;

  // Extract table of contents from rendered DOM after markdown is processed
  useEffect(() => {
    // Wait for markdown to render
    const extractHeadings = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const headings = article.querySelectorAll('h2[id]');
      const toc: Array<{ id: string; title: string }> = [];

      headings.forEach((heading) => {
        const id = heading.getAttribute('id');
        const title = heading.textContent;
        if (id && title) {
          toc.push({ id, title });
        }
      });

      setTableOfContents(toc);
    };

    // Small delay to ensure markdown is fully rendered
    const timer = setTimeout(extractHeadings, 100);
    return () => clearTimeout(timer);
  }, [post]);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const article = document.querySelector('article');
      if (!article) return;

      const articleTop = article.offsetTop;
      const articleHeight = article.offsetHeight;
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;

      const progress = Math.min(
        100,
        Math.max(0, ((scrollTop - articleTop + windowHeight / 2) / articleHeight) * 100)
      );
      setScrollProgress(progress);

      // Update active section based on scroll position
      const headings = document.querySelectorAll('h2[id]');
      let currentSection = '';
      
      headings.forEach((heading) => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 150) {
          currentSection = heading.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Track page view
  useEffect(() => {
    if (post) {
      trackEvent('blog-post-view', { slug: post.slug, title: post.title });
    }
  }, [post]);

  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt,
          url: window.location.href,
        });
        trackEvent('blog-share', { slug: post.slug, method: 'native' });
      } catch (err) {
        console.log('Share cancelled');
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      trackEvent('blog-share', { slug: post?.slug || '', method: 'clipboard' });
    }
  };

  if (!post) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen bg-background">
      <BlogSEO post={post} url={`/blog/${post.slug}`} />
      <Header />

      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-primary z-50 transition-all duration-150"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28">
        <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground mb-8">
          <ol className="flex items-center gap-2">
            <li>
              <Link href="/" className="hover:text-foreground transition-colors flex items-center gap-1">
                <Home className="w-4 h-4" />
                Home
              </Link>
            </li>
            <span>/</span>
            <li>
              <Link href="/blog" className="hover:text-foreground transition-colors flex items-center gap-1">
                <BookOpen className="w-4 h-4" />
                Blog
              </Link>
            </li>
            <span>/</span>
            <li aria-current="page" className="text-foreground font-medium truncate max-w-[200px] md:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>
      </div>

      <main className="pb-20">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-[1fr_250px] gap-12">
            {/* Main Content */}
            <div>
              {/* Article Header */}
              <header className="mb-12">
                {post.category && (
                  <span className="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                    {post.category}
                  </span>
                )}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
                  {post.title}
                </h1>
                
                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <time dateTime={post.publishDate}>
                      {new Date(post.publishDate).toLocaleDateString('nl-NL', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readingTime} min leestijd</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleShare}
                    className="ml-auto"
                    data-testid="button-share"
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    Deel
                  </Button>
                </div>

                {/* Author */}
                <div className="flex items-center gap-3 py-4 border-y border-border">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-lg font-semibold text-primary">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">{post.author.role}</p>
                  </div>
                </div>
              </header>

              {/* Article Content */}
              <article 
                className="prose dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-h2:text-2xl prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-strong:text-foreground prose-code:text-foreground prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-pre:bg-muted prose-pre:border prose-pre:border-border prose-p:leading-relaxed prose-ul:my-4 prose-li:my-0"
                data-testid="article-content"
              >
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
                >
                  {post.content}
                </ReactMarkdown>
              </article>

              {/* Author Bio */}
              <div className="mt-16 p-8 rounded-lg border border-border bg-card">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-semibold text-primary">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-xl text-foreground mb-1">
                      {post.author.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {post.author.role}
                    </p>
                    <p className="text-muted-foreground leading-relaxed">
                      {post.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* CTA Section */}
              <div className="mt-16 p-8 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
                <h3 className="font-display font-bold text-2xl text-foreground mb-3">
                  Wil je ook AI-first bouwen?
                </h3>
                <p className="text-muted-foreground mb-6">
                  Bekijk onze aanpak of neem contact op voor een gesprek over jouw project.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/">
                    <Button size="lg" data-testid="button-cta-primary">
                      Bekijk onze aanpak
                    </Button>
                  </Link>
                  <Link href="/#contact">
                    <Button variant="outline" size="lg" data-testid="button-cta-contact">
                      Neem contact op
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            {/* Sidebar - Table of Contents (Desktop only) */}
            {tableOfContents.length > 0 && (
              <aside className="hidden lg:block">
                <div className="sticky top-24">
                  <h3 className="font-display font-bold text-sm text-foreground mb-4 uppercase tracking-wide">
                    Op deze pagina
                  </h3>
                  <nav>
                    <ul className="space-y-2 text-sm">
                      {tableOfContents.map((item) => (
                        <li key={item.id}>
                          <a
                            href={`#${item.id}`}
                            className={`block py-1 border-l-2 pl-3 transition-colors ${
                              activeSection === item.id
                                ? 'border-primary text-primary font-medium'
                                : 'border-border text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                            }`}
                            onClick={() => trackEvent('toc-click', { section: item.id })}
                          >
                            {item.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </aside>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
