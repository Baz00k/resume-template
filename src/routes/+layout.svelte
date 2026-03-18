<script lang="ts">
	import { base } from '$app/paths';
	import '../app.css';
	import Header from '$components/Header.svelte';
	import { localizeHref, locales } from '$lib/translations/runtime';

	const normalizedBase = base.endsWith('/') && base !== '/' ? base.slice(0, -1) : base;
	const withBase = (path: string) => (normalizedBase ? `${normalizedBase}${path}` : path);
</script>

<svelte:head>
	<!-- Hidden links for prerendering all locale variants -->
	{#each locales as locale}
		<link rel="alternate" hreflang={locale} href={withBase(localizeHref('/', { locale }))} />
	{/each}
</svelte:head>

<div class="hidden" aria-hidden="true">
	{#each locales as locale}
		<a href={withBase(localizeHref('/', { locale }))}>{locale}</a>
	{/each}
</div>

<Header />
<main class="w-full px-2 py-4 print:p-0">
	<div
		class="mx-auto h-full min-h-[29.7cm] w-full min-w-min max-w-[21cm] overflow-clip rounded-lg bg-gray-50 dark:bg-gray-100/10 print:absolute print:left-0 print:top-0 print:m-0 print:w-full print:rounded-none"
		id="resume"
	>
		<slot />
	</div>
</main>
