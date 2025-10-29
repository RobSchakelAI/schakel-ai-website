import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

export default function Vision() {
  const { t } = useLanguage();

  // Helper function to highlight "AI First" and other key terms in mint
  const highlightKeywords = (text: string) => {
    const keywords = ["'AI First'", "AI First", "skills ontwikkelen", "futureproof"];
    let highlighted = text;
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'gi');
      highlighted = highlighted.replace(regex, '<span class="text-primary font-semibold">$1</span>');
    });
    
    return highlighted;
  };

  return (
    <section id="vision" className="py-20 md:py-32 bg-[#0A0A0A] relative overflow-hidden">
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgb(110, 191, 170) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Subtle glow effect top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center ring-2 ring-primary/30">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            {t.vision.title}
          </h2>
        </div>

        {/* Vision content - with mint left borders and highlighted keywords */}
        <div className="space-y-10">
          {t.vision.content.map((paragraph, index) => (
            <div
              key={index}
              className="relative pl-8 border-l-4 border-primary/60"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              <p
                className="text-lg md:text-xl text-white/90 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: highlightKeywords(paragraph) }}
              />
            </div>
          ))}
        </div>

        {/* Connecting line decoration - now white/mint */}
        <div className="mt-20 flex items-center justify-center gap-2">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-primary/60" />
          <div className="w-3 h-3 rounded-full bg-primary shadow-lg shadow-primary/50 animate-pulse" />
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-primary/60" />
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
