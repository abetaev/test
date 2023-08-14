import { getCollection } from "astro:content";

const articles = await getCollection("articles");
export default articles
  .filter(({ data: { published } }) => published)
  // @ts-expect-error won't be undefined because of filter on previous line
  .sort(({ data: { published: l } }, { data: { published: r } }) => r.getTime() - l.getTime())
  .map(({ slug, data: { title } }) => ({ slug, title }));
