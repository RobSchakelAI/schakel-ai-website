import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AutomationFlow from '@/components/AutomationFlow';
import { CTAOverlay } from '@/components/ExpandingCTA';
import { useCTA } from '@/contexts/CTAContext';
import { trackEvent } from '@/lib/analytics';

export default function Hero() {
  const { t } = useLanguage();
  const { isExpanded, openCTA } = useCTA();
  
  const isPreview = import.meta.env.VITE_API_URL?.includes('staging');

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-background pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Subtle purple to mint gradient overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'linear-gradient(135deg, rgba(69, 33, 211, 0.5) 0%, rgba(110, 191, 170, 0.5) 100%)'
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Content */}
          <div className="text-center md:text-left">
            {/* DEV ENVIRONMENT TEST BADGE - Only shows on Preview/Staging */}
            {isPreview && (
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-2 rounded-full border border-green-500/30 bg-green-500/10">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">🧪 Staging Environment</span>
              </div>
            )}

            {/* Pre-title with mint accent */}
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">{t.hero.preTitle}</span>
            </div>

            {/* Main headline */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4 leading-[1.1] tracking-tight">
              {t.hero.title}
            </h1>

            {/* Value proposition - clear and powerful */}
            <div className="mb-6 space-y-4">
              {t.hero.description.split('\n\n').map((paragraph, index) => (
                <p key={index} className="text-sm md:text-base text-foreground/90 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-3 mb-6">
              <AnimatePresence initial={false}>
                {!isExpanded && (
                  <motion.div className="inline-block relative">
                    <motion.div
                      style={{ borderRadius: '100px' }}
                      layout
                      layoutId="cta-card-hero"
                      className="absolute inset-0 bg-primary items-center justify-center transform-gpu will-change-transform"
                    />
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      layout={false}
                      onClick={() => {
                        openCTA('hero');
                        trackEvent('cta-click', { location: 'hero' });
                      }}
                      className="text-sm px-6 py-2.5 font-medium text-primary-foreground relative flex items-center gap-2"
                      data-testid="button-cta-primary"
                    >
                      {t.hero.ctaPrimary}
                      <ArrowRight className="h-4 w-4" />
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
              <Button
                size="default"
                variant="outline"
                onClick={() => scrollToSection('services')}
                className="text-sm px-6 transition-all duration-300"
                data-testid="button-cta-secondary"
              >
                <Play className="mr-2 h-4 w-4" />
                {t.hero.ctaSecondary}
              </Button>
            </div>

            {/* Trust badge with star rating */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground">
              {/* Stars */}
              <div className="flex gap-0.5">
                <svg className="w-0 h-0">
                  <defs>
                    <linearGradient id="partialFill">
                      <stop offset="55%" stopColor="#FFD700" />
                      <stop offset="55%" stopColor="#E5E7EB" />
                    </linearGradient>
                  </defs>
                </svg>
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="w-5 h-5"
                    viewBox="0 0 20 20"
                    fill={i === 5 ? "url(#partialFill)" : "#FFD700"}
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              {/* Rating text */}
              <span>{t.hero.trustLine} <span className="font-bold text-foreground">{t.hero.rating}</span></span>
            </div>
          </div>

          {/* Right: Geanimeerde Automation Flow */}
          <div className="hidden md:flex items-center justify-center h-[500px]" data-testid="container-workflow-visualization">
            <AutomationFlow />
          </div>
        </div>
      </div>
    </section>
    <CTAOverlay />
    </>
  );
}
