import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import robotAgent from '@assets/generated_images/Cute_AI_robot_agent_e0f4bb1e.png';
import purpleAssistant from '@assets/generated_images/Small_purple_AI_assistant_8ae37291.png';
import dataBot from '@assets/generated_images/Mint_data_processing_bot_e6069727.png';

export default function Hero() {
  const { t } = useLanguage();
  const [nodeAnimation, setNodeAnimation] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setNodeAnimation(prev => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-[95vh] flex items-center justify-center relative overflow-hidden bg-background">
      {/* Subtle purple to mint gradient overlay */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          background: 'linear-gradient(135deg, rgba(75, 55, 189, 0.5) 0%, rgba(110, 191, 170, 0.5) 100%)'
        }}
      />

      {/* Animated connection nodes - subtle circuit board aesthetic */}
      <div className="absolute inset-0 overflow-hidden opacity-30">
        <svg className="absolute top-1/4 right-1/4 w-96 h-96" viewBox="0 0 400 400">
          <circle 
            cx="50" cy="50" r="4" 
            fill="#6EBFAA"
            className={`transition-all duration-1000 ${nodeAnimation === 0 ? 'opacity-100 scale-150' : 'opacity-40'}`}
          />
          <circle 
            cx="200" cy="100" r="4" 
            fill="#6EBFAA"
            className={`transition-all duration-1000 ${nodeAnimation === 1 ? 'opacity-100 scale-150' : 'opacity-40'}`}
          />
          <circle 
            cx="350" cy="150" r="4" 
            fill="#6EBFAA"
            className={`transition-all duration-1000 ${nodeAnimation === 2 ? 'opacity-100 scale-150' : 'opacity-40'}`}
          />
          <line x1="50" y1="50" x2="200" y2="100" stroke="#6EBFAA" strokeWidth="1" opacity="0.3" />
          <line x1="200" y1="100" x2="350" y2="150" stroke="#6EBFAA" strokeWidth="1" opacity="0.3" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="text-center md:text-left">
            {/* Pre-title with mint accent */}
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-full border border-primary/20 bg-primary/5">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-foreground">{t.hero.preTitle}</span>
            </div>

            {/* Main headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-6 leading-[1.05] tracking-tight">
              {t.hero.title}
            </h1>

            {/* Value proposition - clear and powerful */}
            <p className="text-base md:text-lg text-foreground/90 mb-10 leading-relaxed">
              {t.hero.description}
            </p>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4 mb-12">
              <Button
                size="lg"
                onClick={scrollToContact}
                className="text-base px-8 min-h-12 shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all"
                data-testid="button-cta-primary"
              >
                {t.hero.ctaPrimary}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => console.log('Cases clicked')}
                className="text-base px-8 min-h-12 transition-all duration-300"
                data-testid="button-cta-secondary"
              >
                <Play className="mr-2 h-4 w-4" />
                {t.hero.ctaSecondary}
              </Button>
            </div>

            {/* Trust line with alternating mint/purple circles */}
            <div className="flex items-center justify-center md:justify-start gap-3 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => {
                  const isPurple = i % 2 === 0;
                  return (
                    <div 
                      key={i}
                      className="w-8 h-8 rounded-full border-2 border-background flex items-center justify-center text-xs font-semibold transition-all duration-300 hover:scale-110"
                      style={{
                        backgroundColor: isPurple ? 'rgba(75, 55, 189, 0.15)' : 'rgba(110, 191, 170, 0.15)',
                        color: isPurple ? '#4b37bd' : '#6EBFAA'
                      }}
                    >
                      {String.fromCharCode(64 + i)}
                    </div>
                  );
                })}
              </div>
              <span>{t.hero.trustLine}</span>
            </div>
          </div>

          {/* Right: AI Workflow Visualization */}
          <div className="relative hidden md:block">
            <div className="relative w-full h-[600px]" data-testid="container-workflow-visualization">
              <svg
                viewBox="0 0 500 600"
                className="w-full h-full"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Define gradients */}
                <defs>
                  <linearGradient id="mintGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6EBFAA" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#6EBFAA" stopOpacity="0.4" />
                  </linearGradient>
                  <linearGradient id="purpleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgb(69, 33, 211)" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="rgb(69, 33, 211)" stopOpacity="0.4" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>

                {/* Connecting lines (animated) - more connections */}
                <line x1="120" y1="120" x2="250" y2="180" stroke="#6EBFAA" strokeWidth="3" opacity="0.5" strokeDasharray="8,8">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2s" repeatCount="indefinite" />
                </line>
                <line x1="250" y1="180" x2="380" y2="140" stroke="rgb(69, 33, 211)" strokeWidth="3" opacity="0.5" strokeDasharray="8,8">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.5s" repeatCount="indefinite" />
                </line>
                <line x1="250" y1="180" x2="250" y2="300" stroke="#6EBFAA" strokeWidth="3" opacity="0.5" strokeDasharray="8,8">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="3s" repeatCount="indefinite" />
                </line>
                <line x1="120" y1="400" x2="250" y2="300" stroke="rgb(69, 33, 211)" strokeWidth="3" opacity="0.5" strokeDasharray="8,8">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.2s" repeatCount="indefinite" />
                </line>
                <line x1="380" y1="400" x2="250" y2="300" stroke="#6EBFAA" strokeWidth="3" opacity="0.5" strokeDasharray="8,8">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="2.8s" repeatCount="indefinite" />
                </line>
                <line x1="250" y1="300" x2="250" y2="480" stroke="rgb(69, 33, 211)" strokeWidth="3" opacity="0.5" strokeDasharray="8,8">
                  <animate attributeName="stroke-dashoffset" from="0" to="16" dur="3.5s" repeatCount="indefinite" />
                </line>

                {/* Abstract data node - top left */}
                <g filter="url(#glow)">
                  <rect x="90" y="90" width="60" height="60" rx="12" fill="url(#mintGradient)" stroke="#6EBFAA" strokeWidth="3">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" />
                  </rect>
                </g>

                {/* Abstract processing node - top right */}
                <g filter="url(#glow)">
                  <rect x="350" y="110" width="60" height="60" rx="12" fill="url(#purpleGradient)" stroke="rgb(69, 33, 211)" strokeWidth="3">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3.5s" repeatCount="indefinite" />
                  </rect>
                </g>

                {/* Abstract node - bottom left */}
                <g filter="url(#glow)">
                  <circle cx="120" cy="400" r="35" fill="url(#mintGradient)" stroke="#6EBFAA" strokeWidth="3">
                    <animate attributeName="r" values="35;40;35" dur="2.8s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Abstract node - bottom right */}
                <g filter="url(#glow)">
                  <circle cx="380" cy="400" r="35" fill="url(#purpleGradient)" stroke="rgb(69, 33, 211)" strokeWidth="3">
                    <animate attributeName="r" values="35;40;35" dur="3.2s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Central Hub (bigger) */}
                <g filter="url(#glow)">
                  <circle cx="250" cy="300" r="45" fill="url(#mintGradient)" stroke="#6EBFAA" strokeWidth="3">
                    <animate attributeName="r" values="45;50;45" dur="3s" repeatCount="indefinite" />
                  </circle>
                </g>

                {/* Output node - bottom center */}
                <g filter="url(#glow)">
                  <rect x="220" y="450" width="60" height="60" rx="12" fill="url(#purpleGradient)" stroke="rgb(69, 33, 211)" strokeWidth="3">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3.8s" repeatCount="indefinite" />
                  </rect>
                </g>
              </svg>

              {/* AI Robot Agents overlaid on nodes */}
              <img 
                src={robotAgent}
                alt="AI Robot Agent"
                className="absolute w-24 h-24 object-contain"
                style={{ 
                  top: '25%', 
                  left: '45%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'float 3s ease-in-out infinite'
                }}
              />
              <img 
                src={purpleAssistant}
                alt="AI Assistant"
                className="absolute w-20 h-20 object-contain"
                style={{ 
                  top: '15%', 
                  left: '72%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'float 3.5s ease-in-out infinite'
                }}
              />
              <img 
                src={dataBot}
                alt="Data Processing Bot"
                className="absolute w-20 h-20 object-contain"
                style={{ 
                  top: '78%', 
                  left: '48%',
                  transform: 'translate(-50%, -50%)',
                  animation: 'float 2.8s ease-in-out infinite'
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2">
          <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
        </div>
      </div>
    </section>
  );
}
