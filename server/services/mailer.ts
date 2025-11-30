/**
 * MailerSend Email Service
 * 
 * Handles all outbound email for the contact form.
 * Uses singleton pattern to avoid creating new SDK instances per request.
 */

import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { ContactFormData } from "@shared/contact";
import { getConfig } from "../config";

// Singleton: one SDK instance reused across all requests
let mailerInstance: MailerSend | null = null;

export function getMailerSend(): MailerSend {
  if (!mailerInstance) {
    const config = getConfig();
    if (!config.MAILERSEND_API_KEY) {
      throw new Error("MAILERSEND_API_KEY is not configured");
    }
    mailerInstance = new MailerSend({ apiKey: config.MAILERSEND_API_KEY });
  }
  return mailerInstance;
}

export interface MailerConfig {
  fromEmail: string;
  fromName: string;
  toEmail: string;
  toName: string;
}

export function getMailerConfig(): MailerConfig {
  const config = getConfig();
  return {
    fromEmail: config.MAILERSEND_FROM_EMAIL,
    fromName: "Schakel AI Contact Form",
    toEmail: config.MAILERSEND_TO_EMAIL,
    toName: "Schakel AI",
  };
}

export function buildContactEmailSubject(data: ContactFormData): string {
  if (data.name && data.company) {
    return `Nieuw contactformulier: ${data.name} - ${data.company}`;
  }
  if (data.name) {
    return `Nieuw contactformulier: ${data.name}`;
  }
  return "Nieuw contactformulier";
}

export function buildContactEmailHtml(data: ContactFormData): string {
  const { name, email, company, phone, message } = data;
  const timestamp = new Date().toLocaleString("nl-NL", {
    dateStyle: "full",
    timeStyle: "short",
  });

  return `
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
              <td style="padding: 10px 0; color: #1A1A1A;">${escapeHtml(name)}</td>
            </tr>` : ""}
            ${email ? `<tr>
              <td style="padding: 10px 0; color: #666; font-weight: 600;">Email:</td>
              <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(email)}" style="color: #6EBFAA; text-decoration: none;">${escapeHtml(email)}</a></td>
            </tr>` : ""}
            ${company ? `<tr>
              <td style="padding: 10px 0; color: #666; font-weight: 600;">Bedrijf:</td>
              <td style="padding: 10px 0; color: #1A1A1A;">${escapeHtml(company)}</td>
            </tr>` : ""}
            ${phone ? `<tr>
              <td style="padding: 10px 0; color: #666; font-weight: 600;">Telefoon:</td>
              <td style="padding: 10px 0;"><a href="tel:${escapeHtml(phone)}" style="color: #6EBFAA; text-decoration: none;">${escapeHtml(phone)}</a></td>
            </tr>` : ""}
          </table>
        </div>
        
        ${message ? `<div style="background: white; padding: 25px; border-radius: 8px;">
          <h2 style="color: #1A1A1A; margin-top: 0; font-size: 18px;">Bericht</h2>
          <p style="line-height: 1.6; color: #333; margin: 0; white-space: pre-wrap;">${escapeHtml(message)}</p>
        </div>` : ""}
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
          <p style="color: #999; font-size: 12px; margin: 5px 0;">
            Dit bericht is verzonden via het contactformulier op schakel.ai
          </p>
          <p style="color: #999; font-size: 12px; margin: 5px 0;">
            ${timestamp}
          </p>
        </div>
      </div>
    </div>
  `;
}

export function buildContactEmailText(data: ContactFormData): string {
  const { name, email, company, phone, message } = data;
  const timestamp = new Date().toLocaleString("nl-NL");

  return `
Nieuw Contactformulier - Schakel AI

CONTACTGEGEVENS:
-----------------
${name ? `Naam:    ${name}\n` : ""}${email ? `Email:   ${email}\n` : ""}${company ? `Bedrijf: ${company}\n` : ""}${phone ? `Telefoon: ${phone}\n` : ""}
${message ? `BERICHT:\n-----------------\n${message}\n\n` : ""}---
Verzonden: ${timestamp}
Via: contactformulier op schakel.ai
  `.trim();
}

// XSS prevention: escape user input before embedding in HTML
function escapeHtml(text: string): string {
  const htmlEscapes: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  };
  return text.replace(/[&<>"']/g, (char) => htmlEscapes[char] || char);
}

/**
 * Sends contact form submission via MailerSend.
 * Sets reply-to to submitter's email for easy response.
 */
export async function sendContactEmail(data: ContactFormData): Promise<void> {
  const mailer = getMailerSend();
  const config = getMailerConfig();

  const sentFrom = new Sender(config.fromEmail, config.fromName);
  const recipients = [new Recipient(config.toEmail, config.toName)];

  const emailParams = new EmailParams()
    .setFrom(sentFrom)
    .setTo(recipients)
    .setSubject(buildContactEmailSubject(data))
    .setHtml(buildContactEmailHtml(data))
    .setText(buildContactEmailText(data));

  // Reply-to: allows direct response to submitter
  if (data.email) {
    emailParams.setReplyTo({
      email: data.email,
      name: data.name || "Contactformulier",
    });
  }

  await mailer.email.send(emailParams);
}
