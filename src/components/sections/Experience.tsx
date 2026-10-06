import { useTranslations } from 'next-intl';
import type { ExperienceEntry } from '@/data/types';

export function Experience() {
  const t = useTranslations('experience');
  // Role/company/dates/responsibilities are translated per locale (see the
  // `experience.items` key in each src/i18n/<locale>.json file) rather than
  // pulled from a single English-only data file, so this content actually
  // changes when the visitor switches language.
  const experience = t.raw('items') as ExperienceEntry[];

  return (
    <section id="experience" className="border-border border-t">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>
        <h2 className="text-text-primary mb-10 text-3xl font-semibold">{t('heading')}</h2>

        <ol className="border-border relative border-l pl-8">
          {experience.map((item, index) => (
            <li key={`${item.company}-${item.startDate}`} className={index === 0 ? '' : 'mt-10'}>
              <span className="border-accent bg-bg absolute -left-1.75 mt-1.5 h-3 w-3 rounded-full border-2" />
              <p className="text-text-secondary text-sm">
                {item.startDate} – {item.endDate}
              </p>
              <h3 className="text-text-primary mt-1 text-lg font-semibold">{item.role}</h3>
              <p className="text-text-secondary text-sm">{item.company}</p>
              <ul className="mt-3 flex flex-col gap-1.5">
                {item.responsibilities.map((responsibility) => (
                  <li key={responsibility} className="text-text-secondary flex gap-2 text-sm">
                    <span className="text-accent" aria-hidden>
                      •
                    </span>
                    {responsibility}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
