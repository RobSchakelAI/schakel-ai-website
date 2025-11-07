import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";

export async function registerRoutes(app: Express): Promise<Server> {
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || '',
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const { name, email, company, message } = req.body;

      if (!name || !email || !company || !message) {
        return res.status(400).json({ 
          success: false, 
          error: 'Alle velden zijn verplicht' 
        });
      }

      if (!process.env.MAILERSEND_API_KEY) {
        console.error('MAILERSEND_API_KEY is not configured');
        return res.status(500).json({
          success: false,
          error: 'Email service is not configured'
        });
      }

      const sentFrom = new Sender(
        process.env.MAILERSEND_FROM_EMAIL || 'noreply@schakel.ai',
        'Schakel AI Contact Form'
      );
      
      const recipients = [
        new Recipient(
          process.env.MAILERSEND_TO_EMAIL || 'info@schakel.ai',
          'Schakel AI'
        )
      ];

      const emailParams = new EmailParams()
        .setFrom(sentFrom)
        .setTo(recipients)
        .setReplyTo({ email: email, name: name })
        .setSubject(`Nieuw contactformulier: ${name} - ${company}`)
        .setHtml(`
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <div style="background: linear-gradient(135deg, #6EBFAA 0%, #2C9880 100%); padding: 30px; border-radius: 10px 10px 0 0;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Nieuw Contactformulier</h1>
            </div>
            
            <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
              <div style="background: white; padding: 25px; border-radius: 8px; margin-bottom: 20px;">
                <h2 style="color: #1A1A1A; margin-top: 0; font-size: 18px;">Contactgegevens</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Naam:</td>
                    <td style="padding: 10px 0; color: #1A1A1A;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #6EBFAA; text-decoration: none;">${email}</a></td>
                  </tr>
                  <tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Bedrijf:</td>
                    <td style="padding: 10px 0; color: #1A1A1A;">${company}</td>
                  </tr>
                </table>
              </div>
              
              <div style="background: white; padding: 25px; border-radius: 8px;">
                <h2 style="color: #1A1A1A; margin-top: 0; font-size: 18px;">Bericht</h2>
                <p style="line-height: 1.6; color: #333; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>
              
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
Naam:    ${name}
Email:   ${email}
Bedrijf: ${company}

BERICHT:
-----------------
${message}

---
Verzonden: ${new Date().toLocaleString('nl-NL')}
Via: contactformulier op schakel.ai
        `);

      const response = await mailerSend.email.send(emailParams);

      res.status(200).json({ 
        success: true, 
        message: 'Bericht succesvol verzonden',
        messageId: response.headers.get('x-message-id')
      });

    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ 
        success: false, 
        error: 'Er ging iets mis bij het verzenden. Probeer het later opnieuw.' 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
