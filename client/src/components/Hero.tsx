import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCTA } from '@/contexts/CTAContext';
import AutomationFlow from '@/components/AutomationFlow';

export default function Hero() {
  const { t } = useLanguage();
  const { isExpanded, openCTA } = useCTA();

  return (
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
              <AnimatePresence>
                {!isExpanded && (
                  <motion.button
                    layoutId="cta-card-hero"
                    onClick={() => openCTA('hero')}
                    initial={false}
                    style={{ borderRadius: '100px' }}
                    className="bg-primary text-primary-foreground text-sm px-6 py-2.5 font-medium flex items-center gap-2 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40"
                    data-testid="button-cta-primary"
                  >
                    {t.hero.ctaPrimary}
                    <ArrowRight className="h-4 w-4" />
                  </motion.button>
                )}
              </AnimatePresence>
              <Button
                size="default"
                variant="outline"
                onClick={() => console.log('Cases clicked')}
                className="text-sm px-6 transition-all duration-300"
                data-testid="button-cta-secondary"
              >
                <Play className="mr-2 h-4 w-4" />
                {t.hero.ctaSecondary}
              </Button>
            </div>

            {/* Trust line with alternating mint/purple circles */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => {
                  const isPurple = i % 2 === 0;
                  return (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-semibold transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: isPurple ? 'rgba(69, 33, 211, 0.15)' : 'rgba(110, 191, 170, 0.15)',
                        color: isPurple ? '#4521D3' : '#6EBFAA'
                      }}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  );
                })}
              </div>
              <span>{t.hero.trustLine}</span>
            </div>
          </div>

          {/* Right: Geanimeerde Automation Flow */}
          <div className="hidden md:flex items-center justify-center h-[500px]" data-testid="container-workflow-visualization">
            <AutomationFlow />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}
