import express, { type Request, Response, NextFunction } from "express";
import { createServer } from "http";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

const app = express();

// Global CORS middleware - MUST be before all routes and body parsers
app.use((req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  
  const allowedOrigins = [
    'https://www.schakel.ai',
    'https://schakel.ai',
    'http://localhost:5000',
    'http://localhost:3000'
  ];
  
  // Determine which origin to allow
  let allowOrigin = 'https://www.schakel.ai'; // Default fallback
  
  if (origin && (allowedOrigins.includes(origin) || 
                 origin.endsWith('.schakel.ai') || 
                 origin.endsWith('.vercel.app') ||
                 origin.endsWith('.railway.app'))) {
    allowOrigin = origin; // Use specific origin when matched
  }
  
  // Set CORS headers - NEVER use wildcard with credentials
  res.header('Access-Control-Allow-Origin', allowOrigin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  
  // Handle OPTIONS preflight globally - short-circuit before route logic
  if (req.method === 'OPTIONS') {
    console.log(`OPTIONS preflight from ${origin || 'unknown'} → ${allowOrigin}`);
    return res.status(204).end();
  }
  
  console.log(`CORS: ${origin || 'no-origin'} → ${allowOrigin}`);
  next();
});

declare module 'http' {
  interface IncomingMessage {
    rawBody: unknown
  }
}
app.use(express.json({
  verify: (req, _res, buf) => {
    req.rawBody = buf;
  }
}));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    console.error('Express error handler:', err);
    res.status(status).json({ message });
  });

  // Create HTTP server AFTER all middleware is registered
  const server = createServer(app);

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    // Production: API-only mode (Railway backend serves only /api routes)
    // Frontend is served separately by Vercel
    log("🚀 Running in API-only mode (no static file serving) - CORS enabled");
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || '5000', 10);
  server.listen({
    port,
    host: "0.0.0.0",
    reusePort: true,
  }, () => {
    log(`serving on port ${port}`);
  });
})();
