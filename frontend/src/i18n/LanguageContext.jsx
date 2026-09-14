import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE } from './languages';
import { translations } from './translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_artisan_language');
      const found = LANGUAGES.some(l => l.code === saved);
      return found ? saved : DEFAULT_LANGUAGE;
    } catch (e) {
      return DEFAULT_LANGUAGE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('smart_artisan_language', currentLanguage);
      const langObj = LANGUAGES.find(l => l.code === currentLanguage);
      document.documentElement.lang = currentLanguage;
      document.documentElement.dir = langObj?.dir || 'ltr';
    } catch (e) {
      console.error(e);
    }
  }, [currentLanguage]);

  const changeLanguage = (langCode) => {
    if (LANGUAGES.some(l => l.code === langCode)) {
      setCurrentLanguage(langCode);
    }
  };

  /**
   * Helper to translate a key path with fallback to English
   * Example: t('nav.marketplace') or t('hero.titleLine1')
   */
  const t = (keyPath, fallback = '') => {
    if (!keyPath) return '';
    const parts = keyPath.split('.');
    
    // 1. Try current language
    let val = translations[currentLanguage];
    for (const part of parts) {
      if (val && typeof val === 'object' && part in val) {
        val = val[part];
      } else {
        val = undefined;
        break;
      }
    }
    if (val !== undefined && typeof val === 'string') {
      return val;
    }

    // 2. Fallback to English
    let fallbackVal = translations[DEFAULT_LANGUAGE];
    for (const part of parts) {
      if (fallbackVal && typeof fallbackVal === 'object' && part in fallbackVal) {
        fallbackVal = fallbackVal[part];
      } else {
        fallbackVal = undefined;
        break;
      }
    }
    if (fallbackVal !== undefined && typeof fallbackVal === 'string') {
      return fallbackVal;
    }

    // 3. Fallback argument or key itself
    return fallback || keyPath;
  };

  const currentLangObj = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        currentLangObj,
        languages: LANGUAGES,
        changeLanguage,
        t,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
