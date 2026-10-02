import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { Card } from '@/components/ui/Card';
import { localizedUrl, buildLanguageAlternates, OG_LOCALE_MAP } from '@/lib/site';

const PATH = '/projects';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'projects' });

  const title = t('allProjectsHeading');
  const description = t('eyebrow');
  const url = localizedUrl(PATH, locale);

  return {
    // Plain string — root layout's title.template appends "— Farhad Eyvazov".
    title,
    description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(PATH),
    },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      locale: OG_LOCALE_MAP[locale] ?? 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
  };
}

export default async function AllProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('projects');

  return (
    <main className="mx-auto max-w-6xl px-6 py-16 md:py-24">
      <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>
      <h1 className="text-text-primary mb-10 text-3xl font-semibold sm:text-4xl">
        {t('allProjectsHeading')}
      </h1>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Card
            key={project.slug}
            slug={project.slug}
            title={project.title}
            description={project.description}
            technologies={project.technologies}
            image={project.image}
            headingLevel="h2"
          />
        ))}
      </div>
    </main>
  );
}
