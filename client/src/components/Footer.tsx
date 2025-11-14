import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';
import { Mail, MapPin, Linkedin } from 'lucide-react';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Company Info */}
          <div className="md:col-span-2">
            <Logo className="h-10 mb-6" />
            <p className="text-sm text-muted-foreground">
              Schakel AI B.V.<br />
              KvK: 98312529<br />
              BTW: NL868441119B01
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">
              {t.footer.quickLinks || 'Links'}
            </h3>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => scrollToSection('vision')}
                  className="text-sm text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md -ml-2 transition-colors"
                  data-testid="footer-link-vision"
                >
                  {t.nav.vision}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md -ml-2 transition-colors"
                  data-testid="footer-link-services"
                >
                  {t.nav.services}
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="text-sm text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md -ml-2 transition-colors"
                  data-testid="footer-link-about"
                >
                  {t.nav.about}
                </button>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-foreground mb-4 text-sm">
              Contact
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span>Coolsingel 65<br />3012 AC Rotterdam</span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <a 
                  href="mailto:info@schakel.ai" 
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-email"
                >
                  info@schakel.ai
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Linkedin className="h-4 w-4 mt-0.5 flex-shrink-0 text-muted-foreground" />
                <a 
                  href="https://www.linkedin.com/company/schakel-ai-agency" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  data-testid="footer-linkedin"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Schakel AI B.V. Alle rechten voorbehouden.
          </p>
          <div className="flex gap-6">
            <button
              onClick={() => console.log('Privacy clicked')}
              className="text-xs text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-colors"
              data-testid="link-privacy"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => console.log('Disclaimer clicked')}
              className="text-xs text-muted-foreground hover:text-foreground hover-elevate active-elevate-2 px-2 py-1 rounded-md transition-colors"
              data-testid="link-disclaimer"
            >
              {t.footer.disclaimer}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
