import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Blog post types (static content, not database-backed)
export interface BlogPostTranslations {
  title: string;
  excerpt: string;
  content: string;
  metaDescription: string;
  keywords: string[];
  category?: string;
  author: {
    name: string;
    role: string;
    bio: string;
  };
}

export interface BlogPost {
  slug: string;
  publishDate: string; // ISO date string
  readingTime: number; // minutes
  ogImage?: string;
  translations: {
    nl: BlogPostTranslations;
    en: BlogPostTranslations;
  };
}

// SEO page types (for future landing pages)
export interface SEOPage {
  slug: string;
  title: string;
  metaDescription: string;
  content: string;
  keywords: string[];
  ogImage?: string;
  schema?: Record<string, any>; // Custom schema per page
}
