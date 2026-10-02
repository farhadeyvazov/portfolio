import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { FiArrowLeft, FiCheck, FiExternalLink } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';
import { Link } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import { SITE_URL, localizedUrl, buildLanguageAlternates, OG_LOCALE_MAP } from '@/lib/site';

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug })),
  );
}

function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);

  if (!project) return {};

  const path = `/projects/${slug}`;
  const url = localizedUrl(path, locale);

  return {
    // Plain string here — the root layout's title.template appends
    // "— Farhad Eyvazov" automatically, so we don't repeat it.
    title: project.title,
    description: project.description,
    alternates: {
      canonical: url,
      languages: buildLanguageAlternates(path),
    },
    openGraph: {
      title: project.title,
      description: project.description,
      url,
      type: 'article',
      locale: OG_LOCALE_MAP[locale] ?? 'en_US',
      images: project.image ? [{ url: `${SITE_URL}${project.image}` }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: project.title,
      description: project.description,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const project = getProject(slug);
  if (!project) {
    notFound();
  }

  const t = await getTranslations('projectDetail');

  return (
    <main className="mx-auto max-w-4xl px-6 py-12 md:py-20">
      <Link
        href="/#projects"
        className="text-text-secondary hover:text-text-primary focus-visible:outline-accent mb-8 inline-flex items-center gap-2 rounded text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        <FiArrowLeft aria-hidden /> {t('backToProjects')}
      </Link>

      <div className="border-border relative mb-8 aspect-[16/9] w-full overflow-hidden rounded-2xl border">
        {project.image && (
          <Image
            src={project.image}
            alt={project.title}
            fill
            sizes="(min-width: 768px) 56rem, 100vw"
            className="object-cover"
            unoptimized
            priority
          />
        )}
      </div>

      <h1 className="text-text-primary text-3xl font-semibold sm:text-4xl">{project.title}</h1>
      <p className="text-text-secondary mt-3">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="border-border text-text-secondary rounded-md border px-2 py-1 text-xs"
          >
            {tech}
          </span>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-text-primary text-xl font-semibold">{t('overview')}</h2>
        <p className="text-text-secondary mt-3">{project.overview}</p>
      </section>

      {project.keyFeatures && project.keyFeatures.length > 0 && (
        <section className="mt-10">
          <h2 className="text-text-primary text-xl font-semibold">{t('keyFeatures')}</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {project.keyFeatures.map((feature) => (
              <li key={feature} className="text-text-secondary flex items-start gap-2">
                <FiCheck className="text-accent mt-1 shrink-0" aria-hidden />
                {feature}
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 flex flex-wrap gap-3">
        {project.liveUrl && (
          <Button
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
          >
            {t('visitLiveSite')} <FiExternalLink aria-hidden />
          </Button>
        )}
        {project.githubUrl && (
          <Button
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
          >
            <FaGithub aria-hidden /> {t('viewOnGithub')}
          </Button>
        )}
      </div>
    </main>
  );
}
