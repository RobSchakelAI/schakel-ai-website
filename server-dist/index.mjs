var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import runtimeErrorOverlay from "@replit/vite-plugin-runtime-error-modal";
var vite_config_default;
var init_vite_config = __esm({
  async "vite.config.ts"() {
    "use strict";
    vite_config_default = defineConfig({
      plugins: [
        react(),
        runtimeErrorOverlay(),
        ...process.env.NODE_ENV !== "production" && process.env.REPL_ID !== void 0 ? [
          await import("@replit/vite-plugin-cartographer").then(
            (m) => m.cartographer()
          ),
          await import("@replit/vite-plugin-dev-banner").then(
            (m) => m.devBanner()
          )
        ] : []
      ],
      resolve: {
        alias: {
          "@": path.resolve(import.meta.dirname, "client", "src"),
          "@shared": path.resolve(import.meta.dirname, "shared"),
          "@assets": path.resolve(import.meta.dirname, "attached_assets")
        }
      },
      root: path.resolve(import.meta.dirname, "client"),
      build: {
        outDir: path.resolve(import.meta.dirname, "dist/public"),
        emptyOutDir: true
      },
      server: {
        fs: {
          strict: true,
          deny: ["**/.*"]
        }
      }
    });
  }
});

// server/vite.ts
var vite_exports = {};
__export(vite_exports, {
  log: () => log,
  serveStatic: () => serveStatic,
  setupVite: () => setupVite
});
import express from "express";
import fs from "fs";
import path2 from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { nanoid } from "nanoid";
function log(message, source = "express") {
  const formattedTime = (/* @__PURE__ */ new Date()).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}
async function setupVite(app2, server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true
  };
  const vite = await createViteServer({
    ...vite_config_default,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      }
    },
    server: serverOptions,
    appType: "custom"
  });
  app2.use(vite.middlewares);
  app2.use("*", async (req, res, next) => {
    const url = req.originalUrl;
    try {
      const clientTemplate = path2.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html"
      );
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });
}
function serveStatic(app2) {
  const distPath = path2.resolve(import.meta.dirname, "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }
  app2.use(express.static(distPath));
  app2.use("*", (_req, res) => {
    res.sendFile(path2.resolve(distPath, "index.html"));
  });
}
var viteLogger;
var init_vite = __esm({
  async "server/vite.ts"() {
    "use strict";
    await init_vite_config();
    viteLogger = createLogger();
  }
});

// server/index.ts
import express2 from "express";
import { createServer } from "http";

// server/routes.ts
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
async function registerRoutes(app2) {
  app2.get("/healthz", (req, res) => {
    res.status(200).json({
      status: "ok",
      timestamp: (/* @__PURE__ */ new Date()).toISOString(),
      env: process.env.NODE_ENV || "development",
      port: process.env.PORT || "5000"
    });
  });
  const mailerSend = new MailerSend({
    apiKey: process.env.MAILERSEND_API_KEY || ""
  });
  app2.post("/api/contact", async (req, res) => {
    try {
      console.log("Received contact form submission", {
        origin: req.headers.origin,
        hasBody: !!req.body
      });
      const { name, email, company, phone, message } = req.body;
      if (!process.env.MAILERSEND_API_KEY) {
        console.error("MAILERSEND_API_KEY is not configured");
        return res.status(500).json({
          success: false,
          error: "Email service is not configured"
        });
      }
      const sentFrom = new Sender(
        process.env.MAILERSEND_FROM_EMAIL || "noreply@schakel.ai",
        "Schakel AI Contact Form"
      );
      const recipients = [
        new Recipient(
          process.env.MAILERSEND_TO_EMAIL || "info@schakel.ai",
          "Schakel AI"
        )
      ];
      const subject = name && company ? `Nieuw contactformulier: ${name} - ${company}` : name ? `Nieuw contactformulier: ${name}` : "Nieuw contactformulier";
      const emailParams = new EmailParams().setFrom(sentFrom).setTo(recipients).setSubject(subject);
      if (email) {
        emailParams.setReplyTo({ email, name: name || "Contactformulier" });
      }
      emailParams.setHtml(`
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
                  </tr>` : ""}
                  ${email ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Email:</td>
                    <td style="padding: 10px 0;"><a href="mailto:${email}" style="color: #6EBFAA; text-decoration: none;">${email}</a></td>
                  </tr>` : ""}
                  ${company ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Bedrijf:</td>
                    <td style="padding: 10px 0; color: #1A1A1A;">${company}</td>
                  </tr>` : ""}
                  ${phone ? `<tr>
                    <td style="padding: 10px 0; color: #666; font-weight: 600;">Telefoon:</td>
                    <td style="padding: 10px 0;"><a href="tel:${phone}" style="color: #6EBFAA; text-decoration: none;">${phone}</a></td>
                  </tr>` : ""}
                </table>
              </div>
              
              ${message ? `<div style="background: white; padding: 25px; border-radius: 8px;">
                <h2 style="color: #1A1A1A; margin-top: 0; font-size: 18px;">Bericht</h2>
                <p style="line-height: 1.6; color: #333; margin: 0; white-space: pre-wrap;">${message}</p>
              </div>` : ""}
              
              <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; text-align: center;">
                <p style="color: #999; font-size: 12px; margin: 5px 0;">
                  Dit bericht is verzonden via het contactformulier op schakel.ai
                </p>
                <p style="color: #999; font-size: 12px; margin: 5px 0;">
                  ${(/* @__PURE__ */ new Date()).toLocaleString("nl-NL", { dateStyle: "full", timeStyle: "short" })}
                </p>
              </div>
            </div>
          </div>
        `).setText(`
Nieuw Contactformulier - Schakel AI

CONTACTGEGEVENS:
-----------------
${name ? `Naam:    ${name}
` : ""}${email ? `Email:   ${email}
` : ""}${company ? `Bedrijf: ${company}
` : ""}${phone ? `Telefoon: ${phone}
` : ""}
${message ? `BERICHT:
-----------------
${message}

` : ""}---
Verzonden: ${(/* @__PURE__ */ new Date()).toLocaleString("nl-NL")}
Via: contactformulier op schakel.ai
        `);
      await mailerSend.email.send(emailParams);
      res.status(200).json({
        success: true,
        message: "Bericht succesvol verzonden"
      });
    } catch (error) {
      console.error("Error sending email:", error);
      res.status(500).json({
        success: false,
        error: "Er ging iets mis bij het verzenden. Probeer het later opnieuw."
      });
    }
  });
}

// server/index.ts
await init_vite();
var app = express2();
app.use((req, res, next) => {
  const origin = req.headers.origin;
  const allowedOrigins = [
    "https://www.schakel.ai",
    "https://schakel.ai",
    "http://localhost:5000",
    "http://localhost:3000"
  ];
  let allowOrigin = "https://www.schakel.ai";
  if (origin && (allowedOrigins.includes(origin) || origin.endsWith(".schakel.ai") || origin.endsWith(".vercel.app") || origin.endsWith(".railway.app"))) {
    allowOrigin = origin;
  }
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    console.log(`OPTIONS preflight from ${origin || "unknown"} \u2192 ${allowOrigin}`);
    return res.status(204).end();
  }
  console.log(`CORS: ${origin || "no-origin"} \u2192 ${allowOrigin}`);
  next();
});
app.use(express2.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express2.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const start = Date.now();
  const path3 = req.path;
  let capturedJsonResponse = void 0;
  const originalResJson = res.json;
  res.json = function(bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };
  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path3.startsWith("/api")) {
      let logLine = `${req.method} ${path3} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "\u2026";
      }
      log(logLine);
    }
  });
  next();
});
(async () => {
  await registerRoutes(app);
  app.use((err, _req, res, _next) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error("Express error handler:", err);
    res.status(status).json({ message });
  });
  const server = createServer(app);
  if (app.get("env") === "development") {
    const { setupVite: setupVite2 } = await init_vite().then(() => vite_exports);
    await setupVite2(app, server);
  } else {
    log("\u{1F680} Running in API-only mode (no static file serving) - CORS enabled");
  }
  const port = parseInt(process.env.PORT || "5000", 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true
  }, () => {
    log(`serving on port ${port}`);
  });
})();
