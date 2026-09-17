import React from 'react';
import { Award, CheckCircle2, Clock, PackageCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

export function Badge({ type, text, className = '' }) {
  const { t, tstatus } = useLanguage();

  if (type === 'gi') {
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-900 border border-amber-300 ${className}`}>
        <Award className="w-3 h-3 text-amber-700" />
        {text || t('productCard.giProvenance', 'GI Provenance')}
      </span>
    );
  }

  if (type === 'stock') {
    const isInStock = text === 'In Stock' || !text;
    const localizedStock = tstatus(text || 'In Stock');
    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isInStock 
          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
          : 'bg-amber-50 text-amber-800 border border-amber-200'
      } ${className}`}>
        {isInStock ? <PackageCheck className="w-3 h-3 text-emerald-600" /> : <Clock className="w-3 h-3 text-amber-600" />}
        {localizedStock}
      </span>
    );
  }

  if (type === 'verified') {
    return (
      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200 ${className}`}>
        <CheckCircle2 className="w-3 h-3 text-blue-600" />
        {text || t('productDetail.verifiedMaster', 'Verified Master Artisan')}
      </span>
    );
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#F4EFE6] text-[#7C4A3A] border border-[#E2D6C3] ${className}`}>
      {text}
    </span>
  );
}
