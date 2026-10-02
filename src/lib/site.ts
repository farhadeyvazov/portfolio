import { routing } from '@/i18n/routing';

// Configurable via env for local/preview deploys — defaults to the planned
// production domain (farhadeyvazov.com) once it's live. Set
// NEXT_PUBLIC_SITE_URL in Vercel to override (e.g. to the vercel.app URL
// before the custom domain is connected).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://farhadeyvazov.com').replace(
  /\/$/,
  '',
);

/** Builds the absolute URL for `path` (e.g. "/projects/taskool") in a given locale. */
export function localizedUrl(path: string, locale: string): string {
  const prefix = locale === routing.defaultLocale ? '' : `/${locale}`;
  const cleanPath = path === '/' ? '' : path;
  return `${SITE_URL}${prefix}${cleanPath}` || SITE_URL;
}

/** Builds the { [locale]: url } map Next.js uses for hreflang alternate links. */
export function buildLanguageAlternates(path: string): Record<string, string> {
  const entries = routing.locales.map((locale) => [locale, localizedUrl(path, locale)]);
  // "x-default" tells search engines which version to show when no locale matches.
  entries.push(['x-default', localizedUrl(path, routing.defaultLocale)]);
  return Object.fromEntries(entries);
}

/** og:locale values want underscore-separated region tags (e.g. en_US). */
export const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  az: 'az_AZ',
  pl: 'pl_PL',
  uk: 'uk_UA',
  ru: 'ru_RU',
  tr: 'tr_TR',
  et: 'et_EE',
  cs: 'cs_CZ',
};
