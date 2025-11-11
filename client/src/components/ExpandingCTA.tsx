import { useState, useEffect } from 'react';
import { X, ArrowRight, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCTA } from '@/contexts/CTAContext';
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

  return (
    <section id="contact" className="relative py-16 md:py-24 overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground">
          {t.contact.title}
        </h2>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          {t.contact.subtitle}
        </p>

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
    </section>
  );
}
