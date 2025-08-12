<script>
	import { resolve } from '$app/paths';
	const { data } = $props();
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<ul>
		{#each data.articles as article}
			<li>
				<a href={resolve('/[slug]', { slug: article.slug })}>{article.title}</a>
			</li>
		{/each}
	</ul>
</section>

<style>
	section {
		text-align: center;
	}
</style>
