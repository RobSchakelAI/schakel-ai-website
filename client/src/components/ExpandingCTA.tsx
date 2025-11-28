/**
 * Expanding CTA Component
 * 
 * Animated contact form overlay that expands from CTA buttons.
 * Uses react-hook-form with shared Zod schema for consistent validation.
 * Includes honeypot field for spam protection.
 */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { X, ArrowRight, Send, MapPin, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCTA } from '@/contexts/CTAContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';
import { trackEvent } from '@/lib/analytics';
import { contactSchema, type ContactFormData } from '@shared/contact';

export function CTAOverlay() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { isExpanded, closeCTA, getLayoutId } = useCTA();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
      _honeypot: '',
    },
  });

  // Lock body scroll when overlay is open
  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isExpanded]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await apiRequest('POST', '/api/contact', data);
      await response.json();
      
      trackEvent('form-submit', { type: 'contact' });
      
      toast({
        title: t.contact.form.success,
        description: t.contact.form.successDescription,
      });
      
      form.reset();
      closeCTA();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: t.contact.form.error,
        variant: 'destructive',
      });
    }
  };

  return (
    <AnimatePresence initial={false}>
        {isExpanded && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
            <motion.div
              layoutId={getLayoutId()}
              transition={{ duration: 0.3 }}
              style={{ 
                borderRadius: '24px',
                background: 'linear-gradient(135deg, #6EBFAA 0%, #2C9880 100%)'
              }}
              layout
              className="relative flex h-full w-full max-w-3xl overflow-y-auto transform-gpu will-change-transform"
            >
              {/* Subtle grid pattern background */}
              <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
                backgroundSize: '40px 40px',
                borderRadius: '24px'
              }} />

              {/* Subtle glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-white/10 blur-[100px] pointer-events-none" />

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.15, duration: 0.4 }}
                className="relative z-10 flex flex-col w-full max-w-4xl mx-auto p-8 md:p-12 lg:p-16 gap-8"
              >
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-primary-foreground">
                    {t.contact.title}
                  </h2>
                  <p className="text-lg md:text-xl text-primary-foreground/90">
                    {t.contact.subtitle}
                  </p>
                </div>

                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4 flex-1">
                  {/* Honeypot field - hidden from users, catches bots */}
                  <input
                    type="text"
                    {...form.register('_honeypot')}
                    className="absolute -left-[9999px] opacity-0 h-0 w-0"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                  />

                  <div>
                    <label 
                      htmlFor="popup-name" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.name}
                    </label>
                    <Input
                      id="popup-name"
                      {...form.register('name')}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-popup-name"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="popup-company" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.company}
                    </label>
                    <Input
                      id="popup-company"
                      {...form.register('company')}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-popup-company"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="popup-email" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.email}
                    </label>
                    <Input
                      id="popup-email"
                      type="email"
                      {...form.register('email')}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-popup-email"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="popup-phone" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.phone}
                    </label>
                    <Input
                      id="popup-phone"
                      type="tel"
                      {...form.register('phone')}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-popup-phone"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <label 
                      htmlFor="popup-message" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.message}
                    </label>
                    <Textarea
                      id="popup-message"
                      {...form.register('message')}
                      className="flex-1 min-h-16 md:min-h-24 bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30 resize-none"
                      data-testid="input-popup-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    disabled={form.formState.isSubmitting}
                    data-testid="button-submit-popup"
                  >
                    {form.formState.isSubmitting ? (
                      <>{t.contact.form.submit}...</>
                    ) : (
                      <>
                        <Send className="mr-2 h-5 w-5" />
                        {t.contact.form.submit}
                      </>
                    )}
                  </Button>
                </form>
              </motion.div>

              <motion.button
                onClick={closeCTA}
                className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center text-primary-foreground bg-transparent transition-colors hover:bg-primary-foreground/10 rounded-full"
                aria-label="Close"
                data-testid="button-close-cta"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
  );
}

export default function ExpandingCTA() {
  const { t } = useLanguage();
  const { isExpanded, origin, openCTA } = useCTA();
  const { theme } = useTheme();

  const mapUrl = 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.2707743534843!2d4.473373176914644!3d51.92182197193344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c433c0b0f4c3b1%3A0x6e3b3e9e0b0f4c3b!2sCoolsingel%2065%2C%203012%20AC%20Rotterdam!5e0!3m2!1sen!2snl!4v1699999999999!5m2!1sen!2snl';

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
            {t.contact.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="rounded-md overflow-hidden border border-border h-[300px] md:h-[400px]">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              className="dark:invert dark:hue-rotate-180 dark:brightness-90 dark:contrast-110"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Schakel AI Location"
              data-testid="map-location"
            />
          </div>

          <div className="space-y-6">
            <div className="flex gap-3">
              <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {t.contact.address.title}
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p className="font-semibold text-foreground">{t.contact.address.company}</p>
                  <p>{t.contact.address.street}</p>
                  <p>{t.contact.address.postal}</p>
                  <p>{t.contact.address.country}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <Mail className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  Contact
                </h3>
                <div className="space-y-2 text-muted-foreground">
                  <p>
                    <a 
                      href={`mailto:${t.contact.info.email}`}
                      className="hover:text-primary transition-colors"
                      data-testid="link-email"
                    >
                      {t.contact.info.email}
                    </a>
                  </p>
                  <p className="text-sm">{t.contact.info.kvk}</p>
                  <p className="text-sm">{t.contact.info.btw}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <AnimatePresence initial={false}>
            {!isExpanded && origin !== 'hero' && (
              <motion.div className="inline-block relative">
                <motion.div
                  style={{ borderRadius: '100px' }}
                  layout
                  layoutId="cta-card-contact"
                  className="absolute inset-0 bg-primary items-center justify-center transform-gpu will-change-transform"
                />
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.2 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout={false}
                  onClick={() => {
                    openCTA('contact');
                    trackEvent('cta-click', { location: 'contact' });
                  }}
                  className="px-8 py-4 text-lg font-medium text-primary-foreground relative flex items-center gap-2"
                  data-testid="button-expand-cta"
                >
                  {t.hero.ctaPrimary}
                  <ArrowRight className="h-5 w-5" />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
