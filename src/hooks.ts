import type { Reroute } from '@sveltejs/kit';
import { base } from '$app/paths';
import { deLocalizeUrl } from '$lib/translations/runtime';

export const reroute: Reroute = (request) => {
	const url = new URL(request.url);

	if (base && url.pathname.startsWith(base)) {
		url.pathname = url.pathname.slice(base.length) || '/';
	}

	const deLocalized = deLocalizeUrl(url);
	return base + deLocalized.pathname;
};
