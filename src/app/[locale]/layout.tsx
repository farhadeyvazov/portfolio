import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import { routing } from '@/i18n/routing';
import { themeInitScript } from '@/lib/theme';
import { SITE_URL, localizedUrl, buildLanguageAlternates, OG_LOCALE_MAP } from '@/lib/site';
import { profileConfig } from '@/data/profile';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { GoogleAnalytics } from '@/components/analytics/GoogleAnalytics';
import '@/styles/globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'meta' });

  const title = t('title');
  const description = t('description');
  const url = localizedUrl('/', locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${profileConfig.name}` },
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates('/'),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: profileConfig.name,
      locale: OG_LOCALE_MAP[locale] ?? 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
    // Renders a <meta name="google-site-verification"> tag once this env var
    // is set — the easiest way to verify domain ownership in Google Search
    // Console (Settings > Ownership verification > HTML tag > copy just the
    // content="..." value into NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION).
    verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
      : undefined,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  // Enables static rendering for this locale.
  setRequestLocale(locale);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: profileConfig.name,
        url: localizedUrl('/', locale),
        email: profileConfig.email,
        jobTitle: 'Full-Stack Software Engineer',
        sameAs: [profileConfig.linkedinUrl, profileConfig.githubUrl],
      },
      {
        '@type': 'WebSite',
        name: profileConfig.name,
        url: SITE_URL,
      },
    ],
  };

  return (
    <html lang={locale} data-theme="dark" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <Script
          id="jsonld-person-website"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <GoogleAnalytics />
        <NextIntlClientProvider>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
