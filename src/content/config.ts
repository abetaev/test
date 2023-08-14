import { z, defineCollection } from 'astro:content';

const schema = z.object({
  id: z.string().optional(),
  title: z.string(),
  created: z.date(),
  published: z.date().optional(),
  tags: z.array(z.string()).optional()
})

const articlesCollection = defineCollection({
  type: 'content',
  schema
});

const previewsCollection = defineCollection({
  type: 'content',
  schema
})

export const collections = {
  'articles': articlesCollection,
  'previews': previewsCollection
};