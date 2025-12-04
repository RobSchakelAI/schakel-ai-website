import { Helmet } from 'react-helmet-async';
import { ExternalLink, Calendar, FileText, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';

interface Tool {
  id: string;
  icon: typeof Calendar;
  url: string;
  status: 'active' | 'coming-soon';
}

const tools: Tool[] = [
  {
    id: 'map',
    icon: Calendar,
    url: 'https://map.schakel.ai',
    status: 'active',
  },
];

export default function Tools() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t.tools.pageTitle} | Schakel AI</title>
        <meta name="description" content={t.tools.pageDescription} />
        <link rel="canonical" href="https://www.schakel.ai/tools" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.schakel.ai/tools" />
        <meta property="og:title" content={`${t.tools.pageTitle} | Schakel AI`} />
        <meta property="og:description" content={t.tools.pageDescription} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${t.tools.pageTitle} | Schakel AI`} />
        <meta name="twitter:description" content={t.tools.pageDescription} />
      </Helmet>

      <Header />

      <main className="pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <div className="mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Zap className="w-4 h-4" />
              {t.tools.badge}
            </div>
            <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
              {t.tools.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              {t.tools.subtitle}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {tools.map((tool) => {
              const IconComponent = tool.icon;
              const toolTranslation = t.tools.items[tool.id as keyof typeof t.tools.items];
              
              return (
                <Card
                  key={tool.id}
                  className="group p-6 hover-elevate active-elevate-2 transition-all"
                  data-testid={`card-tool-${tool.id}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 rounded-lg bg-primary/10 text-primary">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-display font-bold text-foreground mb-2">
                        {toolTranslation.name}
                      </h2>
                      <p className="text-muted-foreground text-sm mb-4">
                        {toolTranslation.description}
                      </p>
                      
                      {tool.status === 'active' ? (
                        <Button
                          asChild
                          variant="default"
                          size="sm"
                          className="gap-2"
                        >
                          <a 
                            href={tool.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            data-testid={`button-open-${tool.id}`}
                          >
                            {t.tools.openTool}
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        </Button>
                      ) : (
                        <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
                          <FileText className="w-4 h-4" />
                          {t.tools.comingSoon}
                        </span>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {tools.length === 1 && (
            <div className="mt-12 p-6 rounded-lg border border-dashed border-border bg-muted/30 text-center">
              <p className="text-muted-foreground">
                {t.tools.moreToolsSoon}
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
