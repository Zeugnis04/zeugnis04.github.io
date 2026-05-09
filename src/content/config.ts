import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
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
  }),
});

export const collections = { blog };
