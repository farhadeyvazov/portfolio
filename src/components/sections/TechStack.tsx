import { useTranslations } from 'next-intl';
import type { IconType } from 'react-icons';
import {
  SiReact,
  SiNextdotjs,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiPostgresql,
  SiSpringboot,
  SiDocker,
  SiGithub,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import { TbApi } from 'react-icons/tb';
import { skills } from '@/data/skills';

const ICONS: Record<string, IconType> = {
  react: SiReact,
  nextjs: SiNextdotjs,
  javascript: SiJavascript,
  typescript: SiTypescript,
  nodejs: SiNodedotjs,
  expressjs: SiExpress,
  java: FaJava,
  postgresql: SiPostgresql,
  springboot: SiSpringboot,
  docker: SiDocker,
  github: SiGithub,
  restapi: TbApi,
};

export function TechStack() {
  const t = useTranslations('techStack');

  return (
    <section id="stack" className="border-border border-t">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>
            <h2 className="text-text-primary text-3xl font-semibold">{t('heading')}</h2>
          </div>
          <p className="text-text-secondary hidden text-sm sm:block">— {t('alwaysLearning')}</p>
        </div>

        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6">
          {skills.map(({ id, name }) => {
            const Icon = ICONS[id];
            return (
              <div
                key={id}
                className="border-border bg-surface hover:border-accent flex flex-col items-center gap-3 rounded-xl border px-4 py-6 text-center transition-colors"
              >
                <Icon size={32} className="text-text-primary" aria-hidden />
                <span className="text-text-secondary text-sm">{name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
