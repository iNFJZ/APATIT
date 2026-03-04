import { and, asc, desc, eq, ilike, or } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import {
  InsertProduct,
  Product,
  UpdateProduct,
  insertProductSchema,
  products,
  updateProductSchema,
} from "@shared/schema";

const listProductsQuerySchema = z.object({
  search: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  offset: z.coerce.number().int().min(0).default(0),
  onlyPublished: z.coerce.boolean().default(true),
});

export type ListProductsQuery = z.infer<typeof listProductsQuerySchema>;

export interface CreateProductInput extends InsertProduct {
  isPublished?: boolean;
}

export interface UpdateProductInput extends UpdateProduct {
  isPublished?: boolean;
}

export async function listProducts(options: ListProductsQuery): Promise<Product[]> {
  const { search, limit, offset, onlyPublished } = listProductsQuerySchema.parse(options);
  const filters = [];
  if (onlyPublished) {
    filters.push(eq(products.isPublished, true));
  }
  if (search) {
    const pattern = `%${search}%`;
    filters.push(
      or(
        ilike(products.name, pattern),
        ilike(products.category, pattern),
        ilike(products.shortDescription, pattern),
        ilike(products.description, pattern),
      ),
    );
  }
  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  return db.query.products.findMany({
    where: whereClause,
    orderBy: [desc(products.publishedAt), asc(products.name)],
    limit,
    offset,
  });
}

export async function getProductBySlug(slug: string, onlyPublished: boolean): Promise<Product | null> {
  const whereClause = onlyPublished
    ? and(eq(products.slug, slug), eq(products.isPublished, true))
    : eq(products.slug, slug);
  const productList = await db.query.products.findMany({
    where: whereClause,
    limit: 1,
  });
  if (productList.length === 0) {
    return null;
  }
  return productList[0] ?? null;
}

export async function createProduct(input: CreateProductInput): Promise<Product> {
  const parsed = insertProductSchema.parse(input);
  const isPublishedValue = input.isPublished ?? false;
  const [inserted] = await db
    .insert(products)
    .values({
      ...parsed,
      isPublished: isPublishedValue,
    })
    .returning();
  return inserted;
}

export async function updateProductById(id: string, input: UpdateProductInput): Promise<Product | null> {
  const parsed = updateProductSchema.parse(input);
  const [updated] = await db
    .update(products)
    .set({
      ...parsed,
      isPublished: input.isPublished ?? undefined,
    })
    .where(eq(products.id, id))
    .returning();
  return updated ?? null;
}

export async function deleteProductById(id: string): Promise<boolean> {
  const [deleted] = await db
    .delete(products)
    .where(eq(products.id, id))
    .returning({ id: products.id });
  return Boolean(deleted);
}

