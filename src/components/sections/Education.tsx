import { useTranslations } from 'next-intl';
import { FiAward, FiBookOpen } from 'react-icons/fi';
import { education } from '@/data/education';
import { certifications } from '@/data/certifications';

export function Education() {
  const t = useTranslations('education');

  return (
    <section id="education" className="border-border bg-surface border-t">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>

        <div className="mt-6 grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="text-text-primary mb-5 flex items-center gap-2 text-xl font-semibold">
              <FiBookOpen className="text-accent" aria-hidden /> {t('educationHeading')}
            </h2>
            <div className="flex flex-col gap-5">
              {education.map((item) => (
                <div key={item.degree} className="border-border bg-bg rounded-xl border p-4">
                  <p className="text-text-secondary text-sm">
                    {item.startYear} – {item.endYear}
                  </p>
                  <h3 className="text-text-primary mt-1 font-medium">{item.degree}</h3>
                  <p className="text-text-secondary text-sm">{item.institution}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-text-primary mb-5 flex items-center gap-2 text-xl font-semibold">
              <FiAward className="text-accent" aria-hidden /> {t('certificationsHeading')}
            </h2>
            <div className="flex flex-col gap-3">
              {certifications.map((item) => (
                <div key={item.name} className="border-border bg-bg rounded-xl border p-4">
                  <h3 className="text-text-primary font-medium">{item.name}</h3>
                  <p className="text-text-secondary text-sm">{item.issuer}</p>
                  <p className="text-text-secondary text-sm">{item.dateRange}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
