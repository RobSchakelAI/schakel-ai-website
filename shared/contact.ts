import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().trim().max(100, 'Name too long').optional().default(''),
  email: z.union([
    z.string().email('Invalid email address'),
    z.literal('')
  ]).optional().default(''),
  company: z.string().trim().max(100, 'Company name too long').optional().default(''),
  phone: z.string().trim().max(30, 'Phone number too long').optional().default(''),
  message: z.string().trim().max(5000, 'Message too long').optional().default(''),
  _honeypot: z.string().max(0, 'Bot detected').optional().default(''),
});

export const serverContactSchema = contactSchema.refine(
  (data) => {
    const hasContent = Boolean(
      data.name || 
      data.email || 
      data.company || 
      data.phone || 
      data.message
    );
    return hasContent;
  },
  { message: 'At least one field must be filled' }
);

export type ContactFormData = z.infer<typeof contactSchema>;

export type ContactSubmission = z.infer<typeof serverContactSchema>;

export function normalizeContactData(data: ContactFormData): ContactFormData {
  return {
    name: data.name?.trim() || '',
    email: data.email?.trim().toLowerCase() || '',
    company: data.company?.trim() || '',
    phone: data.phone?.trim() || '',
    message: data.message?.trim() || '',
    _honeypot: data._honeypot || '',
  };
}

export function isEmptySubmission(data: ContactFormData): boolean {
  return !data.name && !data.email && !data.company && !data.phone && !data.message;
}

export const CONTACT_FIELD_LABELS = {
  nl: {
    name: 'Naam',
    email: 'E-mail',
    company: 'Bedrijf',
    phone: 'Telefoonnummer',
    message: 'Bericht',
    submit: 'Verstuur',
  },
  en: {
    name: 'Name',
    email: 'Email',
    company: 'Company',
    phone: 'Phone number',
    message: 'Message',
    submit: 'Send',
  },
} as const;
