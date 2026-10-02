import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Link } from '@/i18n/navigation';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <main className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-text-primary text-3xl font-semibold">{t('title')}</h1>
      <p className="text-text-secondary mt-3">{t('message')}</p>
      <Link
        href="/"
        className="bg-accent-fill hover:bg-accent-fill-hover 
        focus-visible:outline-accent mt-8 inline-flex items-center justify-center 
        rounded-lg px-5 py-2.5 text-sm font-medium text-white transition-colors 
        focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {t('backHome')}
      </Link>
    </main>
  );
}
