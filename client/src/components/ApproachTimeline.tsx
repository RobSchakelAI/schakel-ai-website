import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRight } from 'lucide-react';

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
          <div className="space-y-8 md:space-y-16 relative">
            {t.approach.steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const isLeft = index % 2 === 0;

              return (
                <div key={index} className="relative">
                  <div
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
                    <div className="relative flex-shrink-0 z-10">
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
                    </div>

                    {/* Spacer to balance the layout */}
                    <div className="hidden md:block flex-1" />
                  </div>

                  {/* Curved connecting arrow between steps */}
                  {index < t.approach.steps.length - 1 && (
                    <div className="hidden md:block relative h-24 my-4">
                      <svg
                        className="absolute inset-0 w-full h-full"
                        preserveAspectRatio="none"
                        style={{ overflow: 'visible' }}
                      >
                        {/* Curved path - alternates left to right */}
                        <path
                          d={
                            isLeft
                              ? 'M 50% 0 Q 70% 50%, 50% 100'  // Curve from center to right then back to center
                              : 'M 50% 0 Q 30% 50%, 50% 100'  // Curve from center to left then back to center
                          }
                          stroke={isPast ? '#6EBFAA' : 'hsl(var(--border))'}
                          strokeWidth="3"
                          fill="none"
                          className="transition-all duration-500"
                          markerEnd={isPast ? 'url(#arrowhead-active)' : 'url(#arrowhead)'}
                        />
                      </svg>

                      {/* Connection dots along the curve */}
                      <div
                        className={`absolute w-2 h-2 rounded-full transition-all duration-500 ${
                          isPast ? 'bg-primary' : 'bg-border'
                        }`}
                        style={{
                          left: isLeft ? '60%' : '40%',
                          top: '50%',
                          transform: 'translate(-50%, -50%)',
                        }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Arrow markers for SVG paths */}
          <svg width="0" height="0" style={{ position: 'absolute' }}>
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--border))" />
              </marker>
              <marker
                id="arrowhead-active"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="#6EBFAA" />
              </marker>
            </defs>
          </svg>
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
