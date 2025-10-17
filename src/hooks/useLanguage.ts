import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  const currentLanguage = i18n.language;
  const isEnglish = currentLanguage === 'en';
  const isSpanish = currentLanguage === 'es';

  return {
    toggleLanguage,
    currentLanguage,
    isEnglish,
    isSpanish,
  };
};