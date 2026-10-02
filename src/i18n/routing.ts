import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'az', 'pl', 'uk', 'ru', 'tr', 'et', 'cs'],
  defaultLocale: 'en',
  // Default locale (EN) has no URL prefix ("/"); others are prefixed ("/az", "/pl", ...).
  localePrefix: 'as-needed',
  // Once a visitor picks a language, next-intl stores it in the NEXT_LOCALE
  // cookie and reuses it on the next visit/refresh — satisfies the
  // "language choice persists across refresh/re-visit" requirement.
  localeCookie: true,
});

export type Locale = (typeof routing.locales)[number];
