import { useLanguage } from '@/contexts/LanguageContext';
import { Clock, TrendingUp, Users, Zap } from 'lucide-react';

const iconMap = {
  Clock,
  TrendingUp,
  Users,
  Zap,
};

export default function Stats() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t.stats.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.stats.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {t.stats.items.map((stat: any, index: number) => {
            const Icon = iconMap[stat.icon as keyof typeof iconMap];
            return (
              <div key={index} className="text-center space-y-4" data-testid={`stat-${index}`}>
                <div 
                  className="h-16 w-16 rounded-full flex items-center justify-center mx-auto"
                  style={{
                    backgroundColor: 'hsl(var(--primary) / 0.15)'
                  }}
                >
                  <Icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-foreground">
                  {stat.value}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
