import type { Handle } from '@sveltejs/kit';
import { paraglideMiddleware } from '$lib/translations/server';

export const handle: Handle = ({ event, resolve }) =>
	paraglideMiddleware(event.request, ({ locale }) => {
		return resolve(event, {
			transformPageChunk: ({ html }) => html.replace('%lang%', locale)
		});
	});
