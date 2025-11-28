import type { Request, Response, NextFunction } from "express";
import { RATE_LIMIT } from "../config";

interface RateLimitEntry {
  count: number;
  firstRequest: number;
}

const MAX_STORE_SIZE = 10000;

const rateLimitStore = new Map<string, RateLimitEntry>();

function cleanupExpiredEntries(): void {
  const now = Date.now();
  const keys = Array.from(rateLimitStore.keys());
  for (const key of keys) {
    const entry = rateLimitStore.get(key);
    if (entry && now - entry.firstRequest > RATE_LIMIT.windowMs) {
      rateLimitStore.delete(key);
    }
  }
}

function evictOldestEntries(): void {
  const entries = Array.from(rateLimitStore.entries());
  entries.sort((a, b) => a[1].firstRequest - b[1].firstRequest);
  
  const toRemove = Math.floor(entries.length * 0.2);
  for (let i = 0; i < toRemove; i++) {
    rateLimitStore.delete(entries[i][0]);
  }
}

setInterval(cleanupExpiredEntries, 60 * 1000);

function getClientIdentifier(req: Request): string {
  const forwarded = req.headers["x-forwarded-for"];
  const ip = typeof forwarded === "string" 
    ? forwarded.split(",")[0].trim() 
    : req.socket.remoteAddress || "unknown";
  
  const userAgent = req.headers["user-agent"] || "unknown";
  
  return `${ip}:${userAgent.slice(0, 50)}`;
}

export function contactRateLimit(req: Request, res: Response, next: NextFunction) {
  const clientId = getClientIdentifier(req);
  const now = Date.now();
  
  const entry = rateLimitStore.get(clientId);
  
  if (!entry) {
    if (rateLimitStore.size >= MAX_STORE_SIZE) {
      cleanupExpiredEntries();
      
      if (rateLimitStore.size >= MAX_STORE_SIZE) {
        evictOldestEntries();
      }
    }
    
    rateLimitStore.set(clientId, { count: 1, firstRequest: now });
    return next();
  }
  
  if (now - entry.firstRequest > RATE_LIMIT.windowMs) {
    rateLimitStore.set(clientId, { count: 1, firstRequest: now });
    return next();
  }
  
  if (entry.count >= RATE_LIMIT.maxRequests) {
    console.warn(`Rate limit exceeded for client: ${clientId.slice(0, 30)}...`);
    return res.status(429).json({
      success: false,
      error: "Te veel verzoeken. Probeer het over een uur opnieuw.",
    });
  }
  
  entry.count++;
  return next();
}

export function getRateLimitStats(): { totalClients: number; entries: Map<string, RateLimitEntry> } {
  return {
    totalClients: rateLimitStore.size,
    entries: new Map(rateLimitStore),
  };
}
