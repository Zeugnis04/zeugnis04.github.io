import { getCollection } from 'astro:content';

export type BlogPost = {
  slug: string;
  url: string;
  title: string;
  date: Date;
  dateLabel: string;
  monthDayLabel: string;
  year: string;
  tags: string[];
  excerpt: string;
  cover?: string;
  category?: string;
  hidden: boolean;
};

export async function getPosts(): Promise<BlogPost[]> {
  const entries = await getCollection('blog', ({ data }) => !data.draft);
  return entries
    .map(entry => {
      const date = entry.data.date ?? new Date('1970-01-01');
      const slug = entry.id.replace(/\.mdx?$/, '').replace(/^\d{4}-\d{2}-\d{2}-/, '');
      return {
        slug,
        url: `/blog/${slug}/`,
        title: entry.data.title ?? slug,
        date,
        dateLabel: formatDate(date),
        monthDayLabel: formatMonthDay(date),
        year: String(date.getFullYear()),
        tags: entry.data.tags ?? [],
        excerpt: entry.data.excerpt ?? buildExcerpt(entry.body),
        cover: entry.data.cover,
        category: entry.data.category,
        hidden: entry.data.hidden === true,
      };
    })
    .sort((a, b) => b.date.getTime() - a.date.getTime());
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

function formatMonthDay(date: Date) {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
  });
}

// Tags that can legitimately open a paragraph of prose (`<span lang="ko">…`,
// `<em><strong>…`). Anything else opening a block -- <figure>, <style>, an HTML
// comment, or a component like <Gallery ...> -- is markup, not text, so the
// block is skipped and the next one is tried instead.
const INLINE_TAGS = new Set([
  'a', 'abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'del', 'dfn', 'em',
  'i', 'ins', 'kbd', 'mark', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'small',
  'span', 'strong', 'sub', 'sup', 'time', 'u', 'var', 'wbr',
]);

function opensWithMarkup(block: string) {
  if (block.startsWith('<!--')) return true;
  const tag = block.match(/^<\s*([A-Za-z][A-Za-z0-9-]*)/);
  return tag ? !INLINE_TAGS.has(tag[1].toLowerCase()) : false;
}

function buildExcerpt(raw: string | undefined) {
  if (!raw) return '';
  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');

  for (const block of body.split(/\n{2,}/).map(b => b.trim())) {
    // A gloss or an epigraph is quoted or annotated material rather than the
    // post's own opening line, and {% raw %} wraps literal code.
    if (!block || block.startsWith('#') || /^\{%\s*(?:gloss|epigraph|raw)\b/.test(block)) continue;
    if (opensWithMarkup(block)) continue;

    // A block that is only an image tag cleans down to nothing, so let the
    // cleaner decide rather than trying to recognise every such tag by name.
    const text = cleanText(block);
    if (text) return truncateWords(text, 35);
  }

  return '';
}

function cleanText(input: string) {
  return input
    .replace(/\{%\s*newthought\b\s*([^%]*?)\s*%\}/g, (_match, args) => `${firstLiquidArg(args)} `)
    // These hug the word they annotate (`한국어{% sidenote … %}로`), so they are
    // dropped outright -- a space here would split the word.
    .replace(/\{%\s*(?:sidenote|marginnote|maincolumn|fullwidth|marginfigure)\b[\s\S]*?%\}/g, '')
    .replace(/\{%\s*(?:m|em|math|endmath|raw|endraw)\s*%\}/g, ' ')
    // Anything else in Liquid syntax is markup, not prose.
    .replace(/\{%[\s\S]*?%\}/g, ' ')
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(style|script)\b[^>]*>[\s\S]*?<\/\1>/gi, ' ')
    .replace(/<span class="(?:side|margin)note">[\s\S]*?<\/span>/g, ' ')
    .replace(/<label[\s\S]*?<\/label>/g, ' ')
    .replace(/<input[^>]*>/g, ' ')
    // Ruby readings are a gloss on the base character, not part of the running
    // text: `<ruby>期<rt>기</rt></ruby>해서` should read 期해서.
    .replace(/<r[tp]\b[^>]*>[\s\S]*?<\/r[tp]>/gi, '')
    .replace(/<(?:br|hr)\b[^>]*>/gi, ' ')
    .replace(/<\/?(?:p|div|li|ul|ol|dl|dd|dt|blockquote|figure|figcaption|section|article|h[1-6]|table|thead|tbody|tr|td|th)\b[^>]*>/gi, ' ')
    // Remaining tags are inline and sit flush against the text they wrap.
    .replace(/<[^>]*>/g, '')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~>#]/g, '')
    .replace(/\s+/g, ' ')
    // Removed markup can leave a space stranded before punctuation
    // (`{% newthought '…scripts' %}, focusing` -> `…scripts , focusing`).
    .replace(/\s+([,.;:!?)\]}])/g, '$1')
    .trim();
}

function firstLiquidArg(input: string) {
  const match = input.trim().match(/^["'"']([^"'"']*)["'"']/);
  return match?.[1] ?? '';
}

function truncateWords(input: string, limit: number) {
  const words = input.split(/\s+/).filter(Boolean);
  if (words.length <= limit) return input;
  return `${words.slice(0, limit).join(' ')}...`;
}
