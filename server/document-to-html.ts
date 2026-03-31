import mammoth from "mammoth";
import { applyDocxParagraphVisualHints } from "./docx-visual-enrich";

export type ConvertDocxBufferToHtmlInput = {
  docxBuffer: Buffer;
  conversionId: string;
  uploadImage: (input: {
    buffer: Buffer;
    contentType: string;
    conversionId: string;
    fileName: string;
  }) => Promise<{ url: string }>;
};

export type ConvertDocxBufferToHtmlResult = {
  html: string;
  titleFromFirstLine: string;
};

type MammothImage = {
  contentType: string;
  read: (format: "base64") => Promise<string>;
};

const IMAGE_EXTENSION_BY_MIME_TYPE: Readonly<Record<string, string>> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/svg+xml": "svg",
};

const MIME_TYPE_BY_FILE_EXTENSION: Readonly<Record<string, string>> = {
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  svg: "image/svg+xml",
  emf: "image/emf",
  wmf: "image/wmf",
};

function getImageExtension(contentType: string | undefined): string {
  if (!contentType) {
    return "img";
  }
  const ext = IMAGE_EXTENSION_BY_MIME_TYPE[contentType];
  return ext ?? "img";
}

function getTitleFromRawText(rawText: string): string {
  const normalized = rawText.replace(/\r/g, "\n");
  const lines = normalized
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
  const firstLine = lines[0] ?? "";
  return firstLine;
}

function getContentTypeFromFileName(fileName: string): string {
  const ext = fileName.includes(".") ? fileName.split(".").pop()!.toLowerCase() : "";
  return MIME_TYPE_BY_FILE_EXTENSION[ext] ?? "application/octet-stream";
}

/**
 * Pandoc preserves inline styles, alignment, and colors far better than Mammoth,
 * which intentionally maps to minimal semantic HTML.
 */
async function convertDocxBufferToHtmlWithPandoc(
  input: ConvertDocxBufferToHtmlInput,
): Promise<string | null> {
  const { convert: pandocConvert } = await import("pandoc-wasm");
  const blob = new Blob([new Uint8Array(input.docxBuffer)]);
  const result = await pandocConvert(
    {
      from: "docx",
      to: "html",
      standalone: false,
      "extract-media": "media",
      "input-files": ["document.docx"],
    },
    null,
    { "document.docx": blob },
  );
  const stdout = result.stdout?.trim() ?? "";
  if (!stdout) {
    return null;
  }
  if (result.stderr?.includes("ERROR")) {
    return null;
  }
  let html = result.stdout;
  const mediaPaths = Object.keys(result.mediaFiles).sort((a, b) => b.length - a.length);
  for (const virtualPath of mediaPaths) {
    const mediaBlob = result.mediaFiles[virtualPath];
    const buffer = Buffer.from(await mediaBlob.arrayBuffer());
    const baseName = virtualPath.includes("/") ? virtualPath.split("/").pop()! : virtualPath;
    const uploaded = await input.uploadImage({
      buffer,
      contentType: getContentTypeFromFileName(baseName),
      conversionId: input.conversionId,
      fileName: baseName,
    });
    html = html.split(virtualPath).join(uploaded.url);
  }
  return html;
}

async function convertDocxBufferToHtmlWithMammoth(
  input: ConvertDocxBufferToHtmlInput,
): Promise<string> {
  let imageIndex = 0;
  const convertImage = mammoth.images.imgElement(async (image: MammothImage) => {
    const imageBufferBase64 = await image.read("base64");
    const extension = getImageExtension(image.contentType);
    const fileName = `image-${imageIndex}.${extension}`;
    imageIndex += 1;
    const imageBuffer = Buffer.from(imageBufferBase64, "base64");
    const uploaded = await input.uploadImage({
      buffer: imageBuffer,
      contentType: image.contentType ?? "application/octet-stream",
      conversionId: input.conversionId,
      fileName,
    });
    return {
      src: uploaded.url,
      alt: "",
    };
  });
  const conversion = await mammoth.convertToHtml(
    { buffer: input.docxBuffer },
    {
      styleMap: [
        "p[style-name='Title'] => h2:fresh",
        "p[style-name='Heading 1'] => h2:fresh",
        "p[style-name='Heading 2'] => h3:fresh",
      ],
      convertImage,
    },
  );
  return conversion.value ?? "";
}

/**
 * Converts an uploaded DOCX buffer into HTML and uploads embedded images.
 * Uses Pandoc when possible for richer formatting; falls back to Mammoth.
 * The resulting HTML is a fragment intended to be sanitized on render.
 */
export async function convertDocxBufferToHtml(
  input: ConvertDocxBufferToHtmlInput,
): Promise<ConvertDocxBufferToHtmlResult> {
  const rawTextResult = await mammoth.extractRawText({ buffer: input.docxBuffer });
  const titleFromFirstLine = getTitleFromRawText(rawTextResult.value ?? "");
  let htmlValue: string | null = null;
  try {
    htmlValue = await convertDocxBufferToHtmlWithPandoc(input);
  } catch {
    htmlValue = null;
  }
  if (!htmlValue) {
    htmlValue = await convertDocxBufferToHtmlWithMammoth(input);
  }
  const enrichedHtml = await applyDocxParagraphVisualHints(input.docxBuffer, htmlValue);
  return { html: enrichedHtml, titleFromFirstLine };
}

