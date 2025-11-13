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

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/20">
                📍 Rotterdam, Nederland
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-primary/5 text-primary border border-primary/20">
                ⚡ Resultaat binnen 30 dagen
              </span>
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
