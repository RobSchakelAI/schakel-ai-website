import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import nlContent from '../lib/i18n/nl.json';
import enContent from '../lib/i18n/en.json';
import aiContent from '../lib/i18n/ai.json';

type Language = 'nl' | 'en' | 'ai';
type Content = typeof nlContent;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'nl' || saved === 'en' || saved === 'ai')) {
        return saved;
      }
    }
    return 'nl';
  });

  useEffect(() => {
    document.documentElement.lang = language === 'ai' ? 'nl' : language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const content = language === 'nl' ? nlContent : language === 'en' ? enContent : aiContent;

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
