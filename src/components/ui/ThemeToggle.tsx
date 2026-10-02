'use client';

import { useSyncExternalStore } from 'react';
import { useTranslations } from 'next-intl';
import { FiMoon, FiSun } from 'react-icons/fi';
import { applyTheme, getStoredTheme, subscribeTheme, type Theme } from '@/lib/theme';

function getServerSnapshot(): Theme {
  return 'dark';
}

export function ThemeToggle({ className = '' }: { className?: string }) {
  const t = useTranslations('ui');
  const theme = useSyncExternalStore(subscribeTheme, getStoredTheme, getServerSnapshot);

  function toggle() {
    applyTheme(theme === 'dark' ? 'light' : 'dark');
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === 'dark' ? t('themeToggleToLight') : t('themeToggleToDark')}
      className={`border-border text-text-secondary hover:border-accent hover:text-text-primary focus-visible:outline-accent flex h-9 w-9 items-center justify-center rounded-lg border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${className}`}
    >
      {theme === 'dark' ? <FiSun size={16} aria-hidden /> : <FiMoon size={16} aria-hidden />}
    </button>
  );
}
