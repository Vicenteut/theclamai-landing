import en from './en.json';
import es from './es.json';

export type Locale = 'en' | 'es';
export const LOCALES: Locale[] = ['en', 'es'];
export const DEFAULT_LOCALE: Locale = 'en';

const dictionaries = { en, es } as const;

export type Dict = typeof en;

/** Get the dictionary for a locale. */
export function dict(locale: Locale): Dict {
  return (dictionaries[locale] ?? dictionaries[DEFAULT_LOCALE]) as Dict;
}

/** Detect locale from a URL pathname. `/es/...` → 'es', everything else → 'en'. */
export function getLocale(url: URL | string): Locale {
  const pathname = typeof url === 'string' ? url : url.pathname;
  if (pathname === '/es' || pathname.startsWith('/es/')) return 'es';
  return 'en';
}

/** Build a URL for the same page in the other locale. */
export function altLocaleHref(url: URL, current: Locale): string {
  const other: Locale = current === 'en' ? 'es' : 'en';
  const path = url.pathname;
  if (current === 'es') {
    // Strip leading /es
    const stripped = path.replace(/^\/es(\/|$)/, '/');
    return other === 'en' ? stripped : `/es${stripped === '/' ? '' : stripped}`;
  }
  // current === 'en'
  return other === 'es' ? `/es${path === '/' ? '' : path}` : path;
}
