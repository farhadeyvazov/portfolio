'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { projects } from '@/data/projects';
import type { ProjectCategory } from '@/data/types';
import { Card } from '@/components/ui/Card';
import { Link } from '@/i18n/navigation';

type Tab = Extract<ProjectCategory, 'frontend' | 'backend'>;

export function Projects() {
  const t = useTranslations('projects');
  const [tab, setTab] = useState<Tab>('frontend');

  const filtered = projects.filter(
    (project) => project.category === tab || project.category === 'fullstack',
  );

  return (
    <section id="projects" className="border-border bg-surface border-t">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="mb-10 flex flex-wrap items-center gap-4">
          <div>
            <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>
            <h2 className="text-text-primary text-3xl font-semibold">{t('heading')}</h2>
          </div>

          <div className="border-border bg-bg inline-flex gap-1 rounded-lg border p-1">
            <button
              type="button"
              onClick={() => setTab('frontend')}
              aria-pressed={tab === 'frontend'}
              className={`focus-visible:outline-accent rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                tab === 'frontend'
                  ? 'bg-accent-fill text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t('tabFrontend')}
            </button>
            <button
              type="button"
              onClick={() => setTab('backend')}
              aria-pressed={tab === 'backend'}
              className={`focus-visible:outline-accent rounded-md px-4 py-1.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                tab === 'backend'
                  ? 'bg-accent-fill text-white'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {t('tabBackend')}
            </button>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project) => (
            <Card
              key={project.slug}
              slug={project.slug}
              title={project.title}
              description={project.description}
              technologies={project.technologies}
              image={project.image}
            />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/projects"
            className="border-border text-text-primary hover:border-accent focus-visible:outline-accent inline-flex items-center justify-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            {t('viewAllProjects')} →
          </Link>
        </div>
      </div>
    </section>
  );
}
