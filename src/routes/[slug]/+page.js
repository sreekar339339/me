import { get_articles } from '$lib/articles/utils.js';

export function entries() {
	const articles = get_articles();
	return articles.map((article) => ({ slug: article.slug }));
}

export async function load({ params: { slug } }) {
	// import the actual component with the metadata
	const imported = await import(`$lib/articles/${slug}/index.svx`);
	return { article: imported };
}