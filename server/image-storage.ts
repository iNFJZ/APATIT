import fs from "fs/promises";
import path from "path";
import { DeleteObjectsCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

export type UploadImageInput = {
  buffer: Buffer;
  contentType: string;
  key: string;
};

export type UploadImageResult = {
  url: string;
};

export interface ImageStorage {
  uploadImage(input: UploadImageInput): Promise<UploadImageResult>;
  deleteImages(keys: string[]): Promise<void>;
}

type LocalImageStorageConfig = {
  uploadsRootDir: string;
  uploadsPublicBaseUrl: string;
};

class LocalImageStorage implements ImageStorage {
  private readonly config: LocalImageStorageConfig;
  public constructor(config: LocalImageStorageConfig) {
    this.config = config;
  }
  public async uploadImage(input: UploadImageInput): Promise<UploadImageResult> {
    const filePath = path.join(this.config.uploadsRootDir, input.key);
    const parentDir = path.dirname(filePath);
    await fs.mkdir(parentDir, { recursive: true });
    await fs.writeFile(filePath, input.buffer);
    const normalizedKey = input.key.split(path.sep).join("/");
    return { url: `${this.config.uploadsPublicBaseUrl}/${normalizedKey}` };
  }
  public async deleteImages(keys: string[]): Promise<void> {
    await Promise.all(
      keys.map(async (key) => {
        try {
          const filePath = path.join(this.config.uploadsRootDir, key);
          await fs.rm(filePath, { force: true });
        } catch (_err) {
          // Best-effort cleanup: ignore missing files and continue.
        }
      }),
    );
  }
}

type S3ImageStorageConfig = {
  bucket: string;
  baseUrl: string;
  region: string;
  endpoint?: string;
  forcePathStyle: boolean;
  accessKeyId: string;
  secretAccessKey: string;
};

class S3ImageStorage implements ImageStorage {
  private readonly client: S3Client;
  private readonly config: S3ImageStorageConfig;
  public constructor(config: S3ImageStorageConfig) {
    this.config = config;
    this.client = new S3Client({
      region: config.region,
      endpoint: config.endpoint,
      forcePathStyle: config.forcePathStyle,
      credentials: {
        accessKeyId: config.accessKeyId,
        secretAccessKey: config.secretAccessKey,
      },
    });
  }
  public async uploadImage(input: UploadImageInput): Promise<UploadImageResult> {
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.config.bucket,
        Key: input.key,
        Body: input.buffer,
        ContentType: input.contentType,
      }),
    );
    const normalizedKey = input.key.split(path.sep).join("/");
    return { url: `${this.config.baseUrl}/${normalizedKey}` };
  }
  public async deleteImages(keys: string[]): Promise<void> {
    if (keys.length === 0) {
      return;
    }
    const objects = keys.map((key) => ({ Key: key }));
    await this.client.send(
      new DeleteObjectsCommand({
        Bucket: this.config.bucket,
        Delete: { Objects: objects, Quiet: true },
      }),
    );
  }
}

type BuildImageStorageInput = {
  uploadsRootDir: string;
  uploadsPublicBaseUrl: string;
};

function hasS3Env(): boolean {
  return Boolean(
    process.env.S3_BUCKET &&
      process.env.S3_REGION &&
      process.env.S3_BASE_URL &&
      process.env.S3_ACCESS_KEY_ID &&
      process.env.S3_SECRET_ACCESS_KEY,
  );
}

function isForcePathStyleEnabled(): boolean {
  return process.env.S3_FORCE_PATH_STYLE === "true";
}

function getStorageProvider(): "local" | "s3" {
  const provider = process.env.IMAGE_STORAGE_PROVIDER;
  if (provider === "local" || provider === "s3") {
    return provider;
  }
  if (hasS3Env()) {
    return "s3";
  }
  return "local";
}

function assertRequiredS3Env(): void {
  const required = [
    "S3_BUCKET",
    "S3_REGION",
    "S3_BASE_URL",
    "S3_ACCESS_KEY_ID",
    "S3_SECRET_ACCESS_KEY",
  ] as const;
  const missing = required.filter((name) => !process.env[name]);
  if (missing.length > 0) {
    throw new Error(
      `Missing required S3 env variables: ${missing.join(", ")}. ` +
        "Set IMAGE_STORAGE_PROVIDER=local to use local disk storage.",
    );
  }
}

export function buildImageStorage(input: BuildImageStorageInput): ImageStorage {
  const provider = getStorageProvider();
  if (provider === "local") {
    return new LocalImageStorage({
      uploadsRootDir: input.uploadsRootDir,
      uploadsPublicBaseUrl: input.uploadsPublicBaseUrl,
    });
  }
  assertRequiredS3Env();
  return new S3ImageStorage({
    bucket: process.env.S3_BUCKET as string,
    baseUrl: process.env.S3_BASE_URL as string,
    region: process.env.S3_REGION as string,
    endpoint: process.env.S3_ENDPOINT,
    forcePathStyle: isForcePathStyleEnabled(),
    accessKeyId: process.env.S3_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY as string,
  });
}
