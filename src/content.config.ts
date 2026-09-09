import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    date: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    hidden: z.boolean().default(false),
    draft: z.boolean().default(false),
    cover: z.string().optional(),
    excerpt: z.string().optional(),
    category: z.string().optional(),
    subtitle: z.string().optional(),
    description: z.string().optional(),
    comments: z.boolean().optional(),
    full_width: z.boolean().optional(),
    korean: z.boolean().optional(),
    lightbox: z.boolean().optional(),
  }),
});

const media = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/media' }),
  schema: z.object({
    items: z.array(z.object({
      title: z.string(),
      creator: z.string(),
      photo: z.string(),
      date: z.string().regex(/^\d{4}-\d{2}(?:-\d{2})?$/),
      kind: z.enum(['album', 'book', 'event', 'movie', 'show']).default('album'),
      year: z.number().int().optional(),
      featured: z.boolean().default(false),
      url: z.string().optional(),
      review: z.string().optional(),
    })),
  }),
});

export const collections = { blog, media };
