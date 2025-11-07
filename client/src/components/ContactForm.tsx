import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, Send, AlertCircle } from 'lucide-react';
import { apiRequest } from '@/lib/queryClient';

const contactSchema = z.object({
  name: z.string().min(2, 'Naam is verplicht'),
  email: z.string().email('Ongeldig e-mailadres'),
  company: z.string().min(2, 'Bedrijfsnaam is verplicht'),
  message: z.string().min(10, 'Bericht moet minimaal 10 tekens bevatten'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const { t } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      company: '',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      setError(null);
      
      const response = await apiRequest('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Er ging iets mis');
      }

      setIsSubmitted(true);
      form.reset();
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (err) {
      console.error('Error submitting contact form:', err);
      setError(err instanceof Error ? err.message : 'Er ging iets mis bij het verzenden');
    }
  };

  return (
    <section id="contact" className="py-12 md:py-20 relative overflow-hidden" style={{
      background: 'linear-gradient(135deg, #6EBFAA 0%, #2C9880 100%)'
    }}>
      {/* Subtle grid pattern background */}
      <div className="absolute inset-0 opacity-[0.05]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.3) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      {/* Subtle glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-64 bg-white/10 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 text-center">
            {t.contact.title}
          </h2>
          <p className="text-lg text-white/70 mb-8 text-center">
            {t.contact.subtitle}
          </p>

          <div className="text-center mb-12 space-y-1">
            <p className="text-sm font-medium text-white">Schakel AI B.V.</p>
            <p className="text-sm text-white/60">Coolsingel 65</p>
            <p className="text-sm text-white/60">3012 AA Rotterdam</p>
          </div>

          {error && (
            <div className="bg-red-500/20 border border-red-500/40 rounded-lg p-6 mb-6 flex items-start gap-3" data-testid="message-error">
              <AlertCircle className="w-6 h-6 text-white flex-shrink-0 mt-0.5" />
              <p className="text-white">{error}</p>
            </div>
          )}

          {isSubmitted ? (
            <div className="bg-white/20 border border-white/40 rounded-lg p-8 text-center shadow-lg shadow-black/20" data-testid="message-success">
              <CheckCircle2 className="w-16 h-16 text-white mx-auto mb-4" />
              <p className="text-lg text-white font-medium">{t.contact.form.success}</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        {t.contact.form.name}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 border-2 border-white/20 bg-white text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-primary transition-colors"
                          data-testid="input-name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        {t.contact.form.email}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="h-12 border-2 border-white/20 bg-white text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-primary transition-colors"
                          data-testid="input-email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="company"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        {t.contact.form.company}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 border-2 border-white/20 bg-white text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-primary transition-colors"
                          data-testid="input-company"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-white">
                        {t.contact.form.message}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-32 border-2 border-white/20 bg-white text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:border-primary resize-none transition-colors"
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base bg-white text-[#2C9880] hover:bg-white/90 shadow-lg shadow-black/20 hover:shadow-xl hover:shadow-black/30 transition-all font-semibold"
                  disabled={form.formState.isSubmitting}
                  data-testid="button-submit"
                >
                  {form.formState.isSubmitting ? (
                    'Verzenden...'
                  ) : (
                    <>
                      {t.contact.form.submit}
                      <Send className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          )}
        </div>
      </div>
    </section>
  );
}
