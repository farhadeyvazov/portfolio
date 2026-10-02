import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { FiCheckCircle, FiUsers, FiZap } from 'react-icons/fi';
import { profileConfig } from '@/data/profile';

const BADGES = [
  { key: 'badgeProblemSolver', icon: FiCheckCircle },
  { key: 'badgeTeamPlayer', icon: FiUsers },
  { key: 'badgeFastLearner', icon: FiZap },
] as const;

export function About() {
  const t = useTranslations('about');

  return (
    <section id="about" className="border-border bg-surface border-t">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>
          <h2 className="text-text-primary text-3xl font-semibold">{t('heading')}</h2>

          <p className="text-text-secondary mt-6">{t('paragraph1')}</p>
          <p className="text-text-secondary mt-4">{t('paragraph2')}</p>

          <div className="mt-8 flex flex-wrap gap-4">
            {BADGES.map(({ key, icon: Icon }) => (
              <div key={key} className="text-text-secondary flex items-center gap-2 text-sm">
                <Icon size={16} className="text-accent" />
                {t(key)}
              </div>
            ))}
          </div>
        </div>

        <div className="border-border relative mx-auto aspect-4/3 w-full max-w-lg overflow-hidden rounded-2xl border">
          <Image
            src={profileConfig.aboutWorkspacePhoto}
            alt={t('imageAlt')}
            fill
            sizes="(min-width: 768px) 32rem, 90vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
