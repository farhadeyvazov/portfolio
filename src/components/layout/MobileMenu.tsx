'use client';

import { useEffect, useRef } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import {
  FiX,
  FiHome,
  FiCode,
  FiFolder,
  FiUser,
  FiBriefcase,
  FiBookOpen,
  FiMail,
  FiDownload,
} from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { LOCALE_LABELS } from '@/components/ui/LanguageSwitcher';
import { profileConfig } from '@/data/profile';
import { NAV_ITEMS } from './nav-items';

const NAV_ICONS: Record<
  (typeof NAV_ITEMS)[number]['key'],
  React.ComponentType<{ size?: number }>
> = {
  home: FiHome,
  stack: FiCode,
  projects: FiFolder,
  about: FiUser,
  experience: FiBriefcase,
  education: FiBookOpen,
  contact: FiMail,
};

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const t = useTranslations('nav');
  const tUi = useTranslations('ui');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll, move focus to the close button, and let Escape close
  // the menu — basic accessible-dialog behavior.
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') onClose();
      }
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }

    document.body.style.overflow = '';
  }, [open, onClose]);

  if (!open) return null;

  function selectLocale(nextLocale: (typeof routing.locales)[number]) {
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={tUi('menu')}
      className="bg-bg fixed inset-0 top-0 z-50 flex flex-col overflow-y-auto lg:hidden"
    >
      <div className="border-border flex h-16 items-center justify-between border-b px-6">
        <span className="text-text-primary text-lg font-semibold">
          Farhad<span className="text-accent">Eyvazov</span>
        </span>
        <button
          type="button"
          onClick={onClose}
          aria-label={tUi('closeMenu')}
          className="border-border text-text-primary focus-visible:outline-accent flex h-9 w-9 items-center justify-center rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          ref={closeButtonRef}
        >
          <FiX size={18} aria-hidden />
        </button>
      </div>

      <div className="border-border flex flex-wrap gap-2 border-b px-6 py-4">
        {routing.locales.map((code) => (
          <button
            key={code}
            type="button"
            onClick={() => selectLocale(code)}
            aria-current={code === locale}
            className={`focus-visible:outline-accent rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
              code === locale
                ? 'border-accent text-accent'
                : 'border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            {LOCALE_LABELS[code]}
          </button>
        ))}
      </div>

      <nav className="flex flex-1 flex-col gap-1 px-4 py-4" aria-label="Mobile primary">
        {NAV_ITEMS.map((item) => {
          const Icon = NAV_ICONS[item.key];
          return (
            <a
              key={item.key}
              href={item.href}
              onClick={onClose}
              className="text-text-primary hover:bg-surface focus-visible:outline-accent flex items-center gap-3 rounded-lg px-3 py-3 transition-colors focus-visible:outline focus-visible:-outline-offset-2"
            >
              <Icon size={18} />
              <span>{t(item.key)}</span>
            </a>
          );
        })}
      </nav>

      <div className="border-border flex flex-col gap-2 border-t px-4 py-4">
        <a
          href={profileConfig.cvPath}
          download
          className="text-text-primary hover:bg-surface focus-visible:outline-accent flex items-center gap-3 rounded-lg px-3 py-3 transition-colors focus-visible:outline focus-visible:-outline-offset-2"
        >
          <FiDownload size={18} />
          <span>{tUi('downloadCV')}</span>
        </a>
        <a
          href={profileConfig.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-primary hover:bg-surface focus-visible:outline-accent flex items-center gap-3 rounded-lg px-3 py-3 transition-colors focus-visible:outline focus-visible:-outline-offset-2"
        >
          <FaLinkedin size={18} />
          <span>{tUi('linkedin')}</span>
        </a>
      </div>
    </div>
  );
}
