'use client';

import { useState, type FormEvent } from 'react';
import { useTranslations } from 'next-intl';
import { FiPhone, FiMail, FiLinkedin } from 'react-icons/fi';
import { profileConfig } from '@/data/profile';
import { Button } from '@/components/ui/Button';

type Status = 'idle' | 'sending' | 'success' | 'error';

export function Contact() {
  const t = useTranslations('contact');
  const tForm = useTranslations('contact.form');
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');

    const form = event.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Request failed');

      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="border-border border-t">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-accent mb-2 text-sm font-medium">{t('eyebrow')}</p>
          <h2 className="text-text-primary text-3xl font-semibold">{t('heading')}</h2>
          <p className="text-text-secondary mt-4 max-w-md">{t('description')}</p>

          <div className="mt-8 flex flex-col gap-3">
            <a
              href={`tel:${profileConfig.phone.replace(/\s+/g, '')}`}
              className="text-text-secondary hover:text-text-primary flex items-center gap-3 transition-colors"
            >
              <FiPhone className="text-accent" aria-hidden /> {profileConfig.phone}
            </a>
            <a
              href={`mailto:${profileConfig.email}`}
              className="text-text-secondary hover:text-text-primary flex items-center gap-3 transition-colors"
            >
              <FiMail className="text-accent" aria-hidden /> {profileConfig.email}
            </a>
            <a
              href={profileConfig.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-text-primary flex items-center gap-3 transition-colors"
            >
              <FiLinkedin className="text-accent" aria-hidden />{' '}
              {profileConfig.linkedinUrl.replace('https://', '')}
            </a>
          </div>
        </div>

        <div className="border-border bg-surface rounded-2xl border p-6">
          <p className="text-text-secondary mb-6 text-sm">{t('openToWork')}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="name" className="text-text-secondary mb-1.5 block text-sm">
                {tForm('nameLabel')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                placeholder={tForm('namePlaceholder')}
                className="border-border bg-bg text-text-primary focus:border-accent w-full rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none"
              />
            </div>

            <div>
              <label htmlFor="email" className="text-text-secondary mb-1.5 block text-sm">
                {tForm('emailLabel')}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                placeholder={tForm('emailPlaceholder')}
                className="border-border bg-bg text-text-primary focus:border-accent w-full rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none"
              />
            </div>

            <div>
              <label htmlFor="message" className="text-text-secondary mb-1.5 block text-sm">
                {tForm('messageLabel')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                required
                placeholder={tForm('messagePlaceholder')}
                className="border-border bg-bg text-text-primary focus:border-accent w-full resize-none rounded-lg border px-3 py-2.5 text-sm transition-colors outline-none"
              />
            </div>

            <Button type="submit" variant="primary" disabled={status === 'sending'}>
              {status === 'sending' ? tForm('sending') : tForm('submit')}
            </Button>

            {status === 'success' && (
              <p role="status" className="text-accent text-sm">
                {tForm('success')}
              </p>
            )}
            {status === 'error' && (
              <p role="alert" className="text-sm text-red-400">
                {tForm('error')}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
