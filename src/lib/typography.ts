import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkSmartypants from 'remark-smartypants';

// MDX passes component props through as plain strings — they never reach the
// remark pipeline that turns `*this*` into emphasis and `--` into an en dash
// everywhere else on the site. A caption written the way the rest of a post is
// written would otherwise render its asterisks literally, so props that hold
// prose get run through the same pipeline by hand.
//
// `oldschool` dashes match astro.config.mjs: `--` is an en dash, `---` an em
// dash, as kramdown did on the old Jekyll site.
const inline = unified()
  .use(remarkParse)
  .use(remarkSmartypants, { dashes: 'oldschool' })
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeStringify, { allowDangerousHtml: true });

/**
 * Render a prop written in markdown — emphasis, links, code, plus smart quotes
 * and dashes. Inline content only: the wrapping `<p>` markdown always produces
 * is stripped, so the result drops straight into a `<figcaption>` or `<span>`.
 */
export function renderInlineMarkdown(text: string): string {
  const html = String(inline.processSync(text)).trim();
  const single = html.match(/^<p>([\s\S]*)<\/p>$/);
  // Only unwrap when the whole thing is one paragraph; anything more
  // structural is left alone rather than silently mangled.
  return single && !single[1].includes('<p>') ? single[1] : html;
}

/** Plain text with smart quotes and dashes, no markdown — for alt text. */
export function plainTypography(text: string): string {
  return renderInlineMarkdown(text).replace(/<[^>]*>/g, '');
}
