import { useState, useEffect } from 'react';
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

export function CTAOverlay() {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { isExpanded, closeCTA, getLayoutId } = useCTA();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isExpanded]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await apiRequest('POST', '/api/contact', formData);
      await response.json();
      
      toast({
        title: t.contact.form.success,
        description: t.contact.form.successDescription,
      });
      
      setFormData({ name: '', email: '', company: '', phone: '', message: '' });
      closeCTA();
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast({
        title: 'Er ging iets mis',
        description: 'Probeer het later opnieuw of stuur een email naar info@schakel.ai',
        variant: 'destructive',
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4 flex-1">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.name}
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-name"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="company" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.company}
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-company"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.email}
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-email"
                    />
                  </div>

                  <div>
                    <label 
                      htmlFor="phone" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      Telefoonnummer
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30"
                      data-testid="input-phone-popup"
                    />
                  </div>

                  <div className="flex flex-col flex-1">
                    <label 
                      htmlFor="message" 
                      className="block text-xs font-mono uppercase tracking-wider text-primary-foreground mb-2"
                    >
                      {t.contact.form.message}
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="flex-1 min-h-16 md:min-h-24 bg-primary-foreground/10 border-0 text-primary-foreground placeholder:text-primary-foreground/50 focus-visible:ring-primary-foreground/30 resize-none"
                      data-testid="input-message"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                    data-testid="button-submit-contact"
                  >
                    <Send className="mr-2 h-5 w-5" />
                    {t.contact.form.submit}
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

  const mapUrl = theme === 'dark'
    ? 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.2707743534843!2d4.473373176914644!3d51.92182197193344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c433c0b0f4c3b1%3A0x6e3b3e9e0b0f4c3b!2sCoolsingel%2065%2C%203012%20AC%20Rotterdam!5e0!3m2!1sen!2snl!4v1699999999999!5m2!1sen!2snl&style=element:geometry%7Ccolor:0x212121&style=element:labels.icon%7Cvisibility:off&style=element:labels.text.fill%7Ccolor:0x757575&style=element:labels.text.stroke%7Ccolor:0x212121&style=feature:administrative%7Celement:geometry%7Ccolor:0x757575&style=feature:administrative.country%7Celement:labels.text.fill%7Ccolor:0x9e9e9e&style=feature:administrative.locality%7Celement:labels.text.fill%7Ccolor:0xbdbdbd&style=feature:poi%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:poi.park%7Celement:geometry%7Ccolor:0x181818&style=feature:poi.park%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:road%7Celement:geometry.fill%7Ccolor:0x2c2c2c&style=feature:road%7Celement:labels.text.fill%7Ccolor:0x8a8a8a&style=feature:road.arterial%7Celement:geometry%7Ccolor:0x373737&style=feature:road.highway%7Celement:geometry%7Ccolor:0x3c3c3c&style=feature:road.highway.controlled_access%7Celement:geometry%7Ccolor:0x4e4e4e&style=feature:road.local%7Celement:labels.text.fill%7Ccolor:0x616161&style=feature:transit%7Celement:labels.text.fill%7Ccolor:0x757575&style=feature:water%7Celement:geometry%7Ccolor:0x000000&style=feature:water%7Celement:labels.text.fill%7Ccolor:0x3d3d3d'
    : 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2461.2707743534843!2d4.473373176914644!3d51.92182197193344!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c433c0b0f4c3b1%3A0x6e3b3e9e0b0f4c3b!2sCoolsingel%2065%2C%203012%20AC%20Rotterdam!5e0!3m2!1sen!2snl!4v1699999999999!5m2!1sen!2snl';

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-12">
        <div className="text-center space-y-8 mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
            {t.contact.title}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                {t.contact.address.title}
              </h3>
              <div className="space-y-2 text-muted-foreground">
                <p className="font-semibold text-foreground">{t.contact.address.company}</p>
                <p>{t.contact.address.street}</p>
                <p>{t.contact.address.postal}</p>
                <p>{t.contact.address.country}</p>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
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

          <div className="rounded-md overflow-hidden border border-border h-[300px] md:h-[400px]">
            <iframe
              src={mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Schakel AI Location"
              data-testid="map-location"
            />
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
                  onClick={() => openCTA('contact')}
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
