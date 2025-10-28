import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import nlContent from '../lib/i18n/nl.json';
import enContent from '../lib/i18n/en.json';

type Language = 'nl' | 'en';
type Content = typeof nlContent;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('nl');

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language;
    if (saved && (saved === 'nl' || saved === 'en')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
  };

  const content = language === 'nl' ? nlContent : enContent;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: content }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
