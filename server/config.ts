import { z } from "zod";

const baseEnvSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().regex(/^\d+$/).default("5000"),
  MAILERSEND_FROM_EMAIL: z.string().email().default("rob@schakel.ai"),
  MAILERSEND_TO_EMAIL: z.string().email().default("rob@schakel.ai"),
});

const devEnvSchema = baseEnvSchema.extend({
  MAILERSEND_API_KEY: z.string().optional().default(""),
});

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

const allowedOriginsSchema = z.array(z.string());

export const ALLOWED_ORIGINS = [
  "https://www.schakel.ai",
  "https://schakel.ai",
  "http://localhost:5000",
  "http://localhost:3000",
] as const;

export function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return false;
  
  if ((ALLOWED_ORIGINS as readonly string[]).includes(origin)) {
    return true;
  }
  
  if (process.env.NODE_ENV === "development") {
    if (origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
      return true;
    }
  }
  
  return false;
}

export const RATE_LIMIT = {
  windowMs: 60 * 60 * 1000,
  maxRequests: 5,
} as const;
