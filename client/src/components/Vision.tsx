import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

export default function Vision() {
  const { t } = useLanguage();

  return (
    <section id="vision" className="py-12 md:py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #6EBFAA 0%, #2C9880 100%)'
    }}>
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Subtle glow effect top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-white/10 blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 md:px-12 relative z-10">
        {/* Section header */}
        <div className="flex items-center justify-center gap-3 mb-16">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center ring-2 ring-white/30">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white">
            {t.vision.title}
          </h2>
        </div>

        {/* Vision content - with white left borders */}
        <div className="space-y-10">
          {t.vision.content.map((paragraph, index) => (
            <div
              key={index}
              className="relative pl-8 border-l-4 border-white/70"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              <p className="text-base md:text-lg text-white leading-relaxed">
                {paragraph}
              </p>
            </div>
          ))}
        </div>

        {/* Connecting line decoration */}
        <div className="mt-20 flex items-center justify-center gap-2">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-white/60" />
          <div className="w-3 h-3 rounded-full bg-white shadow-lg shadow-white/50 animate-pulse" />
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-white/60" />
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
