import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { CRAFT_IMAGES, AUTHENTIC_CRAFT_COLLECTION } from '../data/craftImages';
import { 
  Sparkles, 
  Store, 
  ShoppingBag, 
  ShieldCheck, 
  ArrowRight, 
  Layers, 
  MessageSquareQuote, 
  MapPin, 
  BookOpen, 
  Feather, 
  Tag, 
  Boxes, 
  Globe2, 
  Gem, 
  HeartHandshake, 
  Smartphone, 
  Eye, 
  Check 
} from 'lucide-react';

export function LandingPage() {
  const { navigateTo, switchRole } = useApp();
  const { t } = useLanguage();
  const [heroIndex, setHeroIndex] = useState(0);
  const heroCrafts = AUTHENTIC_CRAFT_COLLECTION.slice(0, 4);
  const activeHeroCraft = heroCrafts[heroIndex] || heroCrafts[0];

  const handleArtisanJourney = () => {
    switchRole('artisan');
    navigateTo('dashboard');
  };

  const handleBuyerJourney = () => {
    switchRole('buyer');
    navigateTo('marketplace');
  };

  return (
    <div className="relative overflow-hidden bg-[#FAF6F0] text-stone-900 selection:bg-[#C85A32] selection:text-white">
      
      {/* ========================================================================= */}
      {/* 1. HERO SECTION                                                           */}
      {/* ========================================================================= */}
      <section className="relative pt-12 pb-16 lg:pt-20 lg:pb-24 overflow-hidden border-b border-[#EFE7DB]">
        {/* Subtle warm glow background accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#C85A32]/8 via-[#D97706]/4 to-transparent rounded-full blur-3xl pointer-events-none -z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            
            {/* Left Column: Heading, Platform Statement & Dual CTAs */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              {/* Platform Statement */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EACBB8] shadow-xs text-xs sm:text-sm font-semibold text-[#C85A32]">
                <Sparkles className="w-4 h-4 text-[#C85A32] shrink-0" />
                <span>{t('hero.statement')}</span>
              </div>

              {/* Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.12]">
                {t('hero.titleLine1')}<br />
                <span className="text-[#C85A32] italic font-normal">{t('hero.titleLine2')}</span>
              </h1>

              {/* Subheading */}
              <p className="text-base sm:text-lg text-stone-600 max-w-2xl leading-relaxed">
                {t('hero.subtitle')}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <button
                  onClick={handleArtisanJourney}
                  className="px-7 py-3.5 rounded-2xl bg-[#C85A32] hover:bg-[#A33D1C] text-white font-bold text-sm sm:text-base shadow-lg shadow-[#C85A32]/25 hover:shadow-xl hover:shadow-[#C85A32]/35 transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
                >
                  <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>{t('hero.startArtisan')}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={handleBuyerJourney}
                  className="px-7 py-3.5 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group border border-stone-300"
                >
                  <ShoppingBag className="w-5 h-5 text-[#C85A32] group-hover:scale-110 transition-transform" />
                  <span>{t('hero.exploreMarketplace')}</span>
                  <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              {/* Simple Value Highlights */}
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-stone-600 border-t border-[#EFE7DB]">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{t('hero.directLinkages')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{t('hero.authenticHeritage')}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <span className="font-medium">{t('hero.zeroCommission')}</span>
                </div>
              </div>

            </div>

            {/* Right Column: Clean Editorial Authentic Craft Showcase */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="bg-white p-3.5 rounded-3xl shadow-xl border border-[#EFE7DB]">
                  {/* Main Product Display Card */}
                  <div 
                    onClick={() => navigateTo('product-detail', activeHeroCraft.id)}
                    className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-stone-100 cursor-pointer group"
                  >
                    <img
                      src={activeHeroCraft.image}
                      alt={activeHeroCraft.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/95 backdrop-blur-sm text-stone-900 text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {activeHeroCraft.category}
                      </span>
                    </div>

                    {/* Price pill */}
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#C85A32] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                        ₹{activeHeroCraft.price.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <div className="absolute bottom-3.5 left-3.5 right-3.5 text-white">
                      <p className="font-serif font-bold text-base sm:text-lg leading-snug drop-shadow-sm">
                        {activeHeroCraft.title}
                      </p>
                      <p className="text-xs text-stone-200 mt-1 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-[#EACBB8]" />
                        <span>{activeHeroCraft.location}</span>
                        <span>•</span>
                        <span className="text-amber-300 font-semibold">{activeHeroCraft.artisan}</span>
                      </p>
                    </div>
                  </div>

                  {/* Curated Interactive Thumbnail Bar */}
                  <div className="pt-3 pb-1 px-1">
                    <div className="flex items-center justify-between text-[11px] font-semibold text-stone-400 mb-2">
                      <span>Featured Heritage Crafts</span>
                      <span className="text-[#C85A32]">{heroIndex + 1} of {heroCrafts.length}</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {heroCrafts.map((craft, idx) => {
                        const isSelected = idx === heroIndex;
                        return (
                          <button
                            key={craft.id}
                            onClick={() => setHeroIndex(idx)}
                            className={`relative rounded-xl overflow-hidden aspect-square border-2 transition-all duration-200 cursor-pointer ${
                              isSelected 
                                ? 'border-[#C85A32] ring-2 ring-[#C85A32]/30 scale-105 shadow-sm' 
                                : 'border-transparent opacity-70 hover:opacity-100 hover:border-stone-300'
                            }`}
                            title={craft.title}
                          >
                            <img
                              src={craft.image}
                              alt={craft.title}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Action link */}
                  <div className="p-3 pt-2 flex items-center justify-between text-xs border-t border-stone-100 mt-2">
                    <span className="text-stone-500 font-medium">
                      100% Direct Master Artisan Made
                    </span>
                    <button
                      onClick={() => navigateTo('product-detail', activeHeroCraft.id)}
                      className="text-[#C85A32] font-bold hover:text-[#A33D1C] flex items-center gap-1 cursor-pointer"
                    >
                      <span>Explore Craft</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>


      {/* ========================================================================= */}
      {/* 2. DEDICATED "FOR ARTISANS" SECTION (#artisans)                           */}
      {/* ========================================================================= */}
      <section id="artisans" className="scroll-mt-20 py-20 lg:py-24 bg-[#FAF0E6]/50 border-b border-[#EACBB8]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-[#EACBB8] text-xs font-bold text-[#C85A32] uppercase tracking-wider mb-3 shadow-xs">
              <Store className="w-3.5 h-3.5" />
              <span>{t('artisanSection.badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              {t('artisanSection.title')}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
              {t('artisanSection.desc')}
            </p>
          </div>

          {/* Clean 6-Card Full-Width Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Create Digital Catalogs */}
            <div className="bg-white p-6 rounded-2xl border border-[#EACBB8]/80 shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('artisanSection.card1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('artisanSection.card1Desc')}
              </p>
            </div>

            {/* 2. Showcase Heritage Stories */}
            <div className="bg-white p-6 rounded-2xl border border-[#EACBB8]/80 shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Feather className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('artisanSection.card2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('artisanSection.card2Desc')}
              </p>
            </div>

            {/* 3. Set Retail & Wholesale Prices */}
            <div className="bg-white p-6 rounded-2xl border border-[#EACBB8]/80 shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Tag className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('artisanSection.card3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('artisanSection.card3Desc')}
              </p>
            </div>

            {/* 4. Manage Products & Stock */}
            <div className="bg-white p-6 rounded-2xl border border-[#EACBB8]/80 shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Boxes className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('artisanSection.card4Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('artisanSection.card4Desc')}
              </p>
            </div>

            {/* 5. Receive Direct Buyer Enquiries */}
            <div className="bg-white p-6 rounded-2xl border border-[#EACBB8]/80 shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MessageSquareQuote className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('artisanSection.card5Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('artisanSection.card5Desc')}
              </p>
            </div>

            {/* 6. Reach New Markets */}
            <div className="bg-white p-6 rounded-2xl border border-[#EACBB8]/80 shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('artisanSection.card6Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('artisanSection.card6Desc')}
              </p>
            </div>

          </div>

          {/* Simple CTA Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleArtisanJourney}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-[#C85A32] hover:bg-[#A33D1C] text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <span>{t('artisanSection.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 3. DEDICATED "MARKETPLACE / BUYERS" SECTION (#marketplace)                */}
      {/* ========================================================================= */}
      <section id="marketplace" className="scroll-mt-20 py-20 lg:py-24 bg-white border-b border-[#EFE7DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="max-w-3xl mx-auto text-center mb-14 lg:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6F0] border border-[#EFE7DB] text-xs font-bold text-stone-800 uppercase tracking-wider mb-3 shadow-xs">
              <ShoppingBag className="w-3.5 h-3.5 text-[#C85A32]" />
              <span>{t('marketplaceSection.badge')}</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight">
              {t('marketplaceSection.title')}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
              {t('marketplaceSection.desc')}
            </p>
          </div>

          {/* Clean 6-Card Full-Width Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Discover Handmade Products */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#EFE7DB] shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C85A32] border border-[#EFE7DB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Gem className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('marketplaceSection.card1Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('marketplaceSection.card1Desc')}
              </p>
            </div>

            {/* 2. Explore by Region & Category */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#EFE7DB] shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C85A32] border border-[#EFE7DB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('marketplaceSection.card2Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('marketplaceSection.card2Desc')}
              </p>
            </div>

            {/* 3. View Craft Provenance */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#EFE7DB] shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C85A32] border border-[#EFE7DB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('marketplaceSection.card3Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('marketplaceSection.card3Desc')}
              </p>
            </div>

            {/* 4. Source Wholesale Orders */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#EFE7DB] shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C85A32] border border-[#EFE7DB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('marketplaceSection.card4Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('marketplaceSection.card4Desc')}
              </p>
            </div>

            {/* 5. Connect Directly with Artisans */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#EFE7DB] shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C85A32] border border-[#EFE7DB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('marketplaceSection.card5Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('marketplaceSection.card5Desc')}
              </p>
            </div>

            {/* 6. Find Unique Traditional Products */}
            <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#EFE7DB] shadow-xs hover:shadow-md hover:border-[#C85A32] transition-all duration-200 group">
              <div className="w-12 h-12 rounded-xl bg-white text-[#C85A32] border border-[#EFE7DB] flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-stone-900 group-hover:text-[#C85A32] transition-colors">
                {t('marketplaceSection.card6Title')}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                {t('marketplaceSection.card6Desc')}
              </p>
            </div>

          </div>

          {/* Authentic Craft Discoveries Grid (Uploaded Authentic Handicrafts) */}
          <div className="mt-16 pt-12 border-t border-[#EFE7DB]">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C85A32] uppercase tracking-wider mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Authentic Handcrafted Visuals</span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  Featured Heritage Craft Discoveries
                </h3>
                <p className="text-xs sm:text-sm text-stone-500 mt-1">
                  100% verified traditional creations handcrafted by master rural artisans.
                </p>
              </div>
              <button
                onClick={handleBuyerJourney}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#C85A32] hover:text-[#A33D1C] cursor-pointer group"
              >
                <span>View All 10 Masterpieces</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {AUTHENTIC_CRAFT_COLLECTION.slice(0, 6).map((craft) => (
                <div
                  key={craft.id}
                  onClick={() => navigateTo('product-detail', craft.id)}
                  className="bg-[#FAF6F0] rounded-2xl overflow-hidden border border-[#EFE7DB] hover:border-[#C85A32]/40 hover:shadow-md transition-all duration-200 cursor-pointer group flex flex-col justify-between"
                >
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={craft.image}
                      alt={craft.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="bg-white/90 backdrop-blur-xs text-stone-800 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-xs">
                        {craft.category}
                      </span>
                    </div>
                    {craft.isFeatured && (
                      <div className="absolute top-3 right-3">
                        <span className="bg-[#C85A32] text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs">
                          Heritage Craft
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-1.5 text-[11px] text-stone-500 mb-1.5">
                        <MapPin className="w-3 h-3 text-[#C85A32]" />
                        <span>{craft.location}</span>
                        <span>•</span>
                        <span className="text-stone-700 font-medium">{craft.artisan}</span>
                      </div>
                      <h4 className="font-serif font-bold text-stone-900 text-sm sm:text-base group-hover:text-[#C85A32] transition-colors line-clamp-2">
                        {craft.title}
                      </h4>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 block font-medium">Direct Retail</span>
                        <span className="font-bold text-stone-900 text-base">
                          ₹{craft.price.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-[#C85A32] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        Explore
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Simple CTA Button */}
          <div className="mt-12 text-center">
            <button
              onClick={handleBuyerJourney}
              className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-base shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group"
            >
              <span>{t('marketplaceSection.cta')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform text-amber-300" />
            </button>
          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 4. HOW IT WORKS SECTION (#how-it-works)                                   */}
      {/* ========================================================================= */}
      <section id="how-it-works" className="scroll-mt-20 py-20 lg:py-24 bg-[#FAF6F0] border-b border-[#EFE7DB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">
              {t('howItWorks.process')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 mt-2 tracking-tight">
              {t('howItWorks.title')}
            </h2>
            <p className="text-base sm:text-lg text-stone-600 mt-3 leading-relaxed">
              {t('howItWorks.desc')}
            </p>
          </div>

          {/* Clean 4-Step Flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFE7DB] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif font-bold text-2xl text-[#C85A32]">01</span>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center font-bold">
                    <Feather className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                  {t('howItWorks.step1Title')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t('howItWorks.step1Desc')}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-xs font-semibold text-[#C85A32]">
                {t('howItWorks.step1Tag')}
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFE7DB] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif font-bold text-2xl text-[#C85A32]">02</span>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center font-bold">
                    <Smartphone className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                  {t('howItWorks.step2Title')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t('howItWorks.step2Desc')}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-xs font-semibold text-[#C85A32]">
                {t('howItWorks.step2Tag')}
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFE7DB] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif font-bold text-2xl text-[#C85A32]">03</span>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center font-bold">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                  {t('howItWorks.step3Title')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t('howItWorks.step3Desc')}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-xs font-semibold text-[#C85A32]">
                {t('howItWorks.step3Tag')}
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-6 rounded-2xl border border-[#EFE7DB] shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif font-bold text-2xl text-[#C85A32]">04</span>
                  <div className="w-10 h-10 rounded-xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center font-bold">
                    <HeartHandshake className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="font-serif font-bold text-lg text-stone-900 mb-2">
                  {t('howItWorks.step4Title')}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {t('howItWorks.step4Desc')}
                </p>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-100 text-xs font-semibold text-[#C85A32]">
                {t('howItWorks.step4Tag')}
              </div>
            </div>

          </div>

        </div>
      </section>


      {/* ========================================================================= */}
      {/* 5. FINAL CTA SECTION                                                      */}
      {/* ========================================================================= */}
      <section className="py-20 lg:py-24 bg-gradient-to-br from-[#FAF0E6] via-[#FAF3EC] to-[#EFE7DB] relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8 relative z-10">
          
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-[#EACBB8] shadow-xs text-xs font-bold text-[#C85A32]">
            <Sparkles className="w-4 h-4 text-[#C85A32]" />
            <span>{t('nav.brand')}</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 tracking-tight leading-tight">
            {t('finalCta.titleLine1')}<br />
            <span className="text-[#C85A32] italic font-normal">{t('finalCta.titleLine2')}</span>
          </h2>

          <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed">
            {t('finalCta.desc')}
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleArtisanJourney}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#C85A32] hover:bg-[#A33D1C] text-white font-bold text-base shadow-lg shadow-[#C85A32]/25 hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
            >
              <Store className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{t('finalCta.joinArtisan')}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleBuyerJourney}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-stone-50 text-stone-900 font-bold text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group border border-stone-300"
            >
              <ShoppingBag className="w-5 h-5 text-[#C85A32] group-hover:scale-110 transition-transform" />
              <span>{t('finalCta.browseMarketplace')}</span>
              <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
