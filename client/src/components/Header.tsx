import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';

export default function Header() {
  const { language, setLanguage, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setMobileMenuOpen(false); // Close mobile menu after navigation
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="hover-elevate active-elevate-2 rounded-md transition-transform hover:scale-105"
          data-testid="link-home"
        >
          <Logo className="h-16" />
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection('vision')}
            className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md"
            data-testid="link-vision"
          >
            {t.nav.vision}
          </button>
          <button
            onClick={() => scrollToSection('approach')}
            className="text-sm font-medium text-foreground hover-elevate active-elevate-2 px-3 py-2 rounded-md"
            data-testid="link-approach"
          >
            {t.nav.approach}
          </button>
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

        {/* Mobile Menu */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon"
              data-testid="button-mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[280px] sm:w-[320px]">
            <nav className="flex flex-col gap-6 mt-8">
              <button
                onClick={() => scrollToSection('vision')}
                className="text-left text-lg font-medium text-foreground hover-elevate active-elevate-2 px-4 py-3 rounded-md"
                data-testid="link-vision-mobile"
              >
                {t.nav.vision}
              </button>
              <button
                onClick={() => scrollToSection('approach')}
                className="text-left text-lg font-medium text-foreground hover-elevate active-elevate-2 px-4 py-3 rounded-md"
                data-testid="link-approach-mobile"
              >
                {t.nav.approach}
              </button>
              <button
                onClick={() => scrollToSection('about')}
                className="text-left text-lg font-medium text-foreground hover-elevate active-elevate-2 px-4 py-3 rounded-md"
                data-testid="link-about-mobile"
              >
                {t.nav.about}
              </button>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-left text-lg font-medium text-foreground hover-elevate active-elevate-2 px-4 py-3 rounded-md"
                data-testid="link-contact-mobile"
              >
                {t.nav.contact}
              </button>
              
              <div className="border-t border-border pt-6 mt-2">
                <div className="flex gap-2">
                  <Button
                    variant={language === 'nl' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setLanguage('nl')}
                    className="flex-1"
                    data-testid="button-lang-nl-mobile"
                  >
                    Nederlands
                  </Button>
                  <Button
                    variant={language === 'en' ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setLanguage('en')}
                    className="flex-1"
                    data-testid="button-lang-en-mobile"
                  >
                    English
                  </Button>
                </div>
              </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
