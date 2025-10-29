import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  const [nodeAnimation, setNodeAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodeAnimation(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[95vh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Subtle purple to mint gradient overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'linear-gradient(135deg, rgba(75, 55, 189, 0.5) 0%, rgba(110, 191, 170, 0.5) 100%)'
        }}
      />

      {/* Animated connection nodes - subtle circuit board aesthetic */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg className="absolute top-1/4 right-1/4 w-96 h-96" viewBox="0 0 400 400">
          <circle 
            cx="50" cy="50" r="4" 
            fill="#6EBFAA"
            className={`transition-all duration-1000 ${nodeAnimation === 0 ? 'opacity-100 scale-150' : 'opacity-40'}`}
          />
          <circle 
            cx="200" cy="100" r="4" 
            fill="#6EBFAA"
            className={`transition-all duration-1000 ${nodeAnimation === 1 ? 'opacity-100 scale-150' : 'opacity-40'}`}
          />
          <circle 
            cx="350" cy="150" r="4" 
            fill="#6EBFAA"
            className={`transition-all duration-1000 ${nodeAnimation === 2 ? 'opacity-100 scale-150' : 'opacity-40'}`}
          />
          <line x1="50" y1="50" x2="200" y2="100" stroke="#6EBFAA" strokeWidth="1" opacity="0.3" />
          <line x1="200" y1="100" x2="350" y2="150" stroke="#6EBFAA" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Pre-title with mint accent */}
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-medium text-foreground">{t.hero.preTitle}</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-foreground mb-8 leading-[1.05] tracking-tight">
            {t.hero.title}
          </h1>

          {/* Value proposition - clear and powerful */}
          <p className="text-lg md:text-xl text-foreground/90 max-w-4xl mx-auto mb-12 leading-relaxed">
            {t.hero.description}
          </p>

          {/* Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <Button
              size="lg"
              onClick={scrollToContact}
              className="text-base px-8 min-h-12 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all"
              data-testid="button-cta-primary"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => console.log('Cases clicked')}
              className="text-base px-8 min-h-12 transition-all duration-300"
              data-testid="button-cta-secondary"
            >
              <Play className="mr-2 h-4 w-4" />
              {t.hero.ctaSecondary}
            </Button>
          </div>

          {/* Trust line with alternating mint/purple circles */}
          <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => {
                const isPurple = i % 2 === 0; // Even numbers get purple
                return (
                  <div 
                    key={i}
                    className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-semibold transition-all duration-300 hover:scale-110"
                    style={{
                      backgroundColor: isPurple ? 'rgba(75, 55, 189, 0.15)' : 'rgba(110, 191, 170, 0.15)',
                      color: isPurple ? '#4b37bd' : '#6EBFAA'
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
