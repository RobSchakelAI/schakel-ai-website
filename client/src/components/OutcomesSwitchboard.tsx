import { useLanguage } from '@/contexts/LanguageContext';
import { TrendingUp, Zap, Target } from 'lucide-react';
import { Card } from '@/components/ui/card';

const icons = [TrendingUp, Zap, Target];

export default function OutcomesSwitchboard() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            {t.outcomes.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.outcomes.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {t.outcomes.items.map((item, index) => {
            const Icon = icons[index];
            return (
              <Card
                key={index}
                className="group relative overflow-hidden p-8 hover-elevate active-elevate-2 cursor-pointer transition-all duration-300"
                data-testid={`card-outcome-${index}`}
              >
                {/* Connecting line accent */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary/0 via-primary to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  
                  <div className="text-5xl md:text-6xl font-display font-bold text-primary mb-3">
                    {item.metric}
                  </div>
                  
                  <h3 className="text-xl font-semibold text-foreground mb-3">
                    {item.label}
                  </h3>
                  
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {/* Circuit node decoration */}
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-primary/30 group-hover:scale-150 transition-transform duration-300" />
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
