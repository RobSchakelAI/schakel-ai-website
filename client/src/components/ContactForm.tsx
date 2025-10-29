import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { CheckCircle2, Send } from 'lucide-react';

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
    console.log('Contact form submitted:', data);
    // TODO: Remove mock functionality - connect to API endpoint
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitted(true);
    form.reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contact" className="py-20 md:py-32 border-t border-border">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-md mx-auto">
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4 text-center">
            {t.contact.title}
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-center">
            {t.contact.subtitle}
          </p>

          <div className="text-center mb-12 space-y-1">
            <p className="text-sm text-muted-foreground">Coolsingel 65</p>
            <p className="text-sm text-muted-foreground">3012 AA Rotterdam</p>
          </div>

          {isSubmitted ? (
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-8 text-center" data-testid="message-success">
              <CheckCircle2 className="w-16 h-16 text-primary mx-auto mb-4" />
              <p className="text-lg text-foreground">{t.contact.form.success}</p>
            </div>
          ) : (
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.contact.form.name}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 border-2 focus:border-primary"
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.contact.form.email}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="email"
                          className="h-12 border-2 focus:border-primary"
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.contact.form.company}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className="h-12 border-2 focus:border-primary"
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
                      <FormLabel className="text-sm font-medium text-foreground">
                        {t.contact.form.message}
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="min-h-32 border-2 focus:border-primary resize-none"
                          data-testid="input-message"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 text-base"
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
