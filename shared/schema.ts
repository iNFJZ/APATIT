import { sql } from "drizzle-orm";
import { boolean, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core";
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

export const postTypeEnum = pgEnum("post_type", ["NEWS", "ANNOUNCEMENT"]);

export const posts = pgTable("posts", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  content: text("content").notNull(),
  imageUrl: text("image_url"),
  type: postTypeEnum("type").notNull().default("NEWS"),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
  isPublished: boolean("is_published").notNull().default(false),
});

export const insertPostSchema = createInsertSchema(posts).pick({
  slug: true,
  title: true,
  summary: true,
  content: true,
  imageUrl: true,
  type: true,
  publishedAt: true,
});

export const updatePostSchema = insertPostSchema.partial();

export type InsertPost = z.infer<typeof insertPostSchema>;
export type UpdatePost = z.infer<typeof updatePostSchema>;
export type Post = typeof posts.$inferSelect;

export const products = pgTable("products", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  priceLabel: text("price_label").notNull().default("Liên hệ"),
  imageUrl: text("image_url"),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  isPublished: boolean("is_published").notNull().default(false),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull(),
});

export const insertProductSchema = createInsertSchema(products).pick({
  slug: true,
  name: true,
  category: true,
  priceLabel: true,
  imageUrl: true,
  shortDescription: true,
  description: true,
  publishedAt: true,
});

export const updateProductSchema = insertProductSchema.partial();

export type InsertProduct = z.infer<typeof insertProductSchema>;
export type UpdateProduct = z.infer<typeof updateProductSchema>;
export type Product = typeof products.$inferSelect;
