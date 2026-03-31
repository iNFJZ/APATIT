import type { Express } from "express";
import rateLimit from "express-rate-limit";
import { type Server } from "http";
import multer from "multer";
import { type FileFilterCallback } from "multer";
import path from "path";
import { randomUUID } from "crypto";
import { storage } from "./storage";
import { z } from "zod";
import bcrypt from "bcryptjs";
import {
  createPost,
  deletePostById,
  getPostById,
  getPostBySlug,
  listPosts,
  type ListPostsQuery,
  updatePostById,
} from "./posts-repository";
import {
  createProduct,
  deleteProductById,
  getProductBySlug,
  listProducts,
  type ListProductsQuery,
  updateProductById,
} from "./products-repository";
import { convertDocxBufferToHtml } from "./document-to-html";import { buildImageStorage } from "./image-storage";

declare module "express-session" {
  interface SessionData {
    userId?: string;
  }
}

type PublicUser = {
  id: string;
  username: string;
};

function getPublicUser(user: { id: string; username: string }): PublicUser {
  return { id: user.id, username: user.username };
}

function assertAuthenticated(sessionUserId?: string): asserts sessionUserId is string {
  if (!sessionUserId) {
    throw Object.assign(new Error("Unauthorized"), { status: 401 });
  }
}

function createSlugFromTitle(title: string): string {
  const normalized = title
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  if (normalized) {
    return normalized;
  }
  return `post-${Date.now()}`;
}

async function createUniqueSlug(baseSlug: string, excludePostId?: string): Promise<string> {
  let candidate = baseSlug;
  let suffix = 2;
  while (true) {
    const existing = await getPostBySlug(candidate, false);
    if (!existing || existing.id === excludePostId) {
      return candidate;
    }
    candidate = `${baseSlug}-${suffix}`;
    suffix += 1;
  }
}

function collectAssetUrlsFromHtml(html: string): string[] {
  const result: string[] = [];
  const attributeRegex = /(src|href)=["']([^"']+)["']/gi;
  let match = attributeRegex.exec(html);
  while (match) {
    const url = match[2];
    if (url) {
      result.push(url.trim());
    }
    match = attributeRegex.exec(html);
  }
  return result;
}

function tryExtractKeyFromAssetUrl(assetUrl: string, uploadsPublicBaseUrl: string): string | null {
  if (!assetUrl) {
    return null;
  }
  if (assetUrl.startsWith(`${uploadsPublicBaseUrl}/`)) {
    return assetUrl.slice(`${uploadsPublicBaseUrl}/`.length).trim() || null;
  }
  const s3BaseUrl = process.env.S3_BASE_URL;
  if (s3BaseUrl && assetUrl.startsWith(`${s3BaseUrl}/`)) {
    return assetUrl.slice(`${s3BaseUrl}/`.length).trim() || null;
  }
  return null;
}

function collectManagedAssetKeys(post: { content: string; imageUrl: string | null }): string[] {
  const uploadsPublicBaseUrl = "/uploads";
  const candidates = [...collectAssetUrlsFromHtml(post.content)];
  if (post.imageUrl) {
    candidates.push(post.imageUrl);
  }
  const keys = candidates
    .map((url) => tryExtractKeyFromAssetUrl(url, uploadsPublicBaseUrl))
    .filter((key): key is string => Boolean(key && key.startsWith("docx-images/")));
  return Array.from(new Set(keys));
}

export async function registerRoutes(httpServer: Server, app: Express): Promise<Server> {
  const uploadsRootDir = path.resolve(process.cwd(), "uploads");
  const imageStorage = buildImageStorage({
    uploadsRootDir,
    uploadsPublicBaseUrl: "/uploads",
  });
  const docxImageSubdir = "docx-images";
  const staffUsername = process.env.STAFF_USERNAME ?? "admin";
  const staffPassword = process.env.STAFF_PASSWORD ?? "admin";

  const existingStaffUser = await storage.getUserByUsername(staffUsername);
  if (!existingStaffUser && process.env.NODE_ENV !== "production") {
    const passwordHash = await bcrypt.hash(staffPassword, 10);
    await storage.createUser({ username: staffUsername, password: passwordHash });
  } else if (existingStaffUser && process.env.NODE_ENV !== "production") {
    const isBcryptHash = existingStaffUser.password.startsWith("$2");
    if (!isBcryptHash) {
      const passwordHash = await bcrypt.hash(staffPassword, 10);
      await storage.updateUserPasswordById(existingStaffUser.id, passwordHash);
    }
  }

  const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
  });

  const loginRateLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: { message: "Too many login attempts. Try again later." },
    standardHeaders: true,
    legacyHeaders: false,
  });

  const maxDocxUploadBytes = 50 * 1024 * 1024;
  const uploadDocx = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: maxDocxUploadBytes },
    fileFilter: (
      _req: Express.Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const allowedExtensions = new Set([".doc", ".docx"]);
      if (!allowedExtensions.has(ext)) {
        cb(null, false);
        return;
      }
      cb(null, true);
    },
  });

  app.get("/api/me", async (req, res) => {
    if (!req.session.userId) {
      return res.json({ isAuthenticated: false as const });
    }
    const user = await storage.getUser(req.session.userId);
    if (!user) {
      req.session.userId = undefined;
      return res.json({ isAuthenticated: false as const });
    }
    return res.json({ isAuthenticated: true as const, user: getPublicUser(user) });
  });

  app.post("/api/login", loginRateLimiter, async (req, res) => {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid payload" });
    }
    const { username, password } = parsed.data;
    const user = await storage.getUserByUsername(username);
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    req.session.userId = user.id;
    return res.json({ user: getPublicUser(user) });
  });

  app.post("/api/logout", async (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Failed to logout" });
      }
      res.clearCookie("vinaapaco.sid");
      return res.json({ ok: true });
    });
  });

  app.get("/api/posts", async (req, res, next) => {
    try {
      const { type, search, limit, offset, onlyPublished } = req.query;
      const query = {
        type: typeof type === "string" ? type : undefined,
        search: typeof search === "string" ? search : undefined,
        limit,
        offset,
        onlyPublished: onlyPublished !== "false",
      } as unknown as ListPostsQuery;
      const posts = await listPosts(query);
      return res.json({ posts });
    } catch (err) {
      return next(err);
    }
  });

  app.get("/api/posts/by-id/:id", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const post = await getPostById(req.params.id);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({ post });
    } catch (err) {
      return next(err);
    }
  });

  app.get("/api/posts/:slug", async (req, res, next) => {
    try {
      const onlyPublished = req.query.onlyPublished !== "false";
      const post = await getPostBySlug(req.params.slug, onlyPublished);
      if (!post) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({ post });
    } catch (err) {
      return next(err);
    }
  });

  app.post("/api/posts", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const created = await createPost(req.body);
      return res.status(201).json({ post: created });
    } catch (err) {
      return next(err);
    }
  });

  app.post("/api/posts/from-document", uploadDocx.single("document"), async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const file = (req as Express.Request & { file?: Express.Multer.File }).file;
      if (!file) {
        return res.status(400).json({ message: "Vui lòng chọn file Word/Docs." });
      }
      const fileExt = path.extname(file.originalname).toLowerCase();
      if (fileExt !== ".docx") {
        return res.status(400).json({
          message: "Hiện tại chỉ hỗ trợ chuyển file `.docx`. Vui lòng xuất Word sang `.docx` rồi thử lại.",
        });
      }
      const fromDocumentSchema = z.object({
        type: z.enum(["NEWS", "ANNOUNCEMENT"]),
        imageUrl: z.string().trim().optional(),
        publishedAt: z.string().min(1),
        isPublished: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
      });
      const parsedBody = fromDocumentSchema.parse(req.body);
      const conversionId = randomUUID();
      const { html, titleFromFirstLine } = await convertDocxBufferToHtml({
        docxBuffer: file.buffer,
        conversionId,
        uploadImage: ({ buffer, contentType, conversionId: imageConversionId, fileName }) =>
          imageStorage.uploadImage({
            buffer,
            contentType,
            key: `${docxImageSubdir}/${imageConversionId}/${fileName}`,
          }),
      });
      const generatedTitle = titleFromFirstLine || "Bai viet moi";
      const generatedSlug = await createUniqueSlug(createSlugFromTitle(generatedTitle));
      const created = await createPost({
        slug: generatedSlug,
        title: generatedTitle,
        summary: "",
        content: html,
        imageUrl: parsedBody.imageUrl?.trim() ? parsedBody.imageUrl.trim() : null,
        type: parsedBody.type,
        publishedAt: new Date(parsedBody.publishedAt),
        isPublished: parsedBody.isPublished ?? false,
      });
      return res.status(201).json({ post: created });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const msg = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
        return res.status(400).json({ message: msg || "Dữ liệu không hợp lệ" });
      }
      return next(err);
    }
  });

  app.patch("/api/posts/:id", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const updated = await updatePostById(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Post not found" });
      }
      return res.json({ post: updated });
    } catch (err) {
      if (err instanceof z.ZodError) {
        const msg = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
        return res.status(400).json({ message: msg || "Dữ liệu không hợp lệ" });
      }
      return next(err);
    }
  });

  app.patch(
    "/api/posts/:id/from-document",
    uploadDocx.single("document"),
    async (req, res, next) => {
      try {
        assertAuthenticated(req.session.userId);
        const file = (req as Express.Request & { file?: Express.Multer.File }).file;
        if (!file) {
          return res.status(400).json({ message: "Vui lòng chọn file Word/Docs." });
        }
        const fileExt = path.extname(file.originalname).toLowerCase();
        if (fileExt !== ".docx") {
          return res.status(400).json({
            message: "Hiện tại chỉ hỗ trợ chuyển file `.docx`. Vui lòng xuất Word sang `.docx` rồi thử lại.",
          });
        }
        const fromDocumentSchema = z.object({
          type: z.enum(["NEWS", "ANNOUNCEMENT"]),
          imageUrl: z.string().trim().optional(),
          publishedAt: z.string().min(1),
          isPublished: z.enum(["true", "false"]).transform((value) => value === "true").optional(),
        });
        const parsedBody = fromDocumentSchema.parse(req.body);
        const conversionId = randomUUID();
        const { html, titleFromFirstLine } = await convertDocxBufferToHtml({
          docxBuffer: file.buffer,
          conversionId,
          uploadImage: ({ buffer, contentType, conversionId: imageConversionId, fileName }) =>
            imageStorage.uploadImage({
              buffer,
              contentType,
              key: `${docxImageSubdir}/${imageConversionId}/${fileName}`,
            }),
        });
        const postIdParam = req.params.id;
        if (Array.isArray(postIdParam)) {
          return res.status(400).json({ message: "Invalid post id." });
        }
        const generatedTitle = titleFromFirstLine || "Bai viet moi";
        const generatedSlug = await createUniqueSlug(createSlugFromTitle(generatedTitle), postIdParam);
        const updated = await updatePostById(postIdParam, {
          slug: generatedSlug,
          title: generatedTitle,
          summary: "",
          content: html,
          imageUrl: parsedBody.imageUrl?.trim() ? parsedBody.imageUrl.trim() : null,
          type: parsedBody.type,
          publishedAt: new Date(parsedBody.publishedAt),
          isPublished: parsedBody.isPublished ?? false,
        });
        if (!updated) {
          return res.status(404).json({ message: "Post not found" });
        }
        return res.json({ post: updated });
      } catch (err) {
        if (err instanceof z.ZodError) {
          const msg = err.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join("; ");
          return res.status(400).json({ message: msg || "Dữ liệu không hợp lệ" });
        }
        return next(err);
      }
    },
  );

  app.delete("/api/posts/:id", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const existingPost = await getPostById(req.params.id);
      if (!existingPost) {
        return res.status(404).json({ message: "Post not found" });
      }
      const assetKeys = collectManagedAssetKeys({
        content: existingPost.content,
        imageUrl: existingPost.imageUrl,
      });
      const deleted = await deletePostById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Post not found" });
      }
      if (assetKeys.length > 0) {
        try {
          await imageStorage.deleteImages(assetKeys);
        } catch (err) {
          console.error("Failed to cleanup post assets:", err);
        }
      }
      return res.json({ ok: true });
    } catch (err) {
      return next(err);
    }
  });

  app.get("/api/products", async (req, res, next) => {
    try {
      const { search, limit, offset, onlyPublished } = req.query;
      const query = {
        search: typeof search === "string" ? search : undefined,
        limit,
        offset,
        onlyPublished: onlyPublished !== "false",
      } as unknown as ListProductsQuery;
      const products = await listProducts(query);
      return res.json({ products });
    } catch (err) {
      return next(err);
    }
  });

  app.get("/api/products/:slug", async (req, res, next) => {
    try {
      const onlyPublished = req.query.onlyPublished !== "false";
      const product = await getProductBySlug(req.params.slug, onlyPublished);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json({ product });
    } catch (err) {
      return next(err);
    }
  });

  app.post("/api/products", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const created = await createProduct(req.body);
      return res.status(201).json({ product: created });
    } catch (err) {
      return next(err);
    }
  });

  app.patch("/api/products/:id", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const updated = await updateProductById(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json({ product: updated });
    } catch (err) {
      return next(err);
    }
  });

  app.delete("/api/products/:id", async (req, res, next) => {
    try {
      assertAuthenticated(req.session.userId);
      const deleted = await deleteProductById(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Product not found" });
      }
      return res.json({ ok: true });
    } catch (err) {
      return next(err);
    }
  });

  app.use("/api", (_req, res) => {
    return res.status(404).json({ message: "Not found" });
  });

  return httpServer;
}
