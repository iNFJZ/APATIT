import * as cheerio from "cheerio";
import JSZip from "jszip";

export type ParagraphVisualHint = {
  textAlign?: "center" | "right" | "left" | "justify";
  color?: string;
};

export type BodyVisualSlot =
  | { kind: "paragraph"; hint: ParagraphVisualHint }
  | { kind: "table" };

function extractBodyInnerXml(documentXml: string): string | null {
  const bodyOpen = documentXml.match(/<w:body[^>]*>/);
  if (!bodyOpen || bodyOpen.index === undefined) {
    return null;
  }
  const start = bodyOpen.index + bodyOpen[0].length;
  const sectIdx = documentXml.indexOf("<w:sectPr", start);
  const end = sectIdx >= 0 ? sectIdx : documentXml.indexOf("</w:body>", start);
  if (end < 0) {
    return null;
  }
  return documentXml.slice(start, end);
}

function findWtblEnd(s: string, tblStart: number): number {
  let depth = 1;
  let i = tblStart + 1;
  while (depth > 0 && i < s.length) {
    const nextOpen = s.indexOf("<w:tbl", i);
    const nextClose = s.indexOf("</w:tbl>", i);
    if (nextClose < 0) {
      return s.length;
    }
    if (nextOpen >= 0 && nextOpen < nextClose) {
      depth += 1;
      i = nextOpen + 5;
    } else {
      depth -= 1;
      i = nextClose + "</w:tbl>".length;
    }
  }
  return i;
}

function iterateDirectBodySlots(bodyInner: string, onSlot: (slot: BodyVisualSlot) => void): void {
  let pos = 0;
  while (pos < bodyInner.length) {
    const sectIdx = bodyInner.indexOf("<w:sectPr", pos);
    const pIdx = bodyInner.indexOf("<w:p", pos);
    const tblIdx = bodyInner.indexOf("<w:tbl", pos);
    const nextCandidates: Array<{ kind: "p" | "tbl"; idx: number }> = [];
    if (pIdx >= 0) {
      nextCandidates.push({ kind: "p", idx: pIdx });
    }
    if (tblIdx >= 0) {
      nextCandidates.push({ kind: "tbl", idx: tblIdx });
    }
    if (nextCandidates.length === 0) {
      break;
    }
    nextCandidates.sort((a, b) => a.idx - b.idx);
    const next = nextCandidates[0];
    if (sectIdx >= 0 && sectIdx <= next.idx) {
      break;
    }
    if (next.kind === "p") {
      const end = bodyInner.indexOf("</w:p>", next.idx);
      if (end < 0) {
        break;
      }
      const endClose = end + "</w:p>".length;
      onSlot({ kind: "paragraph", hint: hintFromParagraphFragment(bodyInner.slice(next.idx, endClose)) });
      pos = endClose;
    } else {
      onSlot({ kind: "table" });
      pos = findWtblEnd(bodyInner, next.idx);
    }
  }
}

function parseJcToAlign(jcVal: string | undefined): ParagraphVisualHint["textAlign"] | undefined {
  if (!jcVal) {
    return undefined;
  }
  const v = jcVal.trim().toLowerCase();
  if (v === "center") {
    return "center";
  }
  if (v === "right") {
    return "right";
  }
  if (v === "both" || v === "distribute") {
    return "justify";
  }
  if (v === "left") {
    return "left";
  }
  return undefined;
}

function parseOoxmlColor(hexVal: string | undefined): string | undefined {
  if (!hexVal) {
    return undefined;
  }
  const normalized = hexVal.trim();
  if (!normalized || normalized.toLowerCase() === "auto") {
    return undefined;
  }
  const hex = normalized.replace(/^#/, "").toUpperCase();
  if (/^[0-9A-F]{6}$/.test(hex)) {
    return `#${hex}`;
  }
  return undefined;
}

function hintFromParagraphFragment(pXml: string): ParagraphVisualHint {
  const hint: ParagraphVisualHint = {};
  const jcMatch = pXml.match(/<w:jc\b[^>]*\bw:val="([^"]+)"/i);
  hint.textAlign = parseJcToAlign(jcMatch?.[1]);
  const colorPattern = /<w:color\b[^>]*\bw:val="([^"]+)"/gi;
  const distinct = new Set<string>();
  let colorMatch: RegExpExecArray | null;
  colorMatch = colorPattern.exec(pXml);
  while (colorMatch !== null) {
    const c = parseOoxmlColor(colorMatch[1]);
    if (c) {
      distinct.add(c);
    }
    colorMatch = colorPattern.exec(pXml);
  }
  if (distinct.size === 1) {
    const first = distinct.values().next();
    if (!first.done && first.value) {
      hint.color = first.value;
    }
  }
  return hint;
}

function mergeVisualStyle(existing: string, hint: ParagraphVisualHint): string {
  const parts: string[] = [];
  const existingTrim = existing.trim();
  if (existingTrim) {
    parts.push(existingTrim.replace(/;+\s*$/, ""));
  }
  if (hint.textAlign) {
    parts.push(`text-align: ${hint.textAlign}`);
  }
  if (hint.color) {
    parts.push(`color: ${hint.color}`);
  }
  return parts.join("; ");
}

async function loadBodyVisualSlots(docxBuffer: Buffer): Promise<BodyVisualSlot[]> {
  const zip = await JSZip.loadAsync(docxBuffer);
  const documentFile = zip.file("word/document.xml");
  if (!documentFile) {
    return [];
  }
  const documentXml = await documentFile.async("string");
  const bodyInner = extractBodyInnerXml(documentXml);
  if (!bodyInner) {
    return [];
  }
  const slots: BodyVisualSlot[] = [];
  iterateDirectBodySlots(bodyInner, (slot) => slots.push(slot));
  return slots;
}

function isBlockTagName(tag: string): boolean {
  const t = tag.toLowerCase();
  return t === "p" || /^h[1-6]$/.test(t) || t === "table";
}

/**
 * Applies paragraph-level justification and uniform run color from OOXML to the
 * matching top-level HTML blocks (same order as {@code w:body} children).
 */
export async function applyDocxParagraphVisualHints(
  docxBuffer: Buffer,
  htmlFragment: string,
): Promise<string> {
  const slots = await loadBodyVisualSlots(docxBuffer);
  if (slots.length === 0) {
    return htmlFragment;
  }
  const hasVisual = slots.some(
    (s) => s.kind === "paragraph" && (s.hint.textAlign != null || s.hint.color != null),
  );
  if (!hasVisual) {
    return htmlFragment;
  }
  const $ = cheerio.load(`<div class="docx-enrich-root">${htmlFragment}</div>`, null, false);
  let $blocksParent = $(".docx-enrich-root");
  if (
    $blocksParent.children().length === 1 &&
    $blocksParent.children().first().prop("tagName")?.toLowerCase() === "div"
  ) {
    $blocksParent = $blocksParent.children().first();
  }
  let slotIndex = 0;
  $blocksParent.children().each((_i, el) => {
    const tag = (el.tagName ?? "").toLowerCase();
    if (!isBlockTagName(tag)) {
      return;
    }
    while (slotIndex < slots.length) {
      const slot = slots[slotIndex];
      const isParaTag = tag === "p" || /^h[1-6]$/.test(tag);
      if (tag === "table" && slot.kind === "table") {
        slotIndex += 1;
        return;
      }
      if (isParaTag && slot.kind === "paragraph") {
        slotIndex += 1;
        const { hint } = slot;
        if (hint.textAlign != null || hint.color != null) {
          const elCheerio = $(el);
          elCheerio.attr("style", mergeVisualStyle(elCheerio.attr("style") ?? "", hint));
        }
        return;
      }
      slotIndex += 1;
    }
  });
  const out = $(".docx-enrich-root").html();
  return out ?? htmlFragment;
}
