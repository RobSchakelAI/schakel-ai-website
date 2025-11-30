/**
 * Language Context (i18n)
 * 
 * Provides internationalization for Dutch, English, and "AI View" modes.
 * - Persists language preference to localStorage
 * - Sets document.lang for accessibility/SEO
 * - AI View uses Dutch lang code but with technical/LLM-optimized content
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import nlContent from '../lib/i18n/nl.json';
import enContent from '../lib/i18n/en.json';
import aiContent from '../lib/i18n/ai.json';

type Language = 'nl' | 'en' | 'ai';
type Content = typeof nlContent;

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Content; // Translation object with all text content
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Initialize from localStorage or default to Dutch
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language') as Language;
      if (saved && (saved === 'nl' || saved === 'en' || saved === 'ai')) {
        return saved;
      }
    }
    return 'nl';
  });

  // Update HTML lang attribute for accessibility and SEO
  // AI View uses 'nl' as its content is still Dutch
  useEffect(() => {
    document.documentElement.lang = language === 'ai' ? 'nl' : language;
  }, [language]);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  // Select appropriate content based on language
  const content = language === 'nl' ? nlContent : language === 'en' ? enContent : aiContent;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: content }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Hook for consuming language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
