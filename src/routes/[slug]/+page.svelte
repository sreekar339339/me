<script>
	let { data } = $props();
	let published = new Date(data.article.metadata.published);
</script>

<svelte:head>
	<title>{data.article.metadata.title}</title>
</svelte:head>

<article class="max-w-[75ch] mx-auto">
	<h1>{data.article.metadata.title}</h1>
	<span class="text-xs">Published <time datetime={published.toISOString()}>{published}</time></span>
	<hr class="my-2" />
	<div class="prose">
		<data.article.default />
	</div>
</article>
