import type { Reroute } from '@sveltejs/kit';
import { base } from '$app/paths';
import { deLocalizeUrl } from '$lib/translations/runtime';

export const reroute: Reroute = (request) => {
	const url = new URL(request.url);

	// Strip the base path before passing to deLocalizeUrl so it can
	// correctly identify the locale prefix as the first path segment.
	if (base && url.pathname.startsWith(base)) {
		url.pathname = url.pathname.slice(base.length) || '/';
	}

	const deLocalized = deLocalizeUrl(url);

	// Re-add the base path so SvelteKit can strip it during route resolution.
	return base + deLocalized.pathname;
};
