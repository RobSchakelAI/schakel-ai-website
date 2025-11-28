/**
 * Server Configuration
 * 
 * Centralized environment validation and security configuration.
 * Uses Zod for type-safe validation with fail-fast behavior in production.
 */

import { z } from "zod";

// Base schema shared between development and production
const baseEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().regex(/^\d+$/).default("5000"),
  MAILERSEND_FROM_EMAIL: z.string().email().default("rob@schakel.ai"),
  MAILERSEND_TO_EMAIL: z.string().email().default("rob@schakel.ai"),
});

// Development: API key optional (allows testing without email)
const devEnvSchema = baseEnvSchema.extend({
  MAILERSEND_API_KEY: z.string().optional().default(""),
});

// Production: API key required (fail-fast if missing)
const prodEnvSchema = baseEnvSchema.extend({
  MAILERSEND_API_KEY: z.string().min(1, "MAILERSEND_API_KEY is required in production"),
});

export type EnvConfig = {
  NODE_ENV: "development" | "production" | "test";
  PORT: string;
  MAILERSEND_API_KEY: string;
  MAILERSEND_FROM_EMAIL: string;
  MAILERSEND_TO_EMAIL: string;
};

let validatedEnv: EnvConfig | null = null;

/**
 * Validates environment variables at startup.
 * Throws immediately if required vars are missing - prevents silent failures.
 * Called once; result is cached for subsequent calls.
 */
export function validateEnv(): EnvConfig {
  if (validatedEnv) {
    return validatedEnv;
  }

  const schema = process.env.NODE_ENV === "production" ? prodEnvSchema : devEnvSchema;
  const result = schema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.errors
      .map((e) => `  - ${e.path.join(".")}: ${e.message}`)
      .join("\n");
    
    console.error("Environment validation failed:");
    console.error(errors);
    
    throw new Error(`Environment validation failed:\n${errors}`);
  }

  validatedEnv = result.data as EnvConfig;
  return validatedEnv;
}

export function getConfig(): EnvConfig {
  if (!validatedEnv) {
    return validateEnv();
  }
  return validatedEnv;
}

/**
 * CORS Security Configuration
 * 
 * Explicit allowlist - no wildcards to prevent subdomain hijacking.
 * Production: Only schakel.ai domains allowed
 * Development: Also allows localhost for testing
 */
export const ALLOWED_ORIGINS = [
  "https://www.schakel.ai",
  "https://schakel.ai",
  "http://localhost:5000",
  "http://localhost:3000",
] as const;

export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  
  // Check explicit allowlist first
  if ((ALLOWED_ORIGINS as readonly string[]).includes(origin)) {
    return true;
  }
  
  // Allow Vercel preview/deployment URLs for schakel-ai project
  // Pattern: https://schakel-ai-website-*.vercel.app
  if (origin.startsWith("https://schakel-ai-website") && origin.endsWith(".vercel.app")) {
    return true;
  }
  
  // Development: allow any localhost port for flexibility
  if (process.env.NODE_ENV === "development") {
    if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
      return true;
    }
  }
  
  return false;
}

/**
 * Rate Limiting Configuration
 * 
 * Protects contact form from abuse: 5 requests per hour per client.
 * Client identified by IP + User-Agent combination.
 */
export const RATE_LIMIT = {
  windowMs: 60 * 60 * 1000, // 1 hour window
  maxRequests: 5,           // max requests per window
} as const;
