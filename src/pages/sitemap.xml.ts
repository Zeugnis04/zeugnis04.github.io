import type { APIContext } from 'astro';
import { getPosts } from '@/lib/posts';

// Static, indexable routes. Keep in sync when adding top-level pages.
// Intentionally excluded: /tools/* (noindex), /plugin-test (test page), 404.
const STATIC_PATHS = [
  '/',
  '/blog/blog-list/',
  '/tags/',
  '/zeugnis/',
  '/books-archive/',
  '/featured-albums-archive/',
  '/media-archive/',
];

function xmlEscape(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET({ site }: APIContext) {
  const base = (site ?? new URL('https://zeugnis04.github.io')).toString().replace(/\/$/, '');
  const posts = (await getPosts()).filter(post => !post.hidden);

  const urls = [
    ...STATIC_PATHS.map(path => ({ loc: `${base}${path}`, lastmod: undefined as string | undefined })),
    ...posts.map(post => ({
      loc: `${base}${post.url}`,
      lastmod: post.date.toISOString().slice(0, 10),
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(({ loc, lastmod }) => {
    const lastmodTag = lastmod ? `\n    <lastmod>${lastmod}</lastmod>` : '';
    return `  <url>\n    <loc>${xmlEscape(loc)}</loc>${lastmodTag}\n  </url>`;
  })
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
