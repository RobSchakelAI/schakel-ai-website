import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[90vh] flex items-center justify-center relative overflow-hidden">
      {/* Subtle geometric accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-20 md:py-32 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo mark above title */}
          <div className="mb-12 flex justify-center">
            <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                <path d="M24 12C18 12 12 16 12 22C12 28 18 30 24 32C30 34 36 36 36 42C36 48 30 52 24 52M24 12C30 12 36 16 36 22M24 52C18 52 12 48 12 42" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>

          <h1 className="text-hero-mobile md:text-hero font-display font-bold text-foreground mb-8">
            {t.hero.title}
          </h1>

          <div className="space-y-8 mb-12">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                {t.whyHowWhat.why.label}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t.whyHowWhat.why.text}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                {t.whyHowWhat.how.label}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t.whyHowWhat.how.text}
              </p>
            </div>

            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-3">
                {t.whyHowWhat.what.label}
              </h2>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {t.whyHowWhat.what.text}
              </p>
            </div>
          </div>

          <Button
            size="lg"
            onClick={scrollToContact}
            className="text-base px-8 min-h-12"
            data-testid="button-cta-hero"
          >
            {t.hero.cta}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
