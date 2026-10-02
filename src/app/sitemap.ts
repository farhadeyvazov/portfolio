import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { localizedUrl, buildLanguageAlternates } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ['/', '/projects', ...projects.map((project) => `/projects/${project.slug}`)];

  return paths.map((path) => ({
    url: localizedUrl(path, routing.defaultLocale),
    lastModified: new Date(),
    changeFrequency: path === '/' ? 'weekly' : 'monthly',
    priority: path === '/' ? 1 : 0.7,
    alternates: {
      languages: buildLanguageAlternates(path),
    },
  }));
}
