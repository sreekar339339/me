// since there's no dynamic data here, we can prerender

import { get_articles } from "$lib/articles/utils";

// it so that it gets served as a static asset in production
export const prerender = true;

export function load() {
  return {articles: get_articles()}
}