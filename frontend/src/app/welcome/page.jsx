// src/app/welcome/page.jsx

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function WelcomePage() {
  const t = useTranslations('WelcomePage');

  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <Link href="/login">{t('signIn')}</Link>
    </div>
  );
}
