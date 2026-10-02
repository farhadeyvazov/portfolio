import { SocialLinks } from '@/components/ui/SocialLinks';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border border-t">
      <div className="text-text-secondary mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 py-8 text-sm sm:flex-row sm:justify-between">
        <p>
          Farhad<span className="text-accent">Eyvazov</span> · © {year}
        </p>
        <SocialLinks />
      </div>
    </footer>
  );
}
