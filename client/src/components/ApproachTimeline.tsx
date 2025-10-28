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

        {/* Desktop: Node flow diagram - horizontal zigzag */}
        <div className="hidden md:block max-w-6xl mx-auto relative">
          <div className="relative">
            {t.approach.steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const isUpper = index % 2 === 0;
              const rowPosition = index * 25; // Horizontal progression

              return (
                <div key={index} className="relative">
                  {/* Node positioned horizontally with zigzag */}
                  <div
                    className="absolute transition-all duration-500"
                    style={{
                      left: `${rowPosition}%`,
                      top: isUpper ? '0' : '200px',
                      width: '280px'
                    }}
                    data-testid={`step-${index}`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    {/* Node circle */}
                    <div className="flex justify-center mb-4">
                      <div className="relative">
                        <div
                          className={`w-20 h-20 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 ${
                            isActive
                              ? 'bg-primary border-primary shadow-lg shadow-primary/30 scale-110'
                              : isPast
                              ? 'border-primary bg-primary'
                              : 'bg-background border-border'
                          }`}
                        >
                          <span
                            className={`text-3xl font-display font-bold transition-colors ${
                              isActive || isPast ? 'text-white' : 'text-muted-foreground'
                            }`}
                          >
                            {step.number}
                          </span>
                        </div>
                        {isActive && (
                          <div className="absolute inset-0 rounded-full bg-primary opacity-20 blur-2xl animate-pulse" />
                        )}
                      </div>
                    </div>

                    {/* Content card */}
                    <div
                      className={`p-5 rounded-lg border-2 transition-all duration-500 ${
                        isActive
                          ? 'bg-card border-primary shadow-lg shadow-primary/10'
                          : 'bg-card/50 border-border/50'
                      }`}
                    >
                      <h3
                        className={`text-lg font-semibold mb-2 transition-colors ${
                          isActive ? 'text-primary' : 'text-foreground'
                        }`}
                      >
                        {step.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  {/* Connecting line to next node - smooth curve from circle to circle */}
                  {index < t.approach.steps.length - 1 && (
                    <svg
                      className="absolute pointer-events-none"
                      style={{
                        left: `${rowPosition + 7}%`,
                        top: isUpper ? '50px' : '10px',
                        width: '18%',
                        height: '200px'
                      }}
                    >
                      <defs>
                        <marker
                          id={`arrow-${index}`}
                          markerWidth="6"
                          markerHeight="6"
                          refX="5"
                          refY="3"
                          orient="auto"
                        >
                          <path
                            d="M 0 0 L 6 3 L 0 6 Z"
                            fill={isPast ? '#6EBFAA' : '#e4e4e7'}
                          />
                        </marker>
                      </defs>
                      
                      {/* Smooth curved line from circle to circle */}
                      <path
                        d={
                          isUpper
                            ? 'M 0 0 Q 50 50, 100 200'
                            : 'M 0 190 Q 50 140, 100 0'
                        }
                        stroke={isPast ? '#6EBFAA' : '#e4e4e7'}
                        strokeWidth="2"
                        strokeDasharray="6 4"
                        fill="none"
                        markerEnd={`url(#arrow-${index})`}
                        className="transition-all duration-500"
                      />
                      
                      {/* Connection dots along the curve */}
                      <circle
                        cx="33"
                        cy={isUpper ? '33' : '157'}
                        r="2.5"
                        fill={isPast ? '#6EBFAA' : '#d4d4d8'}
                        className="transition-all duration-500"
                      />
                      <circle
                        cx="66"
                        cy={isUpper ? '133' : '57'}
                        r="2.5"
                        fill={isPast ? '#6EBFAA' : '#d4d4d8'}
                        className="transition-all duration-500"
                      />
                    </svg>
                  )}
                </div>
              );
            })}
          </div>
          
          {/* Container height */}
          <div style={{ height: '480px' }} />
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
