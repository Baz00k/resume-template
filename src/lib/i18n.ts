import { base } from '$app/paths';
import { baseLocale, setLocale, extractLocaleFromUrl, locales } from '$lib/translations/runtime';
import type { Locale } from '$lib/translations/runtime';

/**
 * Detects and sets the correct locale based on the current URL,
 * accounting for SvelteKit's base path.
 *
 * Paraglide's extractLocaleFromUrl expects the locale to be the first path segment,
 * but with a base path (e.g., /resume-template/), the locale is actually the second segment.
 */
export function initializeLocale() {
	if (typeof window === 'undefined') {
		return;
	}

	const url = new URL(window.location.href);
	let pathname = url.pathname;

	// Strip base path before extracting locale
	if (base && pathname.startsWith(base)) {
		pathname = pathname.slice(base.length) || '/';
	}

	// Create a modified URL with base-stripped pathname for locale extraction
	const modifiedUrl = new URL(url);
	modifiedUrl.pathname = pathname;

	// Try to extract locale from the modified URL
	const extractedLocale = extractLocaleFromUrl(modifiedUrl);
	const locale: Locale =
		extractedLocale && locales.includes(extractedLocale as Locale)
			? (extractedLocale as Locale)
			: baseLocale;

	// Set the locale without reloading (we're already on the correct page)
	setLocale(locale, { reload: false });
}
