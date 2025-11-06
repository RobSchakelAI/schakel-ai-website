import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle, X } from 'lucide-react';

export default function ProblemSolution() {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground">
              {t.problemSolution.problemTitle}
            </h2>
            <div className="space-y-4">
              {t.problemSolution.problems.map((problem: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <X className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {problem}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground">
              {t.problemSolution.solutionTitle}
            </h3>
            <div className="space-y-4">
              {t.problemSolution.solutions.map((solution: string, index: number) => (
                <div key={index} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    {solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
