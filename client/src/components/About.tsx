import { useLanguage } from '@/contexts/LanguageContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function About() {
  const { t } = useLanguage();

  return (
    <section id="about" className="py-20 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-16 text-center">
          {t.about.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
          {/* Rob */}
          <div className="text-center" data-testid="card-team-rob">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
                R
              </AvatarFallback>
            </Avatar>
            <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="text-name-rob">
              {t.about.rob.name}
            </h3>
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-role-rob">
              {t.about.rob.role}
            </p>
            <p className="text-base text-foreground/80 leading-relaxed" data-testid="text-bio-rob">
              {t.about.rob.bio}
            </p>
          </div>

          {/* Simon */}
          <div className="text-center" data-testid="card-team-simon">
            <Avatar className="w-32 h-32 mx-auto mb-6 border-4 border-primary/20">
              <AvatarFallback className="bg-primary/10 text-primary text-3xl font-semibold">
                S
              </AvatarFallback>
            </Avatar>
            <h3 className="text-2xl font-semibold text-foreground mb-2" data-testid="text-name-simon">
              {t.about.simon.name}
            </h3>
            <p className="text-lg text-muted-foreground mb-4" data-testid="text-role-simon">
              {t.about.simon.role}
            </p>
            <p className="text-base text-foreground/80 leading-relaxed" data-testid="text-bio-simon">
              {t.about.simon.bio}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
