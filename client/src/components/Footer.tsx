import { useLanguage } from '@/contexts/LanguageContext';
import Logo from '@/components/Logo';

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="flex flex-col items-center gap-6">
          <Logo className="h-12 opacity-90" />
          
          <p className="text-sm text-muted-foreground">
            {t.footer.tagline}
          </p>

          <div className="flex gap-6">
            <button
              onClick={() => console.log('Privacy clicked')}
              className="text-sm text-muted-foreground hover-elevate active-elevate-2 px-3 py-1 rounded-md"
              data-testid="link-privacy"
            >
              {t.footer.privacy}
            </button>
            <button
              onClick={() => console.log('Disclaimer clicked')}
              className="text-sm text-muted-foreground hover-elevate active-elevate-2 px-3 py-1 rounded-md"
              data-testid="link-disclaimer"
            >
              {t.footer.disclaimer}
            </button>
          </div>

          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Schakel AI B.V.
          </p>
        </div>
      </div>
    </footer>
  );
}
