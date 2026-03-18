import { locales } from '$lib/translations/runtime';

export function match(param: string) {
	return locales.includes(param as (typeof locales)[number]);
}
