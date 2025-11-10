import type { Express, Request, Response } from "express";
import { storage } from "./storage";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { getEnv } from "./env";

export async function registerRoutes(app: Express): Promise<void> {
  // CORS is now handled by global middleware in server/index.ts
  // No need for per-route CORS headers or OPTIONS handlers

  // Health check endpoint
  app.get('/healthz', (req: Request, res: Response) => {
    res.status(200).json({ 
      status: 'ok', 
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || 'development',
      port: process.env.PORT || '5000'
    });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      console.log("Received contact form submission", { 
        origin: req.headers.origin,
        hasBody: !!req.body
      });
      
      const { name, email, company, phone, message } = req.body;

      // Use environment variables with placeholder detection
      const apiKey = getEnv('MAILERSEND_API_KEY');
      const fromEmail = getEnv('MAILERSEND_FROM_EMAIL', 'rob@schakel.ai');
      const toEmail = getEnv('MAILERSEND_TO_EMAIL', 'rob@schakel.ai');

      const mailerSend = new MailerSend({
        apiKey,
      });

      const sentFrom = new Sender(
        fromEmail,
        'Schakel AI Contact Form'
      );
      
      const recipients = [
        new Recipient(
          toEmail,
          'Schakel AI'
        )
      ];

      const subject = name && company 
        ? `Nieuw contactformulier: ${name} - ${company}`
        : name 
          ? `Nieuw contactformulier: ${name}`
          : 'Nieuw contactformulier';

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setSubject(subject);

      if (email) {
        emailParams.setReplyTo({ email: email, name: name || 'Contactformulier' });
      }

      emailParams
        .setHtml(`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6EBFAA 0%, #2C9880 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nieuw Contactformulier</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #1A1A1A; margin-top: 0; font-size: 18px;">Contactgegevens</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  ${name ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Naam:</td>
                    <td style="padding: 10px 0; color: #1A1A1A;">${name}</td>
                  </tr>` : ''}
                  ${email ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #6EBFAA; text-decoration: none;">${email}</a></td>
                  </tr>` : ''}
                  ${company ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Bedrijf:</td>
                    <td style="padding: 10px 0; color: #1A1A1A;">${company}</td>
                  </tr>` : ''}
                  ${phone ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Telefoon:</td>
                    <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #6EBFAA; text-decoration: none;">${phone}</a></td>
                  </tr>` : ''}
                </table>
              </div>
              
              ${message ? `<div style="background: white; padding: 25px; border-radius: 8px;">
                <h2 style="color: #1A1A1A; margin-top: 0; font-size: 18px;">Bericht</h2>
                <p style="line-height: 1.6; color: #333; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>` : ''}
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
                <p style="color: #999; font-size: 12px; margin: 5px 0;">
                  Dit bericht is verzonden via het contactformulier op schakel.ai
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0;">
                  ${new Date().toLocaleString('nl-NL', { dateStyle: 'full', timeStyle: 'short' })}
                </p>
              </div>
            </div>
          </div>
        `)
        .setText(`
Nieuw Contactformulier - Schakel AI

CONTACTGEGEVENS:
-----------------
${name ? `Naam:    ${name}\n` : ''}${email ? `Email:   ${email}\n` : ''}${company ? `Bedrijf: ${company}\n` : ''}${phone ? `Telefoon: ${phone}\n` : ''}
${message ? `BERICHT:\n-----------------\n${message}\n\n` : ''}---
Verzonden: ${new Date().toLocaleString('nl-NL')}
Via: contactformulier op schakel.ai
        `);

      await mailerSend.email.send(emailParams);

      res.status(200).json({ 
        success: true, 
        message: 'Bericht succesvol verzonden'
      });

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.' 
      });
    }
  });
}
