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

        {/* Desktop: Node flow diagram - horizontal with smart routing */}
        <div className="hidden md:block max-w-6xl mx-auto relative">
          <div className="relative" style={{ height: '500px' }}>
            {/* SVG layer for all connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }} viewBox="0 0 1000 500" preserveAspectRatio="none">
              <defs>
                <marker
                  id="arrow-active"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 Z" fill="#6EBFAA" />
                </marker>
                <marker
                  id="arrow-inactive"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                >
                  <path d="M 0 0 L 8 4 L 0 8 Z" fill="#e4e4e7" />
                </marker>
              </defs>

              {/* Connection from step 1 to step 2 */}
              <path
                d="M 160 100 L 210 100 L 210 300 L 290 300"
                stroke={activeStep >= 1 ? '#6EBFAA' : '#e4e4e7'}
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
                markerEnd={activeStep >= 1 ? 'url(#arrow-active)' : 'url(#arrow-inactive)'}
                vectorEffect="non-scaling-stroke"
              />

              {/* Connection from step 2 to step 3 */}
              <path
                d="M 410 300 L 460 300 L 460 100 L 540 100"
                stroke={activeStep >= 2 ? '#6EBFAA' : '#e4e4e7'}
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
                markerEnd={activeStep >= 2 ? 'url(#arrow-active)' : 'url(#arrow-inactive)'}
                vectorEffect="non-scaling-stroke"
              />

              {/* Connection from step 3 to step 4 */}
              <path
                d="M 660 100 L 710 100 L 710 300 L 790 300"
                stroke={activeStep >= 3 ? '#6EBFAA' : '#e4e4e7'}
                strokeWidth="2"
                strokeDasharray="6 4"
                fill="none"
                markerEnd={activeStep >= 3 ? 'url(#arrow-active)' : 'url(#arrow-inactive)'}
                vectorEffect="non-scaling-stroke"
              />

              {/* Decorative dots at corners */}
              <circle cx="210" cy="100" r="4" fill={activeStep >= 1 ? '#6EBFAA' : '#d4d4d8'} />
              <circle cx="210" cy="300" r="4" fill={activeStep >= 1 ? '#6EBFAA' : '#d4d4d8'} />
              
              <circle cx="460" cy="300" r="4" fill={activeStep >= 2 ? '#6EBFAA' : '#d4d4d8'} />
              <circle cx="460" cy="100" r="4" fill={activeStep >= 2 ? '#6EBFAA' : '#d4d4d8'} />
              
              <circle cx="710" cy="100" r="4" fill={activeStep >= 3 ? '#6EBFAA' : '#d4d4d8'} />
              <circle cx="710" cy="300" r="4" fill={activeStep >= 3 ? '#6EBFAA' : '#d4d4d8'} />
            </svg>

            {/* Step nodes */}
            {t.approach.steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const isUpper = index % 2 === 0;
              const leftPosition = 5 + index * 25; // 5%, 30%, 55%, 80%

              return (
                <div
                  key={index}
                  className="absolute"
                  style={{
                    left: `${leftPosition}%`,
                    top: isUpper ? '60px' : '240px',
                    width: '220px',
                    zIndex: 10
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
                            ? 'bg-primary border-primary'
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
                    className={`p-5 rounded-lg border-2 transition-all duration-500 bg-card ${
                      isActive
                        ? 'border-primary shadow-lg shadow-primary/10'
                        : 'border-border/50'
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
