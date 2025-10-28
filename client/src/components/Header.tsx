import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover-elevate active-elevate-2 rounded-md"
          data-testid="link-home"
        >
          <img src="/logo.svg" alt="Schakel AI" className="h-10" />
        </button>

        <nav className="flex items-center gap-8">
          <button
            onClick={() => scrollToSection('about')}
            className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md"
            data-testid="link-about"
          >
            {t.nav.about}
          </button>
          <button
            onClick={() => scrollToSection('contact')}
            className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md"
            data-testid="link-contact"
          >
            {t.nav.contact}
          </button>
          <div className="flex items-center gap-1 ml-4">
            <Button
              variant={language === 'nl' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('nl')}
              className="text-xs h-8 px-3"
              data-testid="button-lang-nl"
            >
              NL
            </Button>
            <Button
              variant={language === 'en' ? 'secondary' : 'ghost'}
              size="sm"
              onClick={() => setLanguage('en')}
              className="text-xs h-8 px-3"
              data-testid="button-lang-en"
            >
              EN
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
