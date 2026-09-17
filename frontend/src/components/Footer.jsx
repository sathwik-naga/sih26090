import React from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { HeartHandshake } from 'lucide-react';

export function Footer() {
  const { navigateTo, switchRole } = useApp();
  const { t, ts } = useLanguage();

  return (
    <footer className="bg-[#FAF6F0] text-stone-600 border-t border-[#EFE7DB] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Col 1: Brand */}
          <div className="md:col-span-1 space-y-3">
            <div 
              className="flex items-center gap-3 cursor-pointer group select-none"
              onClick={() => navigateTo('landing')}
              title="Smart Artisan - Back to Home"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#B34726] flex items-center justify-center text-white font-bold text-lg shadow-sm group-hover:scale-105 transition-transform">
                🏺
              </div>
              <span className="font-serif font-bold text-xl text-stone-900 tracking-tight group-hover:text-[#C85A32] transition-colors">
                Smart Artisan
              </span>
            </div>
            <p className="text-xs text-stone-500 leading-relaxed">
              {t('footer.brandDesc')}
            </p>
          </div>

          {/* Col 2: Artisan Studio */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider uppercase mb-3">
              {t('nav.artisanBadge')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-500">
              <li>
                <button onClick={() => { switchRole('artisan'); navigateTo('dashboard'); }} className="hover:text-[#C85A32] transition-colors cursor-pointer">
                  {t('nav.dashboard')}
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('artisan'); navigateTo('add-product'); }} className="hover:text-[#C85A32] transition-colors cursor-pointer">
                  {t('nav.addProduct')}
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('artisan'); navigateTo('my-products'); }} className="hover:text-[#C85A32] transition-colors cursor-pointer">
                  {t('nav.myProducts')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Buyer Solutions */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider uppercase mb-3">
              {t('nav.marketplace')}
            </h4>
            <ul className="space-y-2 text-xs text-stone-500">
              <li>
                <button onClick={() => { switchRole('buyer'); navigateTo('marketplace'); }} className="hover:text-[#C85A32] transition-colors cursor-pointer">
                  {t('marketplaceSection.badge')}
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('buyer'); navigateTo('marketplace'); }} className="hover:text-[#C85A32] transition-colors cursor-pointer">
                  {t('matcher.highDemand')}
                </button>
              </li>
              <li>
                <button onClick={() => { switchRole('buyer'); navigateTo('marketplace'); }} className="hover:text-[#C85A32] transition-colors cursor-pointer">
                  {t('productDetail.inquireNow')}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Craft Regions */}
          <div>
            <h4 className="font-serif text-sm font-bold text-stone-900 tracking-wider uppercase mb-3">
              {t('hero.statsRegions')}
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-3">
              {['Rajasthan', 'West Bengal', 'Karnataka', 'Gujarat', 'Jammu & Kashmir'].map(region => (
                <span key={region} className="text-[11px] bg-white border border-[#EFE7DB] text-stone-600 px-2.5 py-0.5 rounded-lg">
                  {ts(region)}
                </span>
              ))}
            </div>
            <p className="text-xs text-stone-500">
              {t('nav.tagline')}
            </p>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-[#EFE7DB] flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
          <p>© 2026 Smart Artisan. {t('footer.rights')}</p>
          <div className="flex items-center gap-1 text-stone-600 font-medium">
            <HeartHandshake className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>{t('footer.madeWithLove')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
