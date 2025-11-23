import { Link } from 'wouter';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { getLatestBlogPost } from '@shared/blog-data';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function BlogTeaser() {
  const { t, language } = useLanguage();
  const latestPost = getLatestBlogPost(language);

  if (!latestPost) {
    return null; // Don't show section if no posts
  }

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="blog">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
              {t.blog.latestTitle}
            </h2>
            <p className="text-muted-foreground">
              {t.blog.latestSubtitle}
            </p>
          </div>
          <Link href="/blog">
            <Button variant="ghost" className="hidden md:flex items-center gap-2" data-testid="link-view-all-posts">
              {t.blog.allPosts}
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Latest Blog Post Card */}
        <Link href={`/blog/${latestPost.slug}`}>
          <article 
            className="group block rounded-lg border border-border bg-card p-8 md:p-10 hover-elevate active-elevate-2 transition-all"
            data-testid="card-latest-blog-post"
          >
            {/* Category & Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm text-muted-foreground">
              {latestPost.category && (
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-medium">
                  {latestPost.category}
                </span>
              )}
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <time dateTime={latestPost.publishDate}>
                  {new Date(latestPost.publishDate).toLocaleDateString('nl-NL', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>{latestPost.readingTime} {t.blog.readingTime}</span>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
              {latestPost.title}
            </h3>

            {/* Excerpt */}
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              {latestPost.excerpt}
            </p>

            {/* Read More */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-primary font-medium group-hover:gap-3 transition-all">
                <span>{t.blog.readMore}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
              
              {/* Author */}
              <div className="hidden md:flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-primary">
                    {latestPost.author.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{latestPost.author.name}</p>
                  <p className="text-xs text-muted-foreground">{latestPost.author.role}</p>
                </div>
              </div>
            </div>
          </article>
        </Link>

        {/* Mobile View All Link */}
        <Link href="/blog">
          <Button variant="ghost" className="md:hidden mt-6 w-full" data-testid="link-view-all-posts-mobile">
            {t.blog.allPosts}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
