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

  // Debug endpoint to check email config (masks secrets)
  app.get("/api/debug/email-config", (_req: Request, res: Response) => {
    const apiKey = process.env.MAILERSEND_API_KEY || "";
    const fromEmail = process.env.MAILERSEND_FROM_EMAIL || "";
    const toEmail = process.env.MAILERSEND_TO_EMAIL || "";
    
    res.status(200).json({
      hasApiKey: apiKey.length > 0,
      apiKeyPrefix: apiKey.substring(0, 8) + "...",
      apiKeyLength: apiKey.length,
      fromEmail: fromEmail,
      toEmail: toEmail,
      nodeEnv: process.env.NODE_ENV || "development",
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

      console.log("Contact form submitted successfully");

      return res.status(200).json({
        success: true,
        message: "Bericht succesvol verzonden",
      });
    } catch (error: unknown) {
      // Enhanced error logging for MailerSend API errors
      const errorDetails: Record<string, unknown> = {};
      
      if (error instanceof Error) {
        errorDetails.message = error.message;
        errorDetails.name = error.name;
        errorDetails.stack = error.stack;
      }
      
      // MailerSend SDK errors often have body, statusCode, code properties
      if (error && typeof error === 'object') {
        const apiError = error as Record<string, unknown>;
        if ('statusCode' in apiError) errorDetails.statusCode = apiError.statusCode;
        if ('code' in apiError) errorDetails.code = apiError.code;
        
        // Extract body (usually JSON-safe)
        if ('body' in apiError && apiError.body) {
          const body = apiError.body as Record<string, unknown>;
          errorDetails.body = body;
          if ('message' in body) errorDetails.apiMessage = body.message;
          if ('errors' in body) errorDetails.apiErrors = body.errors;
        }
        
        // Skip 'response' to avoid circular reference issues
      }
      
      // Safe JSON serialization with fallback
      try {
        console.error("Contact form error:", JSON.stringify(errorDetails, null, 2));
      } catch {
        console.error("Contact form error (serialization failed):", errorDetails);
      }
      return res.status(500).json({
        success: false,
        error: "Er ging iets mis bij het verzenden. Probeer het later opnieuw.",
      });
    }
  });
}
