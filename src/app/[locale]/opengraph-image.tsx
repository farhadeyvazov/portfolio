import { ImageResponse } from 'next/og';
import { getTranslations } from 'next-intl/server';
import { profileConfig } from '@/data/profile';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'hero' });

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '80px',
        backgroundColor: '#080D13',
        backgroundImage: 'linear-gradient(135deg, #080D13 0%, #0E151D 100%)',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', color: '#2F80ED', fontSize: 28, fontWeight: 600 }}>
        {t('eyebrow')}
      </div>
      <div
        style={{
          display: 'flex',
          color: '#F5F7FA',
          fontSize: 64,
          fontWeight: 700,
          marginTop: 24,
          lineHeight: 1.15,
        }}
      >
        {profileConfig.name}
      </div>
      <div style={{ display: 'flex', color: '#9AA6B2', fontSize: 30, marginTop: 24 }}>
        React · Java · Node.js
      </div>
    </div>,
    { ...size },
  );
}
