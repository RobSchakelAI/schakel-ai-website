import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ApproachTimeline() {
  const { t } = useLanguage();
  const [activeStep, setActiveStep] = useState(0);

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

        {/* Desktop: Node flow diagram */}
        <div className="hidden md:block max-w-5xl mx-auto relative">
          <div className="space-y-0 relative">
            {t.approach.steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const isLeft = index % 2 === 0;

              return (
                <div key={index}>
                  <div
                    className={`flex items-center gap-8 ${
                      isLeft ? 'flex-row' : 'flex-row-reverse'
                    }`}
                    data-testid={`step-${index}`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Content card */}
                    <div className={`flex-1 ${isLeft ? 'text-right pr-4' : 'text-left pl-4'}`}>
                      <div
                        className={`p-6 md:p-8 rounded-lg border-2 transition-all duration-500 ${
                          isActive
                            ? 'bg-card border-primary shadow-lg shadow-primary/10'
                            : 'bg-card/50 border-border/50'
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
                      </div>
                    </div>

                    {/* Node circle - n8n/Zapier style */}
                    <div className="relative flex-shrink-0 z-10">
                      <div
                        className={`w-24 h-24 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'bg-primary border-primary shadow-lg shadow-primary/30 scale-110'
                            : isPast
                            ? 'border-primary bg-primary'
                            : 'bg-background border-border'
                        }`}
                      >
                        <span
                          className={`text-3xl md:text-4xl font-display font-bold transition-colors ${
                            isActive || isPast ? 'text-white' : 'text-muted-foreground'
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>

                      {/* Glow effect for active node */}
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-2xl animate-pulse" />
                      )}
                    </div>

                    {/* Spacer */}
                    <div className="flex-1" />
                  </div>

                  {/* Straight connecting line between nodes */}
                  {index < t.approach.steps.length - 1 && (
                    <div className="relative h-20 flex items-center justify-center">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        viewBox="0 0 100 100"
                        preserveAspectRatio="none"
                      >
                        {/* Straight line with dots */}
                        <line
                          x1="50"
                          y1="0"
                          x2="50"
                          y2="100"
                          stroke={isPast ? '#6EBFAA' : '#e4e4e7'}
                          strokeWidth="2"
                          strokeDasharray="4 4"
                          className="transition-all duration-500"
                        />
                        
                        {/* Connection dots */}
                        <circle
                          cx="50"
                          cy="30"
                          r="2"
                          fill={isPast ? '#6EBFAA' : '#d4d4d8'}
                          className="transition-all duration-500"
                        />
                        <circle
                          cx="50"
                          cy="70"
                          r="2"
                          fill={isPast ? '#6EBFAA' : '#d4d4d8'}
                          className="transition-all duration-500"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile: Classic vertical timeline (circles left, content right) */}
        <div className="md:hidden max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line - stops at last circle */}
            <div 
              className="absolute left-8 w-0.5 bg-border z-0"
              style={{
                top: '3.5rem',
                height: 'calc(100% - 7rem)'
              }}
            />
            
            {/* Animated pulse line */}
            <div 
              className="absolute left-8 w-0.5 bg-primary transition-all duration-1000 z-0"
              style={{
                top: '3.5rem',
                height: `${(activeStep / (t.approach.steps.length - 1)) * 100}%`,
                maxHeight: 'calc(100% - 7rem)'
              }}
            />

            <div className="space-y-12">
              {t.approach.steps.map((step, index) => {
                const isActive = index === activeStep;
                const isPast = index < activeStep;
                
                return (
                  <div
                    key={index}
                    className="relative flex gap-6 items-start"
                    data-testid={`step-mobile-${index}`}
                  >
                    {/* Circle node */}
                    <div className="relative flex-shrink-0 z-10">
                      <div 
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? 'bg-primary border-primary shadow-lg shadow-primary/40 scale-110' 
                            : isPast
                            ? 'border-[#B8E5D9]'
                            : 'bg-background border-border'
                        }`}
                        style={isPast ? { backgroundColor: '#E8F6F3' } : undefined}
                      >
                        <span 
                          className={`text-2xl font-display font-bold transition-colors ${
                            isActive ? 'text-white' : 'text-muted-foreground'
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>
                      
                      {isActive && (
                        <div className="absolute inset-0 rounded-full bg-primary opacity-30 blur-xl animate-pulse" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 pt-2">
                      <h3 className="text-xl font-semibold text-foreground mb-2">
                        {step.title}
                      </h3>
                      <p className="text-base text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
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
