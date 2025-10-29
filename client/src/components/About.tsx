import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Quote } from 'lucide-react';

export default function About() {
  const { t } = useLanguage();
  const [hoveredFounder, setHoveredFounder] = useState<string | null>(null);

  const founders = [
    {
      id: 'simon',
      data: t.about.simon,
      initial: 'S',
      quote: '"AI is een middel, geen doel. Pragmatisme wint."'
    },
    {
      id: 'rob',
      data: t.about.rob,
      initial: 'R',
      quote: '"Rust in je processen geeft ruimte voor groei."'
    }
  ];

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-16 text-center">
          {t.about.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {founders.map((founder) => (
            <Card
              key={founder.id}
              className="group relative overflow-hidden p-8 hover-elevate active-elevate-2 transition-all duration-300"
              onMouseEnter={() => setHoveredFounder(founder.id)}
              onMouseLeave={() => setHoveredFounder(null)}
              data-testid={`card-team-${founder.id}`}
            >
              {/* Mint accent rim light effect */}
              <div 
                className={`absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/5 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500`} 
              />
              
              <div className="relative z-10">
                {/* Avatar with mint rim */}
                <div className="mb-6 flex justify-center">
                  <div className="relative">
                    <Avatar className="w-32 h-32 border-4 border-primary/20 group-hover:border-primary/40 transition-colors">
                      <AvatarFallback className="bg-gradient-to-br from-primary/20 to-primary/10 text-primary text-4xl font-display font-bold">
                        {founder.initial}
                      </AvatarFallback>
                    </Avatar>
                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10" />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h3 className="text-2xl font-display font-bold text-foreground mb-2" data-testid={`text-name-${founder.id}`}>
                    {founder.data.name}
                  </h3>
                  <p className="text-base font-medium text-primary mb-1" data-testid={`text-role-${founder.id}`}>
                    {founder.data.role}
                  </p>
                </div>

                <div className="mb-6 pl-6 border-l-4 border-primary/40">
                  <p className="text-base text-foreground/80 leading-relaxed text-left" data-testid={`text-bio-${founder.id}`}>
                    {founder.data.bio}
                  </p>
                </div>

                {/* Quote reveal on hover */}
                <div 
                  className={`flex items-start gap-3 p-4 rounded-lg bg-primary/5 border-l-2 border-primary transition-all duration-300 ${
                    hoveredFounder === founder.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                  }`}
                >
                  <Quote className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <p className="text-sm italic text-foreground/70">{founder.quote}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
