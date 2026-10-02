import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/Button';
import { profileConfig } from '@/data/profile';

export function WorkTogether() {
  const t = useTranslations('workTogether');
  const tUi = useTranslations('ui');

  return (
    <section className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div
          className="border-border relative overflow-hidden rounded-2xl border bg-cover bg-center px-8 py-14 sm:px-12"
          style={{ backgroundImage: `url('${profileConfig.letsWorkTogetherBg}')` }}
        >
          <div
            className="from-bg via-bg/80 to-bg/10 absolute inset-0 bg-linear-to-r"
            aria-hidden
          />
          <div className="relative max-w-lg">
            <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>
            <h2 className="text-text-primary text-3xl font-semibold">{t('heading')}</h2>
            <p className="text-text-secondary mt-4">{t('description')}</p>
            <Button href="#contact" variant="primary" className="mt-6">
              {tUi('getInTouch')} →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
