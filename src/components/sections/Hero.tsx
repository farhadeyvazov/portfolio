import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { profileConfig } from '@/data/profile';
import { Button } from '@/components/ui/Button';
import { SocialLinks } from '@/components/ui/SocialLinks';

export function Hero() {
  const t = useTranslations('hero');
  const tUi = useTranslations('ui');

  return (
    <section className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
      <div>
        <p className="text-accent mb-4 flex items-center gap-2 text-sm font-medium">
          <span aria-hidden>◎</span> {t('eyebrow')}
        </p>
        <h1 className="text-text-primary text-4xl leading-tight font-semibold sm:text-5xl">
          {t.rich('headline', {
            accent: (chunks) => <span className="text-accent">{chunks}</span>,
          })}
        </h1>
        <p className="text-text-secondary mt-6 max-w-lg">{t('subtext')}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#projects" variant="primary">
            {t('viewProjects')} →
          </Button>
          <Button href={profileConfig.cvPath} download variant="outline">
            {tUi('downloadCV')} ↓
          </Button>
        </div>

        <SocialLinks className="mt-8" />
      </div>

      <div className="order-first">
        <div className="border-border relative mx-auto aspect-6/7 w-full max-w-sm overflow-hidden rounded-2xl border">
          <Image
            src={profileConfig.heroPortrait}
            alt={profileConfig.name}
            fill
            sizes="(min-width: 768px) 24rem, 80vw"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
