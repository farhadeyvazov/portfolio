'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { FiMenu } from 'react-icons/fi';
import { FaLinkedin } from 'react-icons/fa';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { profileConfig } from '@/data/profile';
import { NAV_ITEMS } from './nav-items';
import { MobileMenu } from './MobileMenu';

export function Header() {
  const t = useTranslations('nav');
  const tUi = useTranslations('ui');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <header className="border-border bg-bg/90 sticky top-0 z-40 border-b backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-text-primary focus-visible:outline-accent rounded text-lg font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Farhad<span className="text-accent">Eyvazov</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-6 lg:flex" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className="text-text-secondary hover:text-text-primary focus-visible:outline-accent rounded text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              >
                {t(item.key)}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <LanguageSwitcher />
            <ThemeToggle />
            <Button
              href={profileConfig.cvPath}
              download
              variant="primary"
              className="whitespace-nowrap"
            >
              {tUi('downloadCV')}
            </Button>
            <a
              href={profileConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={tUi('linkedin')}
              className="border-border text-text-secondary hover:border-accent hover:text-text-primary focus-visible:outline-accent flex h-9 w-9 items-center justify-center rounded-lg border transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <FaLinkedin size={16} aria-hidden />
            </a>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2 lg:hidden">
            <LanguageSwitcher />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label={tUi('menu')}
              aria-haspopup="dialog"
              aria-expanded={mobileMenuOpen}
              className="border-border text-text-primary focus-visible:outline-accent flex h-9 w-9 items-center justify-center rounded-lg border focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
            >
              <FiMenu size={18} aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
