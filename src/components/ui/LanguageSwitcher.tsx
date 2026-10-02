'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale, useTranslations } from 'next-intl';
import { FiChevronDown } from 'react-icons/fi';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

// Display codes per the spec: EN, AZ, PL, UA, RU, TR.
// "uk" is the ISO locale code (Ukrainian) but the agreed on-screen label is "UA".
export const LOCALE_LABELS: Record<string, string> = {
  en: 'EN',
  az: 'AZ',
  pl: 'PL',
  uk: 'UA',
  ru: 'RU',
  tr: 'TR',
  et: 'ET',
  cs: 'CS',
};

export function LanguageSwitcher({ className = '' }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('ui');
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function selectLocale(nextLocale: (typeof routing.locales)[number]) {
    setOpen(false);
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={t('languageSwitcher')}
        className="border-border text-text-primary hover:border-accent focus-visible:outline-accent flex h-9 items-center gap-1 rounded-lg border px-3 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {LOCALE_LABELS[locale]}
        <FiChevronDown
          size={14}
          aria-hidden
          className={open ? 'rotate-180 transition-transform' : 'transition-transform'}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className="border-border bg-surface absolute right-0 z-50 mt-2 w-24 overflow-hidden rounded-lg border shadow-lg"
        >
          {routing.locales.map((code) => (
            <li key={code}>
              <button
                type="button"
                role="option"
                aria-selected={code === locale}
                onClick={() => selectLocale(code)}
                className={`hover:bg-surface-2 focus-visible:bg-surface-2 focus-visible:outline-accent block w-full px-3 py-2 text-left text-sm transition-colors focus-visible:outline focus-visible:-outline-offset-2 ${
                  code === locale ? 'text-accent' : 'text-text-primary'
                }`}
              >
                {LOCALE_LABELS[code]}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
