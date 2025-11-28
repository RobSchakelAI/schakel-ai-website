/**
 * API Routes
 * 
 * All backend endpoints for the Schakel AI website.
 * Currently handles: health checks and contact form submissions.
 */

import type { Express, Request, Response } from "express";
import { serverContactSchema, normalizeContactData, isEmptySubmission } from "@shared/contact";
import { sendContactEmail } from "./services/mailer";
import { contactRateLimit } from "./middleware/rateLimit";
import { getConfig } from "./config";

export async function registerRoutes(app: Express): Promise<void> {
  // Health check endpoints for monitoring (Railway, uptime services)
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "development",
    });
  });

  app.get("/healthz", (_req: Request, res: Response) => {
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      env: process.env.NODE_ENV || "development",
      port: process.env.PORT || "5000",
    });
  });

  /**
   * Contact Form Endpoint
   * 
   * Security layers (in order):
   * 1. Rate limiting (middleware) - 5 requests/hour per client
   * 2. Honeypot check - hidden field that bots fill in
   * 3. Zod validation - shared schema with frontend
   * 4. Empty submission check - at least one field required
   */
  app.post("/api/contact", contactRateLimit, async (req: Request, res: Response) => {
    try {
      const rawData = req.body;

      // Honeypot: hidden field that humans don't fill but bots do
      // Returns fake success to not reveal detection
      if (rawData._honeypot && rawData._honeypot.length > 0) {
        console.warn("Honeypot triggered - likely bot submission");
        return res.status(200).json({
          success: true,
          message: "Bericht succesvol verzonden",
        });
      }

      // Validate using shared schema (same as frontend for consistency)
      const parseResult = serverContactSchema.safeParse(rawData);

      if (!parseResult.success) {
        const errors = parseResult.error.errors.map((e) => ({
          field: e.path.join("."),
          message: e.message,
        }));

        console.warn("Validation failed:", errors);

        return res.status(400).json({
          success: false,
          error: "Vul ten minste één veld in.",
          details: errors,
        });
      }

      // Normalize: trim whitespace, lowercase email
      const normalizedData = normalizeContactData(parseResult.data);

      // Final check: prevent completely empty submissions
      if (isEmptySubmission(normalizedData)) {
        return res.status(400).json({
          success: false,
          error: "Vul ten minste één veld in.",
        });
      }

      // Check email service availability
      const config = getConfig();
      if (!config.MAILERSEND_API_KEY) {
        console.error("MailerSend API key not configured");
        return res.status(503).json({
          success: false,
          error: "Email service is tijdelijk niet beschikbaar.",
        });
      }

      await sendContactEmail(normalizedData);

      console.log(`Contact form submitted: ${normalizedData.name || "Anonymous"} <${normalizedData.email || "no email"}>`);

      return res.status(200).json({
        success: true,
        message: "Bericht succesvol verzonden",
      });
    } catch (error) {
      // Log full error details for debugging
      console.error("=== EMAIL ERROR DETAILS ===");
      console.error("Error type:", error?.constructor?.name);
      console.error("Error message:", error instanceof Error ? error.message : String(error));
      if (error instanceof Error && error.stack) {
        console.error("Stack trace:", error.stack);
      }
      // Log any additional properties (MailerSend errors often have response data)
      if (typeof error === 'object' && error !== null) {
        const errorObj = error as Record<string, unknown>;
        if (errorObj.response) console.error("Response:", JSON.stringify(errorObj.response, null, 2));
        if (errorObj.body) console.error("Body:", JSON.stringify(errorObj.body, null, 2));
        if (errorObj.statusCode) console.error("Status code:", errorObj.statusCode);
      }
      console.error("=== END ERROR DETAILS ===");
      
      return res.status(500).json({
        success: false,
        error: "Er ging iets mis bij het verzenden. Probeer het later opnieuw.",
      });
    }
  });
}
