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
    <section className="py-12 md:py-20 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t.approach.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.approach.subtitle}
          </p>
        </div>

        {/* Desktop: Node flow diagram - horizontal linear workflow */}
        <div className="hidden md:block max-w-6xl mx-auto relative">
          <div className="relative" style={{ height: '420px' }}>
            {/* SVG layer for all connecting lines - horizontal arrows */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }} viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <marker
                  id="arrow-active"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M 0 0 L 8 4 L 0 8 Z" fill="#2C9880" />
                </marker>
                <marker
                  id="arrow-inactive"
                  markerWidth="8"
                  markerHeight="8"
                  refX="6"
                  refY="4"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <path d="M 0 0 L 8 4 L 0 8 Z" fill="#e4e4e7" />
                </marker>
              </defs>

              {/* Connection from step 1 to step 2 */}
              <path
                d="M 13 30 L 29 30"
                stroke={activeStep >= 1 ? '#2C9880' : '#e4e4e7'}
                strokeWidth="0.5"
                strokeDasharray="1.5 1"
                fill="none"
                markerEnd={activeStep >= 1 ? 'url(#arrow-active)' : 'url(#arrow-inactive)'}
                vectorEffect="non-scaling-stroke"
              />

              {/* Connection from step 2 to step 3 */}
              <path
                d="M 38 30 L 54 30"
                stroke={activeStep >= 2 ? '#2C9880' : '#e4e4e7'}
                strokeWidth="0.5"
                strokeDasharray="1.5 1"
                fill="none"
                markerEnd={activeStep >= 2 ? 'url(#arrow-active)' : 'url(#arrow-inactive)'}
                vectorEffect="non-scaling-stroke"
              />

              {/* Connection from step 3 to step 4 */}
              <path
                d="M 63 30 L 79 30"
                stroke={activeStep >= 3 ? '#2C9880' : '#e4e4e7'}
                strokeWidth="0.5"
                strokeDasharray="1.5 1"
                fill="none"
                markerEnd={activeStep >= 3 ? 'url(#arrow-active)' : 'url(#arrow-inactive)'}
                vectorEffect="non-scaling-stroke"
              />
            </svg>

            {/* Step nodes - all at same vertical level */}
            {t.approach.steps.map((step, index) => {
              const isActive = index === activeStep;
              const isPast = index < activeStep;
              const leftPosition = 2 + index * 25;

              return (
                <div
                  key={index}
                  className="absolute flex flex-col items-center"
                  style={{
                    left: `${leftPosition}%`,
                    top: '80px',
                    width: '220px',
                    zIndex: 10
                  }}
                  data-testid={`step-${index}`}
                  onMouseEnter={() => setActiveStep(index)}
                >
                  {/* Node circle with logo color for active state */}
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div
                        className={`w-20 h-20 rounded-full border-[3px] flex items-center justify-center transition-all duration-500 ${
                          isActive
                            ? 'border-[#2C9880] shadow-lg shadow-[#2C9880]/40 scale-110'
                            : isPast
                            ? 'border-[#2C9880]'
                            : 'bg-background border-border'
                        }`}
                        style={isActive ? { backgroundColor: '#2C9880' } : isPast ? { backgroundColor: '#6EBFAA' } : undefined}
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
                        <div className="absolute inset-0 rounded-full opacity-30 blur-2xl animate-pulse" style={{ backgroundColor: '#2C9880' }} />
                      )}
                    </div>
                  </div>

                  {/* Content card - fixed height for consistency */}
                  <div
                    className={`p-5 rounded-lg border-2 transition-all duration-500 bg-card w-full ${
                      isActive
                        ? 'shadow-lg shadow-[#2C9880]/10'
                        : 'border-border/50'
                    }`}
                    style={{
                      ...(isActive ? { borderColor: '#2C9880' } : undefined),
                      minHeight: '140px',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <h3
                      className={`text-lg font-semibold mb-2 transition-colors`}
                      style={isActive ? { color: '#2C9880' } : undefined}
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

        {/* Mobile: Classic vertical timeline with CORAL active states */}
        <div className="md:hidden max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div 
              className="absolute left-8 w-0.5 bg-border z-0"
              style={{
                top: '3.5rem',
                height: 'calc(100% - 7rem)'
              }}
            />
            
            {/* Animated pulse line */}
            <div 
              className="absolute left-8 w-0.5 transition-all duration-1000 z-0"
              style={{
                top: '3.5rem',
                height: `${(activeStep / (t.approach.steps.length - 1)) * 100}%`,
                maxHeight: 'calc(100% - 7rem)',
                backgroundColor: '#2C9880'
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
                    {/* Circle node with CORAL for active */}
                    <div className="relative flex-shrink-0 z-10">
                      <div 
                        className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition-all duration-500 ${
                          isActive 
                            ? 'shadow-lg scale-110' 
                            : isPast
                            ? 'border-[#B8E5D9]'
                            : 'bg-background border-border'
                        }`}
                        style={
                          isActive 
                            ? { backgroundColor: '#2C9880', borderColor: '#2C9880', boxShadow: '0 10px 15px -3px rgba(44, 152, 128, 0.4)' }
                            : isPast 
                            ? { backgroundColor: '#E8F6F3' } 
                            : undefined
                        }
                      >
                        <span 
                          className={`text-2xl font-display font-bold transition-colors ${
                            isActive || isPast ? 'text-white' : 'text-muted-foreground'
                          }`}
                        >
                          {step.number}
                        </span>
                      </div>
                      
                      {isActive && (
                        <div className="absolute inset-0 rounded-full opacity-30 blur-xl animate-pulse" style={{ backgroundColor: '#2C9880' }} />
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
      </div>
    </section>
  );
}
