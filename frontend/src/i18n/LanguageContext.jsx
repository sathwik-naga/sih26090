import React, { createContext, useContext, useState, useEffect } from 'react';
import { LANGUAGES, DEFAULT_LANGUAGE } from './languages';
import { translations } from './translations';
import { getLocalizedProduct } from './productTranslations';

const LanguageContext = createContext();

// Category mapping helper
const CATEGORY_KEYS = {
  "Wood & Painted Crafts": "woodwork",
  "Terracotta & Pottery": "pottery",
  "Metal & Brass": "metalwork",
  "Handloom & Textiles": "textiles",
  "Embroidery & Needlework": "textiles",
  "Bamboo & Cane": "bamboo",
  "Traditional Paintings": "paintings",
  "Handmade Stationery": "leather",
  "Jewelry": "jewelry",
  "Leather Crafts": "leather",
  "Stone Carving": "stone",
  "Carpets & Rugs": "carpet"
};

// State mapping helper
const STATE_KEYS = {
  "Bihar": "bihar",
  "Uttar Pradesh": "uttarpradesh",
  "Tamil Nadu": "tamilnadu",
  "Andhra Pradesh": "andhrapradesh",
  "Karnataka": "karnataka",
  "Jammu & Kashmir": "kashmir",
  "Assam": "assam",
  "Rajasthan": "rajasthan",
  "West Bengal": "westbengal",
  "Gujarat": "gujarat",
  "Kerala": "kerala",
  "Odisha": "odisha",
  "Madhya Pradesh": "madhyapradesh",
  "Telangana": "telangana",
  "Maharashtra": "maharashtra",
  "Punjab": "punjab"
};

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
      
      // Update body class for RTL if needed
      if (langObj?.dir === 'rtl') {
        document.body.classList.add('rtl-layout');
      } else {
        document.body.classList.remove('rtl-layout');
      }
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
   * Translate key path with fallback to English
   * Example: t('nav.marketplace')
   */
  const t = (keyPath, fallback = '', params = {}) => {
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

    // 2. Fallback to English if not found
    if (val === undefined || typeof val !== 'string') {
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
        val = fallbackVal;
      }
    }

    // 3. Fallback argument or key
    if (val === undefined || typeof val !== 'string') {
      val = fallback || keyPath;
    }

    // Replace params: {name}, {count}, etc.
    if (params && typeof params === 'object') {
      for (const [k, v] of Object.entries(params)) {
        val = val.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      }
    }

    return val;
  };

  /**
   * Localize a product object or field
   */
  const tp = (product, field = null) => {
    if (!product) return field ? '' : null;
    const localized = getLocalizedProduct(product, currentLanguage);
    if (field) {
      return localized[field] !== undefined ? localized[field] : product[field];
    }
    return localized;
  };

  /**
   * Localize category name
   */
  const tc = (category) => {
    if (!category) return '';
    const key = CATEGORY_KEYS[category] || category.toLowerCase().replace(/[^a-z]/g, '');
    const translated = t(`categories.${key}`, '');
    return translated || category;
  };

  /**
   * Localize state/region name
   */
  const ts = (state) => {
    if (!state) return '';
    const key = STATE_KEYS[state] || state.toLowerCase().replace(/[^a-z]/g, '');
    const translated = t(`states.${key}`, '');
    return translated || state;
  };

  /**
   * Localize stock status or inquiry status
   */
  const tstatus = (status) => {
    if (!status) return '';
    const map = {
      'In Stock': t('statuses.inStock', 'In Stock'),
      'Out of Stock': t('statuses.outOfStock', 'Out of Stock'),
      'New': t('statuses.pending', 'New'),
      'Pending': t('statuses.pending', 'Pending'),
      'Replied': t('statuses.answered', 'Replied'),
      'Answered': t('statuses.answered', 'Answered'),
      'Active': t('statuses.active', 'Active'),
      'Inactive': t('statuses.inactive', 'Inactive')
    };
    return map[status] || status;
  };

  const currentLangObj = LANGUAGES.find(l => l.code === currentLanguage) || LANGUAGES[0];

  /**
   * Safe Speech Recognition with graceful fallback for Indic locales
   */
  const getSpeechRecognition = (onResult, onError, onEnd) => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      if (onError) onError(new Error(t('voice.notSupported', 'Speech recognition is not supported in this browser.')));
      return null;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = currentLangObj?.speechLocale || 'en-IN';

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;
      if (onResult) onResult(text);
    };

    recognition.onerror = (event) => {
      // If language not supported by browser, attempt fallback to hi-IN or en-IN
      if (event.error === 'language-not-supported' && recognition.lang !== 'en-IN') {
        try {
          recognition.lang = 'en-IN';
          recognition.start();
          return;
        } catch (e) {
          // ignore
        }
      }
      if (onError) onError(event);
    };

    if (onEnd) {
      recognition.onend = onEnd;
    }

    return recognition;
  };

  return (
    <LanguageContext.Provider
      value={{
        currentLanguage,
        currentLangObj,
        languages: LANGUAGES,
        dir: currentLangObj?.dir || 'ltr',
        changeLanguage,
        t,
        tp,
        tc,
        ts,
        tstatus,
        getSpeechRecognition
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
