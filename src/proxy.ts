import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing, type Locale } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

// Maps a visitor's country (from Vercel's edge geolocation header) to a site
// locale — e.g. someone in Azerbaijan gets the AZ version, someone in Poland
// gets the PL version, automatically, on their first visit. Only active on
// Vercel: the "x-vercel-ip-country" header is populated by Vercel's edge
// network and is absent in local dev, so locally the browser's
// Accept-Language header (next-intl's normal behavior) is used instead.
const COUNTRY_TO_LOCALE: Record<string, Locale> = {
  AZ: 'az',
  PL: 'pl',
  UA: 'uk',
  RU: 'ru',
  TR: 'tr',
  EE: 'et',
  CZ: 'cs',
};

export default function proxy(request: NextRequest) {
  const hasStoredLocale = request.cookies.has('NEXT_LOCALE');
  const country = request.headers.get('x-vercel-ip-country');
  const mappedLocale = country ? COUNTRY_TO_LOCALE[country] : undefined;

  // Only steer first-time visitors (no stored preference yet) — anyone who
  // already picked a language, or manually visits a locale-prefixed URL,
  // is left alone. Seeding the cookie here lets next-intl's own middleware
  // pick it up as if the visitor had already chosen it.
  if (!hasStoredLocale && mappedLocale) {
    request.cookies.set('NEXT_LOCALE', mappedLocale);
  }

  return intlMiddleware(request);
}

export const config = {
  // Match all paths except static files, _next internals and API routes.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
