import type { Express, Request, Response } from "express";
import { serverContactSchema, normalizeContactData, isEmptySubmission } from "@shared/contact";
import { sendContactEmail } from "./services/mailer";
import { contactRateLimit } from "./middleware/rateLimit";
import { getConfig } from "./config";

export async function registerRoutes(app: Express): Promise<void> {
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

  app.post("/api/contact", contactRateLimit, async (req: Request, res: Response) => {
    try {
      const rawData = req.body;

      if (rawData._honeypot && rawData._honeypot.length > 0) {
        console.warn("Honeypot triggered - likely bot submission");
        return res.status(200).json({
          success: true,
          message: "Bericht succesvol verzonden",
        });
      }

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

      const normalizedData = normalizeContactData(parseResult.data);

      if (isEmptySubmission(normalizedData)) {
        return res.status(400).json({
          success: false,
          error: "Vul ten minste één veld in.",
        });
      }

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
      console.error("Error sending email:", error);
      return res.status(500).json({
        success: false,
        error: "Er ging iets mis bij het verzenden. Probeer het later opnieuw.",
      });
    }
  });
}
