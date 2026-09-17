import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { 
  Menu, 
  X, 
  Store, 
  LayoutDashboard, 
  PackagePlus, 
  Boxes, 
  ShoppingBag, 
  Sparkles, 
  ChevronDown, 
  User, 
  RotateCcw, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';

export function Navbar() {
  const { currentRole, switchRole, activePage, navigateTo, resetSampleData, inquiries, artisan } = useApp();
  const { t } = useLanguage();
  
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [buyerMenuOpen, setBuyerMenuOpen] = useState(false);
  const [artisanMenuOpen, setArtisanMenuOpen] = useState(false);

  const buyerMenuRef = useRef(null);
  const artisanMenuRef = useRef(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (buyerMenuRef.current && !buyerMenuRef.current.contains(event.target)) {
        setBuyerMenuOpen(false);
      }
      if (artisanMenuRef.current && !artisanMenuRef.current.contains(event.target)) {
        setArtisanMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Count unread / new inquiries for badge
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;

  const isLanding = activePage === 'landing';
  const isBuyer = currentRole === 'buyer' && !isLanding;
  const isArtisan = currentRole === 'artisan' && !isLanding;

  const handleLogoClick = () => {
    if (activePage === 'landing') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigateTo('landing');
    }
    setMobileMenuOpen(false);
  };

  const scrollToSection = (sectionId) => {
    if (activePage !== 'landing') {
      navigateTo('landing');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 150);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF6F0]/95 backdrop-blur-md border-b border-[#EFE7DB] shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* ========================================================================= */}
          {/* BRAND LOGO - Smart Artisan is preserved as the brand name                */}
          {/* ========================================================================= */}
          <div 
            className="flex items-center gap-3 cursor-pointer group shrink-0 select-none" 
            onClick={handleLogoClick}
            title="Smart Artisan - Back to Home"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleLogoClick();
              }
            }}
          >
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#C85A32] to-[#B34726] flex items-center justify-center text-white shadow-md shadow-[#C85A32]/25 group-hover:scale-105 group-hover:shadow-lg group-hover:shadow-[#C85A32]/30 transition-all">
              <span className="text-xl">🏺</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif font-bold text-lg sm:text-xl text-stone-900 tracking-tight leading-tight group-hover:text-[#C85A32] transition-colors">
                  Smart Artisan
                </span>
                {isBuyer && (
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-[#FAF0E6] text-[#C85A32] border border-[#EACBB8]">
                    {t('nav.marketplace')}
                  </span>
                )}
                {isArtisan && (
                  <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-md bg-stone-900 text-amber-300">
                    {t('nav.artisanBadge')}
                  </span>
                )}
              </div>
              <span className="text-[11px] text-stone-500 hidden xl:block">
                {t('nav.tagline')}
              </span>
            </div>
          </div>

          {/* ========================================================================= */}
          {/* ROLE-BASED DESKTOP NAVIGATION                                             */}
          {/* ========================================================================= */}

          {/* 1. LANDING PAGE NAVIGATION */}
          {isLanding && (
            <nav className="hidden lg:flex items-center gap-2 xl:gap-3">
              <button
                onClick={() => scrollToSection('artisans')}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 hover:text-[#C85A32] hover:bg-[#FAF0E6]/60 transition-colors cursor-pointer"
              >
                {t('artisanSection.badge')}
              </button>
              <button
                onClick={() => scrollToSection('marketplace')}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 hover:text-[#C85A32] hover:bg-[#FAF0E6]/60 transition-colors cursor-pointer"
              >
                {t('nav.marketplace')}
              </button>
              <button
                onClick={() => scrollToSection('how-it-works')}
                className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-stone-700 hover:text-[#C85A32] hover:bg-[#FAF0E6]/60 transition-colors cursor-pointer"
              >
                {t('howItWorks.title')}
              </button>
            </nav>
          )}

          {/* 2. BUYER MARKETPLACE NAVIGATION */}
          {isBuyer && (
            <nav className="hidden md:flex items-center gap-2">
              <button
                onClick={() => navigateTo('marketplace')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  activePage === 'marketplace'
                    ? 'bg-white text-[#C85A32] shadow-xs border border-[#EFE7DB]'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/70'
                }`}
              >
                <ShoppingBag className="w-4 h-4 text-[#C85A32]" />
                <span>{t('nav.marketplace')}</span>
              </button>
            </nav>
          )}

          {/* 3. ARTISAN STUDIO NAVIGATION */}
          {isArtisan && (
            <nav className="hidden lg:flex items-center gap-2">
              <button
                onClick={() => navigateTo('dashboard')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  activePage === 'dashboard'
                    ? 'bg-white text-[#C85A32] shadow-xs border border-[#EFE7DB] font-bold'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/70'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>{t('nav.dashboard')}</span>
                {newInquiriesCount > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-600 text-white text-[10px] flex items-center justify-center font-bold">
                    {newInquiriesCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => navigateTo('my-products')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  activePage === 'my-products'
                    ? 'bg-white text-[#C85A32] shadow-xs border border-[#EFE7DB] font-bold'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-white/70'
                }`}
              >
                <Boxes className="w-4 h-4" />
                <span>{t('nav.myProducts')}</span>
              </button>

              <button
                onClick={() => navigateTo('add-product')}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-150 flex items-center gap-2 cursor-pointer ${
                  activePage === 'add-product'
                    ? 'bg-[#A33D1C] text-white shadow-sm'
                    : 'bg-[#C85A32] hover:bg-[#A33D1C] text-white shadow-xs'
                }`}
              >
                <PackagePlus className="w-4 h-4" />
                <span>{t('nav.addProduct')}</span>
              </button>
            </nav>
          )}

          {/* ========================================================================= */}
          {/* DESKTOP RIGHT CONTROLS: Multi-Language Selector + Contextual Actions     */}
          {/* ========================================================================= */}
          <div className="hidden md:flex items-center gap-3">
            
            {/* Multi-language Selector (Supports all 23 languages) */}
            <LanguageSelector />

            {/* A. LANDING PAGE CTAs */}
            {isLanding && (
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => {
                    switchRole('artisan');
                    navigateTo('dashboard');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#FAF0E6] text-[#C85A32] border border-[#EACBB8] hover:bg-[#C85A32] hover:text-white transition-all duration-200 flex items-center gap-1.5 shadow-xs cursor-pointer group"
                >
                  <Store className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span>{t('nav.artisanBadge')}</span>
                </button>

                <button
                  onClick={() => {
                    switchRole('buyer');
                    navigateTo('marketplace');
                  }}
                  className="px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold bg-stone-900 text-white hover:bg-stone-800 transition-all duration-200 flex items-center gap-1.5 shadow-xs cursor-pointer group"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300 group-hover:scale-110 transition-transform" />
                  <span>{t('nav.marketplace')}</span>
                </button>
              </div>
            )}

            {/* B. BUYER MARKETPLACE MENU */}
            {isBuyer && (
              <div className="relative" ref={buyerMenuRef}>
                <button
                  onClick={() => setBuyerMenuOpen(!buyerMenuOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#EFE7DB] text-xs font-semibold text-stone-800 hover:border-[#C85A32] shadow-xs cursor-pointer transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center font-bold text-xs">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold">{t('artisanSection.featureDirect')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${buyerMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {buyerMenuOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#EFE7DB] py-2 z-50 animate-in fade-in-50 duration-150 text-left">
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900">{t('marketplaceSection.badge')}</p>
                      <p className="text-[11px] text-stone-500 truncate">{t('nav.tagline')}</p>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <button
                        onClick={() => {
                          navigateTo('marketplace');
                          setBuyerMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs flex items-center gap-2.5 cursor-pointer ${
                          activePage === 'marketplace' ? 'bg-[#FAF0E6] text-[#C85A32] font-bold' : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <ShoppingBag className="w-4 h-4 text-[#C85A32]" />
                        <span>{t('nav.marketplace')}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigateTo('landing');
                          setBuyerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-stone-400" />
                        <span>{t('nav.home')}</span>
                      </button>
                    </div>

                    <div className="my-1 border-t border-stone-100" />

                    <div className="p-1">
                      <button
                        onClick={() => {
                          switchRole('artisan');
                          setBuyerMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-600 hover:bg-[#FAF0E6] hover:text-[#C85A32] flex items-center justify-between cursor-pointer group"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <Store className="w-4 h-4 text-[#C85A32]" />
                          {t('nav.artisanBadge')}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* C. ARTISAN STUDIO MENU */}
            {isArtisan && (
              <div className="relative flex items-center gap-2" ref={artisanMenuRef}>
                <button
                  onClick={() => setArtisanMenuOpen(!artisanMenuOpen)}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white border border-[#EFE7DB] text-xs font-semibold text-stone-800 hover:border-[#C85A32] shadow-xs cursor-pointer transition-all"
                >
                  <div className="w-6 h-6 rounded-lg bg-stone-900 text-amber-300 flex items-center justify-center font-bold text-xs">
                    <Store className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-bold truncate max-w-[120px]">{artisan?.name || t('nav.artisanBadge')}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${artisanMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {artisanMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-[#EFE7DB] py-2 z-50 animate-in fade-in-50 duration-150 text-left top-full">
                    <div className="px-4 py-2.5 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900">{artisan?.name || t('nav.artisanBadge')}</p>
                      <p className="text-[11px] text-stone-500 truncate">{artisan?.village || t('hero.statsRegions')}</p>
                    </div>

                    <div className="p-1 space-y-0.5">
                      <button
                        onClick={() => {
                          navigateTo('dashboard');
                          setArtisanMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs flex items-center gap-2.5 cursor-pointer ${
                          activePage === 'dashboard' ? 'bg-[#FAF0E6] text-[#C85A32] font-bold' : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <LayoutDashboard className="w-4 h-4 text-[#C85A32]" />
                        <span>{t('nav.dashboard')}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigateTo('my-products');
                          setArtisanMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs flex items-center gap-2.5 cursor-pointer ${
                          activePage === 'my-products' ? 'bg-[#FAF0E6] text-[#C85A32] font-bold' : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <Boxes className="w-4 h-4 text-stone-500" />
                        <span>{t('nav.myProducts')}</span>
                      </button>

                      <button
                        onClick={() => {
                          navigateTo('add-product');
                          setArtisanMenuOpen(false);
                        }}
                        className={`w-full text-left px-3.5 py-2 rounded-xl text-xs flex items-center gap-2.5 cursor-pointer ${
                          activePage === 'add-product' ? 'bg-[#FAF0E6] text-[#C85A32] font-bold' : 'text-stone-700 hover:bg-stone-50'
                        }`}
                      >
                        <PackagePlus className="w-4 h-4 text-[#C85A32]" />
                        <span>{t('nav.addProduct')}</span>
                      </button>
                    </div>

                    <div className="my-1 border-t border-stone-100" />

                    <div className="p-1 space-y-0.5">
                      <button
                        onClick={() => {
                          switchRole('buyer');
                          setArtisanMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center justify-between cursor-pointer group"
                      >
                        <span className="flex items-center gap-2 font-medium">
                          <ShoppingBag className="w-4 h-4 text-stone-500" />
                          {t('nav.marketplace')}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:translate-x-0.5 transition-transform" />
                      </button>

                      <button
                        onClick={() => {
                          navigateTo('landing');
                          setArtisanMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-700 hover:bg-stone-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <Sparkles className="w-4 h-4 text-stone-400" />
                        <span>{t('nav.home')}</span>
                      </button>

                      <button
                        onClick={() => {
                          resetSampleData();
                          setArtisanMenuOpen(false);
                        }}
                        className="w-full text-left px-3.5 py-2 rounded-xl text-xs text-stone-500 hover:text-stone-800 hover:bg-stone-50 flex items-center gap-2.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
                        <span>{t('common.retry')}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* ========================================================================= */}
          {/* MOBILE HAMBURGER BUTTON                                                   */}
          {/* ========================================================================= */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="p-2 text-stone-700 hover:bg-stone-100 rounded-xl transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER MENU                                                        */}
      {/* ========================================================================= */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF6F0] border-b border-[#EFE7DB] px-4 pt-3 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          
          {/* Mobile Language Selector */}
          <LanguageSelector isMobile={true} />

          {/* 1. Mobile Landing Page Drawer */}
          {isLanding && (
            <div className="space-y-2 pt-2 border-t border-[#EFE7DB]">
              <div className="space-y-1 pb-3 border-b border-[#EFE7DB]">
                <button
                  onClick={() => scrollToSection('artisans')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-white flex items-center justify-between"
                >
                  <span>{t('artisanSection.badge')}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => scrollToSection('marketplace')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-white flex items-center justify-between"
                >
                  <span>{t('nav.marketplace')}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
                <button
                  onClick={() => scrollToSection('how-it-works')}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-white flex items-center justify-between"
                >
                  <span>{t('howItWorks.title')}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              {/* Mobile Landing CTAs */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={() => {
                    switchRole('artisan');
                    navigateTo('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-[#FAF0E6] text-[#C85A32] border border-[#EACBB8] flex items-center justify-center gap-2 shadow-xs"
                >
                  <Store className="w-4 h-4" />
                  <span>{t('nav.artisanBadge')}</span>
                </button>
                <button
                  onClick={() => {
                    switchRole('buyer');
                    navigateTo('marketplace');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-3 px-4 rounded-xl text-sm font-bold bg-stone-900 text-white flex items-center justify-center gap-2 shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-300" />
                  <span>{t('nav.marketplace')}</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. Mobile Buyer Marketplace Drawer */}
          {isBuyer && (
            <div className="space-y-2 pt-2 border-t border-[#EFE7DB]">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    navigateTo('marketplace');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold flex items-center justify-between ${
                    activePage === 'marketplace' ? 'bg-[#FAF0E6] text-[#C85A32]' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-[#C85A32]" />
                    <span>{t('nav.marketplace')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => {
                    navigateTo('landing');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-stone-400" />
                    <span>{t('nav.home')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              <div className="pt-3 border-t border-[#EFE7DB]">
                <button
                  onClick={() => {
                    switchRole('artisan');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2.5 px-3 rounded-xl text-xs font-semibold text-stone-600 bg-stone-100 hover:bg-[#FAF0E6] hover:text-[#C85A32] flex items-center justify-center gap-2"
                >
                  <Store className="w-4 h-4 text-[#C85A32]" />
                  <span>{t('nav.artisanBadge')}</span>
                </button>
              </div>
            </div>
          )}

          {/* 3. Mobile Artisan Studio Drawer */}
          {isArtisan && (
            <div className="space-y-2 pt-2 border-t border-[#EFE7DB]">
              <div className="space-y-1">
                <button
                  onClick={() => {
                    navigateTo('dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    activePage === 'dashboard' ? 'bg-[#FAF0E6] text-[#C85A32] font-bold' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>{t('nav.dashboard')}</span>
                  </span>
                  {newInquiriesCount > 0 && (
                    <span className="bg-red-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                      {newInquiriesCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={() => {
                    navigateTo('my-products');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold flex items-center justify-between ${
                    activePage === 'my-products' ? 'bg-[#FAF0E6] text-[#C85A32] font-bold' : 'text-stone-700 hover:bg-stone-100'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Boxes className="w-4 h-4" />
                    <span>{t('nav.myProducts')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => {
                    navigateTo('add-product');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold bg-[#C85A32] text-white flex items-center justify-between shadow-xs"
                >
                  <span className="flex items-center gap-2">
                    <PackagePlus className="w-4 h-4" />
                    <span>{t('nav.addProduct')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    switchRole('buyer');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <ShoppingBag className="w-4 h-4 text-stone-400" />
                    <span>{t('nav.marketplace')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>

                <button
                  onClick={() => {
                    navigateTo('landing');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-semibold text-stone-700 hover:bg-stone-100 flex items-center justify-between"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-stone-400" />
                    <span>{t('nav.home')}</span>
                  </span>
                  <ArrowRight className="w-4 h-4 text-stone-400" />
                </button>
              </div>

              <div className="pt-3 border-t border-[#EFE7DB] flex justify-between items-center text-xs text-stone-400">
                <span>{t('nav.artisanBadge')}</span>
                <button onClick={resetSampleData} className="underline flex items-center gap-1 cursor-pointer">
                  <RotateCcw className="w-3 h-3" /> {t('common.retry')}
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </header>
  );
}
