import { z } from 'zod';

// Define the article_schema using zod
export const article_schema = z.object({
  metadata: z.object({
      title: z.string(),
      description: z.string().optional(),
      published: z.string(), // ISO date string
      author: z.string().optional(),
      tags: z.array(z.string()).optional(),
      // Add other frontmatter fields as needed
  }),
  // You can add other properties if your articles have more fields
});

export function get_articles() {
  // import every index.svx in every folder, the metadata is provided by mdsvex
  // based on the frontmatter and the plugins installed
  const articles_import = import.meta.glob('$lib/articles/**/index.svx', {
      eager: true,
  });
  const articles = [];
  // loop over the keys of the import.meta.glob
  for (const article_location in articles_import) {
      // extract the slug with a regex
      const match = article_location.match(/src\/lib\/articles\/(?<slug>.*)\/index\.svx/);
      const slug = match?.groups?.slug;
      console.log({slug, match}, articles_import[article_location])
      if (!slug) throw new Error(`slug not found for ${article_location}`)
      // parse with a zod schema to ensure the correct metadata it's there (from the frontmatter)
      const { metadata } = article_schema.parse(articles_import[article_location]);
      // add everything in the array
      articles.push({
          slug,
          ...metadata,
      });
  }
  // sort it by date
  articles.sort((article_a, article_b) => {
      const article_a_data = new Date(article_a.published);
      const article_b_data = new Date(article_b.published);
      return article_a_data.getTime() - article_b_data.getTime();
  });
  return articles;
}