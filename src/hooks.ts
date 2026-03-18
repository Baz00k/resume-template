import type { Reroute } from '@sveltejs/kit';
import { base } from '$app/paths';
import { deLocalizeUrl } from '$lib/translations/runtime';

export const reroute: Reroute = (request) => {
	const url = new URL(request.url);
	const normalizedBase = base.endsWith('/') && base !== '/' ? base.slice(0, -1) : base;

	if (normalizedBase && url.pathname.startsWith(normalizedBase)) {
		url.pathname = url.pathname.slice(normalizedBase.length) || '/';
	}

	const deLocalizedPath = deLocalizeUrl(url).pathname;

	return normalizedBase ? `${normalizedBase}${deLocalizedPath}` : deLocalizedPath;
};
