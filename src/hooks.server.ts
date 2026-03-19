import type { Handle } from '@sveltejs/kit';
import { base } from '$app/paths';
import { paraglideMiddleware } from '$lib/translations/server';

export const handle: Handle = ({ event, resolve }) => {
	// Strip base path from URL before passing to Paraglide middleware
	// so it can correctly detect the locale from the path
	let modifiedRequest = event.request;
	if (base) {
		const url = new URL(event.request.url);
		if (url.pathname.startsWith(base)) {
			url.pathname = url.pathname.slice(base.length) || '/';
			modifiedRequest = new Request(url, event.request);
		}
	}

	return paraglideMiddleware(modifiedRequest, ({ request: localizedRequest, locale }) => {
		event.request = localizedRequest;
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%paraglide.lang%', locale)
		});
	});
};
