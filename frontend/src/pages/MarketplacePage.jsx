import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { ProductCard } from '../components/ProductCard';
import { InquiryModal } from '../components/InquiryModal';
import { CRAFT_CATEGORIES, INDIAN_STATES } from '../data/mockData';
import { 
  Search, 
  Filter, 
  Sparkles, 
  SlidersHorizontal, 
  Compass, 
  ArrowUpDown, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

export function MarketplacePage() {
  const { products, navigateTo } = useApp();
  const { t } = useLanguage();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [selectedState, setSelectedState] = useState('All Regions');
  const [sortBy, setSortBy] = useState('featured'); // 'featured' | 'price-low' | 'price-high' | 'views'
  const [onlyGiTagged, setOnlyGiTagged] = useState(false);
  const [onlyInStock, setOnlyInStock] = useState(false);

  // Quick inquiry modal state
  const [modalProduct, setModalProduct] = useState(null);

  // Filter logic
  let filtered = products.filter((p) => {
    const matchesSearch = 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.artisanName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.artisanState && p.artisanState.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (p.materials && p.materials.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All Crafts' || p.category === selectedCategory;
    const matchesState = selectedState === 'All Regions' || (p.artisanState && p.artisanState.includes(selectedState));
    const matchesGi = !onlyGiTagged || p.giTag;
    const matchesStock = !onlyInStock || p.stockStatus === 'In Stock';

    return matchesSearch && matchesCategory && matchesState && matchesGi && matchesStock;
  });

  // Sort logic
  if (sortBy === 'price-low') {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-high') {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  } else if (sortBy === 'views') {
    filtered = [...filtered].sort((a, b) => (b.views || 0) - (a.views || 0));
  }

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Crafts');
    setSelectedState('All Regions');
    setOnlyGiTagged(false);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Marketplace Hero & Search */}
      <div className="bg-[#FAF0E6] rounded-3xl p-6 sm:p-10 border border-[#EACBB8] relative overflow-hidden">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF0E6] text-[#C85A32] text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" /> {t('hero.authenticHeritage')}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
            {t('marketplace.title')}
          </h1>
          <p className="text-sm text-stone-500 mt-2 max-w-2xl">
            {t('marketplace.subtitle')}
          </p>
        </div>

        {/* Global Search Bar */}
        <div className="mt-6 max-w-3xl">
          <div className="relative flex items-center">
            <Search className="w-5 h-5 text-stone-400 absolute left-4" />
            <input
              type="text"
              placeholder={t('marketplace.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-white border border-[#EFE7DB] rounded-2xl text-sm text-stone-900 placeholder:text-stone-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 text-xs font-semibold text-stone-400 hover:text-stone-700"
              >
                Clear
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Category Pills Slider */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CRAFT_CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white text-stone-600 border border-[#EFE7DB] hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Filter and Sorting Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-[#EFE7DB] shadow-xs flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Region & Quick Checkboxes */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* State Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 font-medium">Cluster:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-medium focus:outline-none focus:ring-1 focus:ring-[#C85A32]"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* GI Tagged only */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <input
              type="checkbox"
              checked={onlyGiTagged}
              onChange={(e) => setOnlyGiTagged(e.target.checked)}
              className="w-3.5 h-3.5 text-[#C85A32] rounded"
            />
            <span className="font-semibold text-stone-700">GI Tagged Only</span>
          </label>

          {/* In Stock only */}
          <label className="flex items-center gap-1.5 cursor-pointer select-none bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="w-3.5 h-3.5 text-[#C85A32] rounded"
            />
            <span className="font-semibold text-stone-700">Ready in Stock</span>
          </label>
        </div>

        {/* Right: Sort & Reset */}
        <div className="flex items-center gap-3 text-xs ml-auto">
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 font-medium">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-1.5 bg-stone-50 border border-stone-200 rounded-xl text-stone-800 font-semibold focus:outline-none"
            >
              <option value="featured">Featured Collections</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="views">Most Popular</option>
            </select>
          </div>

          {(searchTerm || selectedCategory !== 'All Crafts' || selectedState !== 'All Regions' || onlyGiTagged || onlyInStock) && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1 text-stone-500 hover:text-stone-800 font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <span>Showing <strong>{filtered.length}</strong> handcrafted items</span>
        <span className="flex items-center gap-1 text-[#C85A32] font-semibold">
          <ShieldCheck className="w-4 h-4" /> 100% Direct Artisan Sourced
        </span>
      </div>

      {/* Product Cards Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE7DB] shadow-sm max-w-md mx-auto space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto">
            <Compass className="w-6 h-6" />
          </div>
          <h3 className="font-serif font-bold text-stone-900 text-lg">No crafts match your criteria</h3>
          <p className="text-xs text-stone-500">
            Try loosening your filters or resetting to view all available regional handicrafts.
          </p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 bg-[#C85A32] text-white text-xs font-semibold rounded-xl"
          >
            Show All Crafts
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickEnquire={(prod) => setModalProduct(prod)}
            />
          ))}
        </div>
      )}

      {/* Quick Inquiry Modal */}
      <InquiryModal
        product={modalProduct}
        isOpen={!!modalProduct}
        onClose={() => setModalProduct(null)}
      />

    </div>
  );
}
