import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import enTranslations from '../const/locales/en.json';
import esTranslations from '../const/locales/es.json';
import enExperiences from '../const/locales/experiences-en.json';
import esExperiences from '../const/locales/experiences-es.json';

const resources = {
  en: {
    translation: {
      ...enTranslations,
      ...enExperiences,
    },
  },
  es: {
    translation: {
      ...esTranslations,
      ...esExperiences,
    },
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already escapes values
    },
  });

export default i18n;