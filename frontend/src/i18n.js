import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector/cjs';
import HttpApi from 'i18next-http-backend';
import { initReactI18next } from '../node_modules/react-i18next';

i18n
  .use(HttpApi)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ['en', 'fr'],
    // supportedLngs: ['en', 'es', 'it', 'de'],
    fallbackLng: 'en',
    detection: {
      order: ['path', 'cookie', 'htmlTag', 'localStorage', 'subdomain'],
      caches: ['cookie'],
    },
    backend: {
      loadPath: '/locales/{{lng}}/translation.json',
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
