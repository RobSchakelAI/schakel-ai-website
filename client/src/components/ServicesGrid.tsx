import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, Users, Share2, Target, GraduationCap } from 'lucide-react';

const iconMap = {
  MessageSquare,
  Users,
  Share2,
  Target,
  GraduationCap,
};

export default function ServicesGrid() {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t.services.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.services.subtitle}
          </p>
        </div>

        {/* Asymmetric Bento Grid - 3 different sizes, max 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-12 md:grid-rows-2 gap-6 md:gap-8">
          {t.services.items.map((service: any, index: number) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap];
            
            // 3 sizes: tall (4 cols x 2 rows), medium (5 cols), small (3 cols)
            let gridClass = 'md:col-span-4'; // default
            if (service.size === 'tall') {
              gridClass = 'md:col-span-4 md:row-span-2'; // left vertical tall block (1/3 width, 2 rows)
            } else if (service.size === 'medium') {
              gridClass = 'md:col-span-5'; // medium blocks (5/12 width)
            } else if (service.size === 'small') {
              gridClass = 'md:col-span-3'; // small blocks (3/12 = 1/4 width)
            }
            
            return (
              <Card 
                key={index}
                className={`group hover-elevate active-elevate-2 transition-all duration-300 ${gridClass}`}
                data-testid={`service-${index}`}
              >
                <CardContent className="p-6 md:p-8 space-y-4">
                  <div 
                    className="h-14 w-14 rounded-lg flex items-center justify-center"
                    style={{
                      backgroundColor: 'hsl(var(--primary) / 0.15)'
                    }}
                  >
                    <Icon className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
