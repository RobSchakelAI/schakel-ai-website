import { useState, useEffect, useRef } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ApproachTimeline() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t.approach.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.approach.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto" ref={timelineRef}>
          <div className="relative">
            {/* Vertical circuit line - main connection */}
            <div className="absolute left-8 md:left-12 top-16 bottom-16 w-0.5 bg-border z-0" />
            
            {/* Animated pulse line that follows activeStep */}
            <div 
              className="absolute left-8 md:left-12 top-16 w-0.5 bg-gradient-to-b from-primary via-primary to-transparent transition-all duration-1000 z-0"
              style={{
                height: `${(activeStep + 1) * 25}%`
              }}
            />

            <div className="space-y-12 md:space-y-16">
              {t.approach.steps.map((step, index) => {
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                
                return (
                  <div
                    key={index}
                    className="relative flex gap-6 md:gap-12 items-start group"
                    data-testid={`step-${index}`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Step number circuit node */}
                    <div className="relative flex-shrink-0 z-10">
                      <div 
                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? 'bg-primary border-primary shadow-lg shadow-primary/40 scale-110' 
                            : isPast
                            ? 'bg-primary border-primary'
                            : 'bg-background border-border'
                        }`}
                      >
                        <span 
                          className={`text-2xl md:text-3xl font-display font-bold transition-colors ${
                            isActive || isPast ? 'text-white' : 'text-muted-foreground'
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>
                      
                      {/* Glow effect for active step */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-primary opacity-30 blur-xl animate-pulse" />
                      )}
                      
                      {/* Connection nodes - circuit board aesthetic */}
                      {index < t.approach.steps.length - 1 && (
                        <>
                          <div 
                            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full transition-all duration-500 ${
                              isPast ? 'bg-primary' : 'bg-border'
                            }`}
                            style={{ top: '100%', marginTop: '1.5rem' }}
                          />
                          <div 
                            className={`absolute left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full transition-all duration-500 ${
                              isPast ? 'bg-primary/60' : 'bg-border/60'
                            }`}
                            style={{ top: '100%', marginTop: '3rem' }}
                          />
                        </>
                      )}
                    </div>

                    {/* Content card */}
                    <div 
                      className={`flex-1 pt-3 transition-all duration-500 ${
                        isActive ? 'translate-x-2' : ''
                      }`}
                    >
                      <div 
                        className={`p-6 md:p-8 rounded-lg border transition-all duration-500 ${
                          isActive 
                            ? 'bg-card border-primary/40 shadow-lg shadow-primary/10' 
                            : 'bg-card/50 border-border'
                        }`}
                      >
                        <h3 
                          className={`text-xl md:text-2xl font-semibold mb-3 transition-colors ${
                            isActive ? 'text-primary' : 'text-foreground'
                          }`}
                        >
                          {step.title}
                        </h3>
                        <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
                        
                        {/* Circuit line decoration on active card */}
                        {isActive && (
                          <div className="mt-4 flex items-center gap-2">
                            <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                            <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Circuit board decoration at bottom */}
        <div className="mt-16 flex items-center justify-center gap-3">
          <div className="w-2 h-2 rounded-full bg-primary/40" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-primary/40 via-primary/20 to-transparent" />
          <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
          <div className="w-16 h-0.5 bg-gradient-to-l from-primary/40 via-primary/20 to-transparent" />
          <div className="w-2 h-2 rounded-full bg-primary/40" />
        </div>
      </div>
    </section>
  );
}
