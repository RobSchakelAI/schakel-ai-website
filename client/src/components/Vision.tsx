import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles } from 'lucide-react';

export default function Vision() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background to-muted/30">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground">
            {t.vision.title}
          </h2>
        </div>

        {/* Vision content - authentic and energetic */}
        <div className="space-y-8">
          {t.vision.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-lg md:text-xl text-foreground/90 leading-relaxed text-center"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.15}s both`
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Subtle connecting line decoration */}
        <div className="mt-16 flex items-center justify-center gap-2">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-primary/50" />
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-primary/50" />
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
