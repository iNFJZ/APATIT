import { and, asc, desc, eq, ilike, or } from "drizzle-orm";
import { z } from "zod";
import { db } from "./db";
import {
  InsertPost,
  Post,
  UpdatePost,
  insertPostSchema,
  postTypeEnum,
  posts,
  updatePostSchema,
} from "@shared/schema";

const listPostsQuerySchema = z.object({
  type: z.enum(postTypeEnum.enumValues).optional(),
  search: z.string().trim().optional(),
  limit: z.coerce.number().int().min(1).max(50).default(12),
  offset: z.coerce.number().int().min(0).default(0),
  onlyPublished: z.coerce.boolean().default(true),
});

export type ListPostsQuery = z.infer<typeof listPostsQuerySchema>;

export interface CreatePostInput extends InsertPost {
  isPublished?: boolean;
}

export interface UpdatePostInput extends UpdatePost {
  isPublished?: boolean;
}

export async function listPosts(options: ListPostsQuery): Promise<Post[]> {
  const { type, search, limit, offset, onlyPublished } = listPostsQuerySchema.parse(options);
  const filters = [];
  if (type) {
    filters.push(eq(posts.type, type));
  }
  if (onlyPublished) {
    filters.push(eq(posts.isPublished, true));
  }
  if (search) {
    const pattern = `%${search}%`;
    filters.push(
      or(ilike(posts.title, pattern), ilike(posts.summary, pattern), ilike(posts.content, pattern)),
    );
  }
  const whereClause = filters.length > 0 ? and(...filters) : undefined;
  return db.query.posts.findMany({
    where: whereClause,
    orderBy: [desc(posts.publishedAt), asc(posts.title)],
    limit,
    offset,
  });
}

export async function getPostBySlug(slug: string, onlyPublished: boolean): Promise<Post | null> {
  const whereClause = onlyPublished
    ? and(eq(posts.slug, slug), eq(posts.isPublished, true))
    : eq(posts.slug, slug);
  const postList = await db.query.posts.findMany({
    where: whereClause,
    limit: 1,
  });
  if (postList.length === 0) {
    return null;
  }
  return postList[0] ?? null;
}

export async function createPost(input: CreatePostInput): Promise<Post> {
  const parsed = insertPostSchema.parse(input);
  const isPublishedValue = input.isPublished ?? false;
  const [inserted] = await db
    .insert(posts)
    .values({
      ...parsed,
      isPublished: isPublishedValue,
    })
    .returning();
  return inserted;
}

export async function updatePostById(id: string, input: UpdatePostInput): Promise<Post | null> {
  const parsed = updatePostSchema.parse(input);
  const [updated] = await db
    .update(posts)
    .set({
      ...parsed,
      isPublished: input.isPublished ?? undefined,
    })
    .where(eq(posts.id, id))
    .returning();
  return updated ?? null;
}

export async function deletePostById(id: string): Promise<boolean> {
  const [deleted] = await db.delete(posts).where(eq(posts.id, id)).returning({ id: posts.id });
  return Boolean(deleted);
}

