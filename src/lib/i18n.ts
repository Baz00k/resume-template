import { base } from '$app/paths';
import {
	baseLocale,
	getLocale as originalGetLocale,
	overwriteGetLocale,
	extractLocaleFromUrl,
	locales
} from '$lib/translations/runtime';
import type { Locale } from '$lib/translations/runtime';

function detectLocaleFromUrl(): Locale {
	if (typeof window === 'undefined') return baseLocale;

	const url = new URL(window.location.href);
	let pathname = url.pathname;

	if (base && pathname.startsWith(base)) {
		pathname = pathname.slice(base.length) || '/';
	}

	const modifiedUrl = new URL(url);
	modifiedUrl.pathname = pathname;

	const extractedLocale = extractLocaleFromUrl(modifiedUrl);
	return extractedLocale && locales.includes(extractedLocale as Locale)
		? (extractedLocale as Locale)
		: baseLocale;
}

export function setupLocaleOverride() {
	const originalGetLocaleFn = originalGetLocale;

	overwriteGetLocale(() => {
		if (typeof window === 'undefined') {
			return originalGetLocaleFn();
		}
		return detectLocaleFromUrl();
	});
}
