import Image from 'next/image';
import { FiArrowUpRight } from 'react-icons/fi';
import { Link } from '@/i18n/navigation';

export function Card({
  slug,
  title,
  description,
  technologies,
  image,
  headingLevel: Heading = 'h3',
}: {
  slug: string;
  title: string;
  description: string;
  technologies: string[];
  image: string | null;
  /** Defaults to h3 (fits under a section's h2, e.g. the home "My Projects" section).
   *  Pass "h2" when the card sits directly under a page's h1 (e.g. the /projects listing),
   *  so heading levels don't skip. */
  headingLevel?: 'h2' | 'h3';
}) {
  return (
    <Link
      href={`/projects/${slug}`}
      className="group border-border bg-surface hover:border-accent focus-visible:outline-accent flex flex-col overflow-hidden rounded-xl border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
    >
      <div className="border-border relative aspect-16/10 w-full overflow-hidden border-b">
        {image ? (
          <Image
            src={image}
            alt={title}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 90vw"
            className="object-cover"
            unoptimized
          />
        ) : (
          <div className="text-text-secondary flex h-full items-center justify-center">{title}</div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-start justify-between gap-2">
          <Heading className="text-text-primary text-lg font-semibold">{title}</Heading>
          <FiArrowUpRight
            className="text-text-secondary group-hover:text-accent mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            aria-hidden
          />
        </div>
        <p className="text-text-secondary text-sm">{description}</p>
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="border-border text-text-secondary rounded-md border px-2 py-1 text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
