import DOMPurify from "dompurify";

const ALLOWED_TAGS = [
  "p",
  "br",
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
  "ul",
  "ol",
  "li",
];
const ALLOWED_ATTR = ["href", "target", "rel", "src", "alt", "title", "class"];

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
  return /<\s*(p|div|span|figure|figcaption|img|h2|h3|ul|ol|li|br|strong|em|b|i|u|a)\b/i.test(
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

  const sanitized = DOMPurify.sanitize(content, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ADD_ATTR: ["target"],
  });

  return (
    <div
      className={`prose prose-slate max-w-none text-muted-foreground [&_figure]:my-8 [&_figure_img]:w-full [&_figure_img]:rounded-xl [&_figure_img]:shadow-md [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-muted-foreground [&_figcaption]:mt-2 [&_img]:rounded-xl [&_img]:shadow-md ${className}`}
      dangerouslySetInnerHTML={{ __html: sanitized }}
    />
  );
}
