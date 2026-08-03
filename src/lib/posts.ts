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

function buildExcerpt(raw: string | undefined) {
  if (!raw) return '';
  const body = raw.replace(/^---\n[\s\S]*?\n---\n?/, '');
  const paragraph =
    body
      .split(/\n{2,}/)
      .map(block => block.trim())
      .find(
        block =>
          block &&
          !block.startsWith('<figure') &&
          !block.startsWith('<div') &&
          !block.startsWith('#') &&
          !/^\{%\s*(?:maincolumn|fullwidth|marginfigure|gloss|raw)\b/.test(block),
      ) ?? '';

  return truncateWords(cleanText(paragraph), 35);
}

function cleanText(input: string) {
  return input
    .replace(/\{%\s*newthought\b\s*([^%]*?)\s*%\}/g, (_match, args) => `${firstLiquidArg(args)} `)
    .replace(/\{%\s*(?:sidenote|marginnote|maincolumn|fullwidth|marginfigure)\b\s*[^%]*?\s*%\}/g, ' ')
    .replace(/\{%\s*(?:m|em|math|endmath|raw|endraw)\s*%\}/g, ' ')
    .replace(/<span class="(?:side|margin)note">[\s\S]*?<\/span>/g, ' ')
    .replace(/<label[\s\S]*?<\/label>/g, ' ')
    .replace(/<input[^>]*>/g, ' ')
    .replace(/<[^>]*>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[`*_~>#]/g, '')
    .replace(/\s+/g, ' ')
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
