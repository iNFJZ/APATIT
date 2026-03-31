import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
  "h1",
  "strong",
  "em",
  "b",
  "i",
  "u",
  "a",
  "img",
  "figure",
  "figcaption",
  "div",
  "span",
  "h2",
  "h3",
  "table",
  "colgroup",
  "col",
  "thead",
  "tbody",
  "tr",
  "th",
  "td",
  "sup",
  "sub",
  "blockquote",
  "ul",
  "ol",
  "li",
  "iframe",
  "video",
  "source",
];
const ALLOWED_ATTR = [
  "href",
  "target",
  "rel",
  "src",
  "alt",
  "title",
  "class",
  "id",
  "style",
  "allow",
  "allowfullscreen",
  "frameborder",
  "width",
  "height",
  "controls",
  "preload",
  "poster",
  "type",
  "referrerpolicy",
];

type VideoEmbed =
  | {
      kind: "iframe";
      src: string;
    }
  | {
      kind: "video";
      src: string;
    };

function parseVideoEmbedFromUrl(url: string): VideoEmbed | null {
  const trimmedUrl = url.trim();
  if (!trimmedUrl) {
    return null;
  }
  let parsedUrl: URL;
  try {
    parsedUrl = new URL(trimmedUrl);
  } catch (_err) {
    return null;
  }
  const host = parsedUrl.hostname.toLowerCase();
  if (host === "youtu.be") {
    const id = parsedUrl.pathname.replace("/", "").trim();
    if (!id) {
      return null;
    }
    return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
  }
  if (host.includes("youtube.com")) {
    const id = parsedUrl.searchParams.get("v")?.trim();
    if (id) {
      return { kind: "iframe", src: `https://www.youtube.com/embed/${id}` };
    }
    if (parsedUrl.pathname.startsWith("/embed/")) {
      return { kind: "iframe", src: `https://www.youtube.com${parsedUrl.pathname}` };
    }
  }
  if (host.includes("vimeo.com")) {
    const videoId = parsedUrl.pathname.split("/").filter(Boolean).pop();
    if (!videoId) {
      return null;
    }
    return { kind: "iframe", src: `https://player.vimeo.com/video/${videoId}` };
  }
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(parsedUrl.pathname + parsedUrl.search)) {
    return { kind: "video", src: trimmedUrl };
  }
  return null;
}

function replaceVideoLinksWithEmbeds(html: string): string {
  if (typeof window === "undefined") {
    return html;
  }
  const parser = new window.DOMParser();
  const doc = parser.parseFromString(`<div id="post-content-root">${html}</div>`, "text/html");
  const root = doc.querySelector("#post-content-root");
  if (!root) {
    return html;
  }
  const links = root.querySelectorAll("a[href]");
  links.forEach((link) => {
    const href = link.getAttribute("href");
    if (!href) {
      return;
    }
    const embed = parseVideoEmbedFromUrl(href);
    if (!embed) {
      return;
    }
    const wrapper = doc.createElement("div");
    wrapper.setAttribute("class", "doc-video");
    if (embed.kind === "iframe") {
      const iframe = doc.createElement("iframe");
      iframe.setAttribute("src", embed.src);
      iframe.setAttribute("title", "Embedded video");
      iframe.setAttribute("width", "560");
      iframe.setAttribute("height", "315");
      iframe.setAttribute("frameborder", "0");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share");
      iframe.setAttribute("allowfullscreen", "true");
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.setAttribute("class", "w-full aspect-video rounded-xl border");
      wrapper.appendChild(iframe);
    } else {
      const video = doc.createElement("video");
      video.setAttribute("controls", "true");
      video.setAttribute("preload", "metadata");
      video.setAttribute("class", "w-full rounded-xl border");
      const source = doc.createElement("source");
      source.setAttribute("src", embed.src);
      const sourceUrl = new URL(embed.src);
      if (sourceUrl.pathname.endsWith(".webm")) {
        source.setAttribute("type", "video/webm");
      } else if (sourceUrl.pathname.endsWith(".ogg")) {
        source.setAttribute("type", "video/ogg");
      } else {
        source.setAttribute("type", "video/mp4");
      }
      video.appendChild(source);
      wrapper.appendChild(video);
    }
    const paragraph = link.parentElement;
    if (paragraph && paragraph.tagName.toLowerCase() === "p" && paragraph.textContent?.trim() === link.textContent?.trim()) {
      paragraph.replaceWith(wrapper);
      return;
    }
    link.replaceWith(wrapper);
  });
  return root.innerHTML;
}

function looksLikeHtml(text: string): boolean {
  const trimmed = text.trim();
  if (!trimmed) {
    return false;
  }
  const hasHtmlTag = /<\s*[a-z][a-z0-9-]*\b[^>]*>/i.test(trimmed);
  if (!hasHtmlTag) {
    return false;
  }
  // Only treat as HTML when we detect tags we explicitly support.
  // This avoids converting random "<3" or similar text into HTML mode.
  return /<\s*(p|div|span|figure|figcaption|img|h1|h2|h3|ul|ol|li|br|strong|em|b|i|u|a|table|colgroup|col|thead|tbody|tr|th|td|blockquote)\b/i.test(
    trimmed,
  );
}

interface PostContentProps {
  content: string;
  className?: string;
}

/**
 * Renders post body: plain text (whitespace-pre-line) or sanitized HTML (e.g. with embedded images).
 */
export function PostContent({ content, className = "" }: PostContentProps) {
  if (!content) {
    return null;
  }

  if (!looksLikeHtml(content)) {
    return (
      <div className={className}>
        <p className="whitespace-pre-line text-muted-foreground leading-relaxed">
          {content}
        </p>
      </div>
    );
  }

  const contentWithEmbeds = replaceVideoLinksWithEmbeds(content);
  const sanitized = DOMPurify.sanitize(contentWithEmbeds, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ADD_ATTR: ["target"],
  });

  return (
    <div
      className={`prose prose-slate max-w-none text-muted-foreground [&_strong]:text-inherit [&_em]:text-inherit [&_b]:text-inherit [&_i]:text-inherit [&_figure]:my-8 [&_figure_img]:w-full [&_figure_img]:rounded-xl [&_figure_img]:shadow-md [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:mt-2 [&_img]:rounded-xl [&_img]:shadow-md [&_.doc-video]:my-8 [&_.doc-video_iframe]:w-full [&_.doc-video_iframe]:aspect-video [&_.doc-video_video]:w-full ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
