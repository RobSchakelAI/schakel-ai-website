import { Link } from 'wouter';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { getAllBlogPosts } from '@shared/blog-data';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Blog() {
  const { t, language } = useLanguage();
  const posts = getAllBlogPosts(language);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>Blog - AI Development & Vibecoding | Schakel</title>
        <meta name="description" content="Praktische verhalen over AI-first development, vibecoding en hoe we technologie inzetten om slimmer te bouwen. Inzichten van het Schakel team." />
        <link rel="canonical" href="https://www.schakel.ai/blog" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.schakel.ai/blog" />
        <meta property="og:title" content="Blog - AI Development & Vibecoding | Schakel" />
        <meta property="og:description" content="Praktische verhalen over AI-first development, vibecoding en hoe we technologie inzetten om slimmer te bouwen." />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Blog - AI Development & Vibecoding | Schakel" />
        <meta name="twitter:description" content="Praktische verhalen over AI-first development, vibecoding en hoe we technologie inzetten om slimmer te bouwen." />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {t.blog.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.blog.subtitle}
            </p>
          </div>

          {/* Blog Posts Grid */}
          <div className="space-y-8">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <article 
                  className="group block rounded-lg border border-border bg-card p-8 hover-elevate active-elevate-2 transition-all"
                  data-testid={`card-blog-${post.slug}`}
                >
                  {/* Category & Date */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                    {post.category && (
                      <span className="font-medium text-primary">
                        {post.category}
                      </span>
                    )}
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
                      <span>{post.readingTime} {t.blog.readingTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  {/* Read More Link */}
                  <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                    <span>{t.blog.readFurther}</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>

                  {/* Author */}
                  <div className="mt-6 pt-6 border-t border-border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {post.author.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">{post.author.name}</p>
                        <p className="text-xs text-muted-foreground">{post.author.role}</p>
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          {/* Empty State (if no posts) */}
          {posts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg">
                {t.blog.noPosts}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
