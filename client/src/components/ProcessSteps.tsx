import { useLanguage } from '@/contexts/LanguageContext';

export default function ProcessSteps() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t.process.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.process.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {t.process.steps.map((step: any, index: number) => (
            <div 
              key={index} 
              className="text-center space-y-6"
              data-testid={`process-step-${index}`}
            >
              <div className="h-20 w-20 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
