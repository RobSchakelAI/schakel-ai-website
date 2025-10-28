import { useLanguage } from '@/contexts/LanguageContext';
import { Check } from 'lucide-react';

export default function ApproachTimeline() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t.approach.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.approach.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical connection line */}
            <div className="absolute left-8 md:left-16 top-12 bottom-12 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary hidden md:block" />

            <div className="space-y-12">
              {t.approach.steps.map((step, index) => (
                <div
                  key={index}
                  className="relative flex gap-6 md:gap-8 items-start group"
                  data-testid={`step-${index}`}
                >
                  {/* Step number node */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-primary/20">
                      <span className="text-2xl md:text-3xl font-display font-bold text-white">
                        {step.number}
                      </span>
                    </div>
                    {/* Connection pulse effect */}
                    <div className="absolute inset-0 rounded-full bg-primary opacity-0 group-hover:opacity-20 group-hover:scale-150 transition-all duration-500" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-2">
                    <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Checkmark indicator */}
                  <div className="hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors flex-shrink-0 mt-3">
                    <Check className="w-5 h-5 text-primary" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
