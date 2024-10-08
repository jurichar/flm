// src/components/LocaleSwitcher.jsx

import { useLocale, useTranslations } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { locales } from '../../config';

const LocaleSwitcher = () => {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();

  return (
    <LocaleSwitcherSelect
      defaultValue={locale}
      items={locales.map((loc) => ({
        value: loc,
        label: t(loc),
      }))}
      label={t('label')}
    />
  );
};

export default LocaleSwitcher;
