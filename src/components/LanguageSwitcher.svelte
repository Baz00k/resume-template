<script lang="ts">
	import { afterNavigate } from '$app/navigation';
	import { base } from '$app/paths';
	import { browser } from '$app/environment';
	import {
		getLocale,
		locales,
		localizeHref,
		setLocale,
		extractLocaleFromUrl,
		baseLocale
	} from '$lib/translations/runtime';
	import type { Locale } from '$lib/translations/runtime';

	// Detect locale from URL (accounting for base path)
	function detectLocaleFromUrl(): Locale {
		if (typeof window === 'undefined') return baseLocale;

		const url = new URL(window.location.href);
		let pathname = url.pathname;

		// Strip base path before extracting locale
		if (base && pathname.startsWith(base)) {
			pathname = pathname.slice(base.length) || '/';
		}

		// Create a modified URL with base-stripped pathname
		const modifiedUrl = new URL(url);
		modifiedUrl.pathname = pathname;

		// Extract locale from the modified URL
		const extractedLocale = extractLocaleFromUrl(modifiedUrl);
		return extractedLocale && locales.includes(extractedLocale as Locale)
			? (extractedLocale as Locale)
			: baseLocale;
	}

	// Initialize locale: use getLocale() which is set correctly by server during SSR,
	// but on client during hydration, detect from URL to match server value
	let currentLocale = $state<Locale>(browser ? detectLocaleFromUrl() : getLocale());

	// Sync Paraglide state with detected locale
	$effect(() => {
		setLocale(currentLocale, { reload: false });
	});

	// Re-detect locale after navigation
	afterNavigate(() => {
		currentLocale = detectLocaleFromUrl();
	});

	const handleLanguageChange = (event: Event) => {
		const select = event.target as HTMLSelectElement;
		const newLocale = select.value as Locale;
		window.location.href = base + localizeHref('/', { locale: newLocale });
	};

	const getLanguageDisplayName = (tag: Locale) => {
		return new Intl.DisplayNames([currentLocale], { type: 'language' }).of(tag.toUpperCase());
	};
</script>

{#if locales.length > 1}
	<select
		class="rounded-full border-none bg-gray-200 py-2 pl-4 pr-10 capitalize outline-none ring-inset transition-colors duration-300 ease-in-out hover:bg-gray-300 focus-visible:ring-2 focus-visible:ring-gray-500 dark:bg-gray-100/10 dark:hover:bg-gray-100/20"
		value={currentLocale}
		onchange={handleLanguageChange}
	>
		{#each locales as tag}
			<option value={tag}>
				{getLanguageDisplayName(tag)}
			</option>
		{/each}
	</select>
{/if}
