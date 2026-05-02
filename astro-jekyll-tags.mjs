import { liteAdaptor } from "mathjax-full/js/adaptors/liteAdaptor.js";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html.js";
import { AllPackages } from "mathjax-full/js/input/tex/AllPackages.js";
import { TeX } from "mathjax-full/js/input/tex.js";
import { SVG } from "mathjax-full/js/output/svg.js";
import { mathjax } from "mathjax-full/js/mathjax.js";

let _mjxAdapter;
let _mjxDoc;

function getMjx() {
  if (!_mjxDoc) {
    _mjxAdapter = liteAdaptor();
    RegisterHTMLHandler(_mjxAdapter);
    _mjxDoc = mathjax.document("", {
      InputJax: new TeX({ packages: AllPackages }),
      OutputJax: new SVG({ fontCache: "none" }),
    });
  }
  return { adapter: _mjxAdapter, doc: _mjxDoc };
}

function renderMathInline(latex) {
  const { adapter, doc } = getMjx();
  return adapter.outerHTML(doc.convert(latex, { display: false }));
}

export function remarkJekyllTags() {
  return (tree) => {
    transformRootBlocks(tree);
    transformInlineNodes(tree);
  };
}

export function rehypeWrapLoosePhrasing() {
  return (tree) => {
    wrapLoosePhrasingChildren(tree);
  };
}

function wrapLoosePhrasingChildren(parent) {
  if (!parent || typeof parent !== "object" || !Array.isArray(parent.children)) {
    return;
  }

  const nextChildren = [];
  let pending = [];

  const flush = () => {
    const meaningful = pending.some((node) => node.type !== "text" || /\S/.test(node.value ?? ""));
    if (meaningful) {
      nextChildren.push({ type: "element", tagName: "p", properties: {}, children: pending });
    } else {
      nextChildren.push(...pending);
    }
    pending = [];
  };

  for (const child of parent.children) {
    if (isEmptyParagraph(child)) {
      continue;
    }

    if (isLoosePhrasing(child)) {
      pending.push(child);
      continue;
    }

    flush();
    nextChildren.push(child);
  }

  flush();
  parent.children = nextChildren;
}

function isEmptyParagraph(node) {
  return (
    node?.type === "element" &&
    node.tagName === "p" &&
    (!Array.isArray(node.children) || node.children.every((child) => child.type === "text" && !/\S/.test(child.value ?? "")))
  );
}

function isLoosePhrasing(node) {
  if (node?.type === "text") return /\S/.test(node.value ?? "");
  if (node?.type !== "element") return false;
  return new Set([
    "a",
    "abbr",
    "b",
    "br",
    "cite",
    "code",
    "del",
    "em",
    "i",
    "img",
    "input",
    "label",
    "ruby",
    "script",
    "small",
    "span",
    "strong",
    "sub",
    "sup",
  ]).has(node.tagName);
}

export function transformJekyllTagSource(source) {
  const rawBlocks = [];
  let code = source.replace(/\{%\s*raw\s*%\}([\s\S]*?)\{%\s*endraw\s*%\}/g, (_match, raw) => {
    const key = `@@JEKYLL_RAW_${rawBlocks.length}@@`;
    rawBlocks.push(raw);
    return key;
  });

  code = transformOutsideFences(code, (chunk) => {
    let next = chunk;
    next = next.replace(/\{%\s*epigraph\s*%\}([\s\S]*?)\{%\s*endepigraph\s*%\}/g, (_match, body) => {
      return `<div class="epigraph">\n<blockquote>\n${renderParagraphs(body)}\n</blockquote>\n</div>`;
    });
    next = next.replace(/\{%\s*gloss\b([^%]*)%\}([\s\S]*?)\{%\s*endgloss\s*%\}/g, (_match, attrs, body) => {
      return renderGloss(attrs, body);
    });
    next = next.replace(/\{%\s*(newthought|sidenote|marginnote|maincolumn|fullwidth|marginfigure)\b\s*([^%]*?)\s*%\}/g, (_match, name, args) => {
      return renderInlineTag(name, args);
    });
    next = next.replace(/\{%\s*(m|em|math|endmath)\s*%\}/g, (_match, name) => {
      return renderMathTag(name);
    });
    return next;
  });

  rawBlocks.forEach((raw, index) => {
    code = code.replaceAll(`@@JEKYLL_RAW_${index}@@`, raw);
  });

  return code;
}

function transformOutsideFences(source, transform) {
  const lines = source.split("\n");
  const chunks = [];
  let current = [];
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      if (!inFence && current.length > 0) {
        chunks.push(transform(current.join("\n")));
        current = [];
      }
      inFence = !inFence;
      chunks.push(line);
      continue;
    }

    if (inFence) {
      chunks.push(line);
    } else {
      current.push(line);
    }
  }

  if (current.length > 0) {
    chunks.push(transform(current.join("\n")));
  }

  return chunks.join("\n");
}

function transformRootBlocks(tree) {
  const children = tree.children ?? [];
  const nextChildren = [];

  for (let index = 0; index < children.length; index += 1) {
    const node = children[index];
    if (node.type === "code") {
      nextChildren.push(node);
      continue;
    }

    const text = nodeText(node);

    if (text.includes("{% epigraph %}")) {
      const collected = [text];
      let cursor = index;
      while (!collected.join("\n\n").includes("{% endepigraph %}") && cursor + 1 < children.length) {
        cursor += 1;
        collected.push(nodeText(children[cursor]));
      }
      const joined = collected.join("\n\n");
      const body = joined
        .replace(/^[\s\S]*?\{%\s*epigraph\s*%\}/, "")
        .replace(/\{%\s*endepigraph\s*%\}[\s\S]*$/, "");
      nextChildren.push({
        type: "html",
        value: `<div class="epigraph">\n<blockquote>\n${renderParagraphs(body)}\n</blockquote>\n</div>`,
      });
      index = cursor;
      continue;
    }

    const fullText = text.trim();
    const serializedText = Array.isArray(node.children)
      ? node.children.map(serializeInlineNode).join("").trim()
      : fullText;
    const fullReplacement = transformFullBlock(serializedText) ?? transformFullBlock(fullText);
    if (fullReplacement) {
      nextChildren.push({ type: "html", value: fullReplacement });
      continue;
    }

    const blockWithTrailingText =
      transformFullBlockWithTrailingText(serializedText) ?? transformFullBlockWithTrailingText(fullText);
    if (blockWithTrailingText) {
      nextChildren.push({ type: "html", value: blockWithTrailingText });
      continue;
    }

    nextChildren.push(node);
  }

  tree.children = nextChildren;
}

function transformFullBlock(text) {
  let match = text.match(/^\{%\s*maincolumn\s+([^%]+?)\s*%\}$/);
  if (match) {
    const [src = "", caption = ""] = parseArgs(match[1]);
    return renderFigure(src, caption);
  }

  match = text.match(/^\{%\s*fullwidth\s+([^%]+?)\s*%\}$/);
  if (match) {
    const [src = "", caption = ""] = parseArgs(match[1]);
    return renderFigure(src, caption, "fullwidth");
  }

  match = text.match(/^\{%\s*marginfigure\s+([^%]+?)\s*%\}$/);
  if (match) {
    const [id = "", src = "", caption = ""] = parseArgs(match[1]);
    return `<p class="marginfigure-block">${renderMarginFigure(id, src, caption)}</p>`;
  }

  match = text.match(/^\{%\s*math\s*%\}([\s\S]*?)\{%\s*endmath\s*%\}$/);
  if (match) {
    return `<div class="mathblock">\\[${escapeHtml(match[1].trim())}\\]</div>`;
  }

  match = text.match(/^\{%\s*gloss\b([^%]*)%\}([\s\S]*?)\{%\s*endgloss\s*%\}$/);
  if (match) {
    return renderGloss(match[1], match[2]);
  }

  return null;
}

function transformFullBlockWithTrailingText(text) {
  const match = text.match(/^([\s\S]*?)(\{%\s*(?:maincolumn|fullwidth|marginfigure)\b[^%]*?%\})([\s\S]*)$/);
  if (!match) return null;

  const beforeText = match[1].trim();
  const block = transformFullBlock(match[2]);
  const trailingText = match[3].trim();
  if (!block || (!beforeText && !trailingText)) return null;

  return [
    beforeText ? `<p>${transformInlineHtml(beforeText)}</p>` : "",
    block,
    trailingText ? `<p>${transformInlineHtml(trailingText)}</p>` : "",
  ]
    .filter(Boolean)
    .join("\n");
}

function transformInlineNodes(node) {
  if (!node || typeof node !== "object") {
    return;
  }

  if (node.type === "code" || node.type === "inlineCode") {
    return;
  }

  if (node.type === "paragraph") {
    const fullText = nodeText(node).trim();
    const serializedText = Array.isArray(node.children)
      ? node.children.map(serializeInlineNode).join("").trim()
      : fullText;
    const fullReplacement = transformFullBlock(serializedText) ?? transformFullBlock(fullText);
    if (fullReplacement) {
      node.type = "html";
      node.value = fullReplacement;
      delete node.children;
      return;
    }

    const blockWithTrailingText =
      transformFullBlockWithTrailingText(serializedText) ?? transformFullBlockWithTrailingText(fullText);
    if (blockWithTrailingText) {
      node.type = "html";
      node.value = blockWithTrailingText;
      delete node.children;
      return;
    }

    if (hasRenderableInlineTagSplitByMarkdown(node)) {
      node.type = "html";
      node.value = `<p>${transformInlineHtml(serializedText)}</p>`;
      delete node.children;
      return;
    }
  }

  if (Array.isArray(node.children)) {
    const nextChildren = [];
    for (const child of node.children) {
      if (child.type === "text" && containsInlineTag(child.value)) {
        nextChildren.push(...transformInlineText(child.value));
      } else {
        transformInlineNodes(child);
        nextChildren.push(child);
      }
    }
    node.children = nextChildren;
  }
}

function containsInlineTag(value) {
  return /\{%\s*(?:raw|newthought|sidenote|marginnote|maincolumn|fullwidth|marginfigure|m|em|math|endmath)\b/.test(value);
}

function containsRenderableInlineTag(value) {
  return /\{%\s*(?:newthought|sidenote|marginnote|maincolumn|fullwidth|marginfigure|m|em|math|endmath)\b/.test(value);
}

function hasRenderableInlineTagSplitByMarkdown(node) {
  if (!Array.isArray(node.children)) return false;
  return node.children.some((child) => child.type === "text" && containsRenderableInlineTag(child.value ?? ""));
}

function transformInlineHtml(value) {
  return transformInlineText(value)
    .map((node) => {
      return node.value ?? "";
    })
    .join("");
}

function transformInlineText(value) {
  const nodes = [];
  const pattern = /\{%\s*raw\s*%\}([\s\S]*?)\{%\s*endraw\s*%\}|\{%\s*(newthought|sidenote|marginnote|maincolumn|fullwidth|marginfigure)\b\s*([^%]*?)\s*%\}|\{%\s*(m|em|math|endmath)\s*%\}/g;
  let cursor = 0;
  let match;

  while ((match = pattern.exec(value)) !== null) {
    if (match.index > cursor) {
      nodes.push({ type: "text", value: value.slice(cursor, match.index) });
    }

    if (match[1] !== undefined) {
      nodes.push({ type: "text", value: match[1] });
    } else if (match[2]) {
      nodes.push({ type: "html", value: renderInlineTag(match[2], match[3]) });
    } else {
      nodes.push({ type: "html", value: renderMathTag(match[4]) });
    }

    cursor = pattern.lastIndex;
  }

  if (cursor < value.length) {
    nodes.push({ type: "text", value: value.slice(cursor) });
  }

  return nodes;
}

function serializeInlineNode(node) {
  if (!node) return "";
  if (node.type === "text") return escapeHtml(node.value ?? "");
  if (node.type === "html") return node.value ?? "";
  if (node.type === "inlineMath") return renderMathInline(node.value ?? "");
  if (node.type === "inlineCode") return `<code>${escapeHtml(node.value ?? "")}</code>`;
  if (node.type === "break") return "<br>";
  if (node.type === "emphasis") return `<em>${serializeInlineChildren(node)}</em>`;
  if (node.type === "strong") return `<strong>${serializeInlineChildren(node)}</strong>`;
  if (node.type === "delete") return `<del>${serializeInlineChildren(node)}</del>`;
  if (node.type === "link") {
    const href = escapeAttr(node.url ?? "");
    const title = node.title ? ` title="${escapeAttr(node.title)}"` : "";
    return `<a href="${href}"${title}>${serializeInlineChildren(node)}</a>`;
  }
  if (node.type === "image") {
    const src = escapeAttr(node.url ?? "");
    const alt = escapeAttr(node.alt ?? "");
    const title = node.title ? ` title="${escapeAttr(node.title)}"` : "";
    return `<img src="${src}" alt="${alt}"${title}>`;
  }
  if (Array.isArray(node.children)) return serializeInlineChildren(node);
  if (typeof node.value === "string") return escapeHtml(node.value);
  return "";
}

function serializeInlineChildren(node) {
  return (node.children ?? []).map(serializeInlineNode).join("");
}

function renderInlineTag(name, argsText) {
  const args = parseArgs(argsText);
  if (name === "newthought") {
    return `<span class="newthought">${escapeHtml(args[0] ?? "")}</span>`;
  }
  if (name === "sidenote") {
    const [id = "", note = ""] = args;
    const cleanId = normalizeTagId(id);
    return [
      `<label for="${escapeAttr(cleanId)}" class="margin-toggle sidenote-number"></label>`,
      `<input type="checkbox"${cleanId ? ` id="${escapeAttr(cleanId)}"` : ""} class="margin-toggle" checked />`,
      `<span class="sidenote">${note}</span>`,
    ].join("");
  }
  if (name === "marginnote") {
    const [id = "", note = ""] = args;
    const cleanId = normalizeTagId(id);
    return [
      `<label for="${escapeAttr(cleanId)}" class="margin-toggle"> &#8853;</label>`,
      `<input type="checkbox"${cleanId ? ` id="${escapeAttr(cleanId)}"` : ""} class="margin-toggle" checked />`,
      `<span class="marginnote">${note}</span>`,
    ].join("");
  }
  if (name === "maincolumn") {
    const [src = "", caption = ""] = args;
    return renderFigure(src, caption);
  }
  if (name === "fullwidth") {
    const [src = "", caption = ""] = args;
    return renderFigure(src, caption, "fullwidth");
  }
  if (name === "marginfigure") {
    const [id = "", src = "", caption = ""] = args;
    return renderMarginFigure(id, src, caption);
  }
  return "";
}

function renderMathTag(name) {
  if (name === "m") return '<span class="math-inline">\\(';
  if (name === "em") return "\\)</span>";
  if (name === "math") return '<div class="mathblock">\\[';
  if (name === "endmath") return "\\]</div>";
  return "";
}

function renderFigure(src, caption, className = "") {
  const fullSrc = normalizeSrc(src);
  const classAttr = className ? ` class="${className}"` : "";
  const safeCaption = caption ? `<figcaption>${caption}</figcaption>` : "";
  return `<figure${classAttr}>${safeCaption}<img src="${escapeAttr(fullSrc)}" alt="${escapeAttr(stripHtml(caption))}" /></figure>`;
}

function renderMarginFigure(id, src, caption) {
  const fullSrc = normalizeSrc(src);
  const cleanId = normalizeTagId(id);
  return [
    `<label for="${escapeAttr(cleanId)}" class="margin-toggle">&#8853;</label>`,
    `<input type="checkbox"${cleanId ? ` id="${escapeAttr(cleanId)}"` : ""} class="margin-toggle" checked />`,
    `<span class="marginnote"><img class="fullwidth" src="${escapeAttr(fullSrc)}" alt="" /><br>${caption}</span>`,
  ].join("");
}

function normalizeTagId(id) {
  const value = String(id ?? "").trim();
  return /^[`"'“”‘’]*$/.test(value) ? "" : value;
}

function renderGloss(attrsText, body) {
  const attrs = attrsText.trim();
  const num = attrs.match(/^\d+/)?.[0] ?? "";
  const rest = attrs.replace(/^\d+\s*/, "").trim();
  const title = rest.match(/^["'“‘]([^"'”’]*)["'”’]$/)?.[1] ?? "";
  const lines = body.split("\n").map((line) => line.trim()).filter(Boolean);

  let sourceLine = "";
  const romanTiers = [];
  const glossTiers = [];
  let transLine = "";
  let romanDone = false;

  for (const line of lines) {
    if (/^source:\s*/.test(line)) {
      sourceLine = line.replace(/^source:\s*/, "").trim();
    } else if (/^gloss:\s*/.test(line)) {
      glossTiers.push(splitTier(line.replace(/^gloss:\s*/, "")));
    } else if (isQuoted(line)) {
      transLine = line;
    } else if (!romanDone) {
      romanTiers.push(splitTier(line));
      romanDone = true;
    } else {
      glossTiers.push(splitTier(line));
    }
  }

  const allTiers = [...romanTiers, ...glossTiers];
  const romanCount = romanTiers.length;
  const wordCount = Math.max(0, ...allTiers.map((tier) => tier.length));

  const parts = ['<div class="gloss">'];
  if (num) parts.push(`<div class="gloss-num">(${escapeHtml(num)})</div>`);
  parts.push('<div class="gloss-body">');
  if (title) parts.push(`<div class="gloss-title">${escapeHtml(title)}</div>`);
  if (sourceLine) parts.push(`<div class="gloss-tier source">${escapeHtml(sourceLine)}</div>`);
  if (wordCount > 0) {
    parts.push('<div class="gloss-row" role="group" aria-label="interlinear gloss">');
    for (let i = 0; i < wordCount; i += 1) {
      parts.push('<span class="gloss-col">');
      allTiers.forEach((tier, tierIndex) => {
        const word = tier[i] ?? "";
        if (tierIndex < romanCount) {
          parts.push(`<span class="gloss-tier roman"><i>${escapeHtml(word)}</i></span>`);
        } else {
          parts.push(`<span class="gloss-tier">${applyGlossSmallCaps(escapeHtml(word))}</span>`);
        }
      });
      parts.push("</span>");
    }
    parts.push("</div>");
  }
  if (transLine) parts.push(`<p class="gloss-trans">${typographicTranslation(transLine)}</p>`);
  parts.push("</div>", "</div>");
  return parts.join("\n");
}

function nodeText(node) {
  if (!node) return "";
  if (typeof node.value === "string") return node.value;
  if (Array.isArray(node.children)) return node.children.map(nodeText).join("");
  return "";
}

function splitTier(line) {
  return line.split("|").map((part) => part.trim());
}

function typographicTranslation(line) {
  const inner = escapeHtml(line.slice(1, -1));
  return line.startsWith('"') || line.startsWith("“") ? `“${inner}”` : `‘${inner}’`;
}

function applyGlossSmallCaps(text) {
  return text.replace(/\b(\d*[A-Z][A-Z0-9]*(?:\.\d*[A-Z][A-Z0-9]*)*)\b/g, (match) => {
    return `<span class="gloss-sc">${match.toLowerCase()}</span>`;
  });
}

function renderParagraphs(markdownish) {
  return markdownish
    .trim()
    .split(/\n{2,}/)
    .map((paragraph) => {
      const trimmed = paragraph.trim();
      if (!trimmed) return "";
      if (/^<footer[\s>]/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br />")}</p>`;
    })
    .filter(Boolean)
    .join("\n");
}

function normalizeSrc(src) {
  if (/^(?:https?:)?\/\//.test(src) || src.startsWith("/")) return src;
  if (src.startsWith("../")) return `/${src.replace(/^(\.\.\/)+/, "")}`;
  return `/${src}`;
}

function parseArgs(input) {
  const args = [];
  let index = 0;

  while (index < input.length) {
    while (/\s/.test(input[index] ?? "")) index += 1;
    if (index >= input.length) break;

    const opener = input[index];
    const closer = quoteCloser(opener);
    if (closer) {
      index += 1;
      const start = index;
      while (index < input.length) {
        if (input[index] === "\\" && index + 1 < input.length) {
          index += 2;
          continue;
        }
        if (input[index] === closer && isArgumentBoundary(input, index + 1)) {
          break;
        }
        index += 1;
      }
      args.push(input.slice(start, index).replace(/\\(["'])/g, "$1"));
      if (input[index] === closer) index += 1;
    } else {
      const start = index;
      while (index < input.length && !/\s/.test(input[index])) index += 1;
      args.push(input.slice(start, index));
    }
  }

  return args;
}

function quoteCloser(opener) {
  if (opener === '"') return '"';
  if (opener === "'") return "'";
  if (opener === "“") return "”";
  if (opener === "‘") return "’";
  return "";
}

function isArgumentBoundary(input, index) {
  const rest = input.slice(index);
  return rest.length === 0 || /^\s+(?:["'“‘]|\S+=|$)/.test(rest) || /^\s*$/.test(rest);
}

function isQuoted(input) {
  return (
    (input.startsWith('"') && input.endsWith('"')) ||
    (input.startsWith("'") && input.endsWith("'")) ||
    (input.startsWith("“") && input.endsWith("”")) ||
    (input.startsWith("‘") && input.endsWith("’"))
  );
}

function stripHtml(input) {
  return input.replace(/<[^>]*>/g, "");
}

function escapeHtml(input) {
  return String(input)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function escapeAttr(input) {
  return escapeHtml(input).replaceAll("'", "&#39;");
}
