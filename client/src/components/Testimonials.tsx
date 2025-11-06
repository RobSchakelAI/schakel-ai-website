import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';

export default function Testimonials() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            {t.testimonials.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.testimonials.items.map((testimonial: any, index: number) => (
            <Card 
              key={index} 
              className="hover-elevate active-elevate-2 transition-all duration-300"
              data-testid={`testimonial-${index}`}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex text-yellow-500">
                  {'★'.repeat(5)}
                </div>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div className="pt-4 border-t border-border">
                  <p className="font-semibold text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
