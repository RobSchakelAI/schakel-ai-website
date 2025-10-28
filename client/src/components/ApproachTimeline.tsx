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

        <div className="max-w-5xl mx-auto relative">
          {/* S-curve connecting line - SVG path */}
          <svg 
            className="absolute inset-0 w-full h-full pointer-events-none hidden md:block" 
            style={{ zIndex: 0 }}
            preserveAspectRatio="none"
          >
            <path
              d="M 15% 12% Q 40% 12%, 85% 30% Q 60% 45%, 15% 55% Q 40% 70%, 85% 88%"
              stroke="hsl(var(--border))"
              strokeWidth="2"
              fill="none"
              opacity="0.3"
            />
            {/* Animated pulse along the path */}
            <path
              d="M 15% 12% Q 40% 12%, 85% 30% Q 60% 45%, 15% 55% Q 40% 70%, 85% 88%"
              stroke="#6EBFAA"
              strokeWidth="2"
              fill="none"
              strokeDasharray="1000"
              strokeDashoffset={1000 - (activeStep + 1) * 250}
              className="transition-all duration-1000"
              opacity="0.6"
            />
          </svg>

          <div className="space-y-20 md:space-y-24 relative z-10">
            {t.approach.steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={index}
                  className={`flex flex-col md:flex-row items-center gap-6 ${
                    isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                  data-testid={`step-${index}`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Content card */}
                  <div className={`flex-1 ${isLeft ? 'md:text-right' : 'md:text-left'}`}>
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
                        <div className={`mt-4 flex items-center gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                          <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Step number circuit node */}
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-20 h-20 md:w-24 md:h-24 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                        isActive
                          ? 'bg-primary border-primary shadow-lg shadow-primary/40 scale-110'
                          : isPast
                          ? 'border-[#B8E5D9]'
                          : 'bg-background border-border'
                      }`}
                      style={isPast ? { backgroundColor: '#E8F6F3' } : undefined}
                    >
                      <span
                        className={`text-3xl md:text-4xl font-display font-bold transition-colors ${
                          isActive ? 'text-white' : 'text-muted-foreground'
                        }`}
                      >
                        {step.number}
                      </span>
                    </div>

                    {/* Glow effect for active step */}
                    {isActive && (
                      <div className="absolute inset-0 rounded-full bg-primary opacity-30 blur-xl animate-pulse" />
                    )}

                    {/* Small connection nodes */}
                    {index < t.approach.steps.length - 1 && (
                      <div className="hidden md:block">
                        <div
                          className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
                            isPast ? 'bg-primary' : 'bg-border'
                          }`}
                          style={
                            isLeft
                              ? { right: '-40%', top: '120%' }
                              : { left: '-40%', top: '120%' }
                          }
                        />
                      </div>
                    )}
                  </div>

                  {/* Spacer to balance the layout */}
                  <div className="hidden md:block flex-1" />
                </div>
              );
            })}
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
