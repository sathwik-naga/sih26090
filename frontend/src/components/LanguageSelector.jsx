import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../i18n/LanguageContext';
import { Globe, ChevronDown, Check } from 'lucide-react';

export function LanguageSelector({ isMobile = false }) {
  const { currentLanguage, currentLangObj, languages, changeLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (code) => {
    changeLanguage(code);
    setIsOpen(false);
  };

  if (isMobile) {
    return (
      <div className="pt-2 pb-1 border-t border-[#EFE7DB]">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-stone-500 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{t('languageSelector.label')}:</span>
          </span>
          <span className="text-xs font-bold text-[#C85A32]">
            {currentLangObj.nativeName}
          </span>
        </div>
        <div className="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto p-1 bg-white rounded-xl border border-[#EFE7DB]">
          {languages.map((lang) => {
            const isSelected = lang.code === currentLanguage;
            return (
              <button
                key={lang.code}
                onClick={() => handleSelect(lang.code)}
                className={`text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                  isSelected
                    ? 'bg-[#FAF0E6] text-[#C85A32] font-bold border border-[#EACBB8]'
                    : 'text-stone-700 hover:bg-stone-50'
                }`}
              >
                <div className="truncate">
                  <span className="font-semibold block truncate leading-tight">{lang.nativeName}</span>
                  <span className="text-[10px] text-stone-400 block truncate leading-tight">{lang.name}</span>
                </div>
                {isSelected && <Check className="w-3.5 h-3.5 text-[#C85A32] shrink-0 ml-1" />}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="true"
        aria-expanded={isOpen}
        title={t('languageSelector.label')}
        className="px-3 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-[#EFE7DB] hover:border-[#C85A32]/40 shadow-xs flex items-center gap-2 transition-all cursor-pointer group"
      >
        <Globe className="w-4 h-4 text-[#C85A32] group-hover:rotate-12 transition-transform shrink-0" />
        <span className="font-bold text-stone-900 tracking-tight">{currentLangObj.nativeName}</span>
        <span className="text-[11px] text-stone-400 hidden xl:inline">({currentLangObj.name})</span>
        <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 max-h-80 overflow-y-auto rounded-2xl bg-white border border-[#EFE7DB] shadow-xl z-50 p-2 space-y-1 animate-in fade-in-50 zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-stone-100 text-[11px] font-bold text-stone-400 uppercase tracking-wider flex items-center justify-between">
            <span>{t('languageSelector.selectPrompt')}</span>
            <span className="text-[#C85A32]">{languages.length} {t('nav.switchLanguage')}</span>
          </div>

          <div className="space-y-0.5 pt-1">
            {languages.map((lang) => {
              const isSelected = lang.code === currentLanguage;
              return (
                <button
                  key={lang.code}
                  onClick={() => handleSelect(lang.code)}
                  className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#FAF0E6] text-[#C85A32] font-bold border border-[#EACBB8]'
                      : 'text-stone-700 hover:bg-stone-50 hover:text-stone-900'
                  }`}
                >
                  <div>
                    <span className="text-sm font-bold block text-stone-900 leading-snug">
                      {lang.nativeName}
                    </span>
                    <span className="text-[10px] text-stone-400 block leading-snug">
                      {lang.name}
                    </span>
                  </div>
                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-[#C85A32] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
