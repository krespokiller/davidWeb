import React from 'react';
import { useTranslation } from 'react-i18next';
import { Heading, Button } from '@/components/atoms';
import { useLanguage } from '@/hooks';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { toggleLanguage, isEnglish } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-0 right-0 z-50 bg-transparent backdrop-blur-none p-6">
      <button
        onClick={toggleLanguage}
        className="flex items-center space-x-2 text-gray-400 hover:text-light transition-colors duration-300 font-light tracking-wide text-sm"
        title={isEnglish ? 'Switch to Spanish' : 'Cambiar a Inglés'}
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
        </svg>
        <span>{isEnglish ? 'EN' : 'ES'}</span>
      </button>
    </header>
  );
};