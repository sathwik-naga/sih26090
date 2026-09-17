import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Badge } from '../components/Badge';
import { CRAFT_CATEGORIES } from '../data/mockData';
import { 
  PackagePlus, 
  Boxes, 
  Search, 
  Filter, 
  QrCode, 
  Share2, 
  ExternalLink, 
  Trash2, 
  Check, 
  X, 
  Layers, 
  ArrowUpRight,
  TrendingUp,
  SlidersHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';

export function MyProductsPage() {
  const { artisan, products, deleteProduct, toggleStockStatus, navigateTo, showToast } = useApp();
  const { t, tp, tc, tstatus } = useLanguage();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Crafts');
  const [statusFilter, setStatusFilter] = useState('All');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [showQrModal, setShowQrModal] = useState(false);

  // Filter products for current artisan
  const artisanProducts = products.filter(p => p.artisanId === artisan.id || p.artisanName === artisan.name);

  const filteredProducts = artisanProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (product.materials && product.materials.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === 'All Crafts' || product.category === selectedCategory;
    const matchesStatus = statusFilter === 'All' || product.stockStatus === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleShareCatalog = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast(t('toasts.catalogCopied'));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {t('myProducts.title')}
            </h1>
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-[#FAF0E6] text-[#C85A32]">
              {artisanProducts.length} {t('myProducts.itemsListed')}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            {t('myProducts.subtitle')}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowQrModal(true)}
            className="px-3.5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <QrCode className="w-4 h-4 text-stone-600" />
            <span>{t('myProducts.catalogQr')}</span>
          </button>
          
          <button
            onClick={handleShareCatalog}
            className="px-3.5 py-2.5 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-stone-600" />
            <span>{t('myProducts.shareCatalog')}</span>
          </button>

          <button
            onClick={() => navigateTo('add-product')}
            className="px-4 py-2.5 rounded-2xl bg-[#C85A32] hover:bg-[#A33D1C] text-white text-xs font-semibold flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
          >
            <PackagePlus className="w-4 h-4" />
            <span>{t('myProducts.addNew')}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-3xl border border-[#EFE7DB] shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder={t('myProducts.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
          />
        </div>

        {/* Filters and View Mode */}
        <div className="flex flex-wrap items-center justify-between md:justify-end gap-3 w-full md:w-auto">
          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
          >
            {CRAFT_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'All Crafts' ? t('categories.all') : tc(cat)}
              </option>
            ))}
          </select>

          {/* Stock Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 text-xs bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
          >
            <option value="All">{t('myProducts.statusAll')}</option>
            <option value="In Stock">{t('myProducts.statusInStock')}</option>
            <option value="Made to Order">{t('myProducts.statusMadeToOrder')}</option>
          </select>

          {/* Grid / List View Toggle */}
          <div className="p-1 bg-stone-100 rounded-xl flex items-center">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}
              title={t('common.view')}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${viewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'text-stone-500'}`}
              title={t('common.view')}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Products Display */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-[#EFE7DB] shadow-sm max-w-lg mx-auto space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-[#FAF0E6] text-[#C85A32] flex items-center justify-center mx-auto">
            <Boxes className="w-7 h-7" />
          </div>
          <h3 className="font-serif font-bold text-lg text-stone-900">{t('myProducts.noProducts')}</h3>
          <p className="text-xs text-stone-500 max-w-sm mx-auto">
            {t('myProducts.noProductsSub')}
          </p>
          <button
            onClick={() => navigateTo('add-product')}
            className="px-5 py-2.5 rounded-xl bg-[#C85A32] text-white text-xs font-semibold cursor-pointer"
          >
            {t('nav.addNewCraftItem')}
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid Layout */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((prod) => {
            const lp = tp(prod);
            return (
              <div key={prod.id} className="bg-white rounded-3xl overflow-hidden border border-[#EFE7DB] shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                <div>
                  <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden">
                    <img
                      src={prod.images && prod.images[0] ? prod.images[0] : ''}
                      alt={lp.name || prod.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                      {prod.giTag && <Badge type="gi" text={t('productDetail.giCertified')} />}
                      <Badge type="stock" text={tstatus(prod.stockStatus)} />
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <span className="bg-[#1A1817]/75 text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
                        {tc(prod.category)}
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="font-serif font-bold text-stone-900 text-base leading-snug line-clamp-2">
                      {lp.name || prod.name}
                    </h3>
                    <p className="text-xs text-stone-500 line-clamp-2 leading-relaxed">
                      {lp.materials || lp.story || prod.materials || prod.story}
                    </p>

                    <div className="pt-3 border-t border-stone-100 flex items-baseline justify-between">
                      <div>
                        <span className="text-[10px] text-stone-400 block uppercase font-bold">{t('productCard.directRetail')}</span>
                        <span className="text-lg font-bold text-stone-900 font-sans">
                          ₹{Number(prod.price).toLocaleString('en-IN')}
                        </span>
                      </div>
                      {prod.wholesalePrice && (
                        <div className="text-right">
                          <span className="text-[11px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded font-semibold block">
                            {t('productCard.wholesale')}: ₹{Number(prod.wholesalePrice).toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] text-stone-400 block mt-0.5">{t('productCard.moq')}: {prod.moq || 5}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => toggleStockStatus(prod.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
                  >
                    {prod.stockStatus === 'In Stock' ? t('common.madeToOrder') : t('common.inStock')}
                  </button>
                  <button
                    onClick={() => navigateTo('product-detail', prod.id)}
                    className="px-3 py-2 rounded-xl text-xs font-semibold bg-[#C85A32] hover:bg-[#A33D1C] text-white flex items-center justify-center gap-1 transition-colors cursor-pointer"
                  >
                    {t('common.view')}
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Table / List Layout */
        <div className="bg-white rounded-3xl border border-[#EFE7DB] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF6F0] border-b border-[#EFE7DB] text-stone-600 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3.5 px-4">{t('myProducts.item')}</th>
                  <th className="py-3.5 px-4">{t('myProducts.category')}</th>
                  <th className="py-3.5 px-4">{t('myProducts.retailPrice')}</th>
                  <th className="py-3.5 px-4">{t('myProducts.wholesaleTerms')}</th>
                  <th className="py-3.5 px-4">{t('myProducts.availability')}</th>
                  <th className="py-3.5 px-4 text-right">{t('myProducts.actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredProducts.map((prod) => {
                  const lp = tp(prod);
                  return (
                    <tr key={prod.id} className="hover:bg-stone-50/70 transition-colors">
                      <td className="py-3.5 px-4 flex items-center gap-3">
                        <img
                          src={prod.images && prod.images[0] ? prod.images[0] : ''}
                          alt={lp.name || prod.name}
                          className="w-12 h-12 object-cover rounded-xl shrink-0"
                        />
                        <div className="min-w-0">
                          <span className="font-serif font-bold text-stone-900 block truncate max-w-xs">{lp.name || prod.name}</span>
                          <span className="text-[11px] text-stone-400">{prod.leadTime || '10 days lead'}</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 font-medium text-stone-700">{tc(prod.category)}</td>
                      <td className="py-3.5 px-4 font-bold text-stone-900 font-sans">₹{Number(prod.price).toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 text-stone-600">
                        ₹{Number(prod.wholesalePrice || prod.price).toLocaleString('en-IN')} ({t('productCard.moq')}: {prod.moq || 5})
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge type="stock" text={tstatus(prod.stockStatus)} />
                      </td>
                      <td className="py-3.5 px-4 text-right space-x-2 whitespace-nowrap">
                        <button
                          onClick={() => toggleStockStatus(prod.id)}
                          className="px-2.5 py-1 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 rounded-lg font-medium transition-colors cursor-pointer"
                        >
                          {t('myProducts.toggleStock')}
                        </button>
                        <button
                          onClick={() => navigateTo('product-detail', prod.id)}
                          className="px-2.5 py-1 text-xs bg-[#C85A32] text-white hover:bg-[#A33D1C] rounded-lg font-medium transition-colors inline-flex items-center gap-1 cursor-pointer"
                        >
                          {t('myProducts.viewPiece')}
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`${t('myProducts.deletePrompt')} "${lp.name || prod.name}"`)) {
                              deleteProduct(prod.id);
                            }
                          }}
                          className="p-1 text-stone-400 hover:text-red-600 rounded-lg transition-colors inline-block cursor-pointer"
                          title={t('common.delete')}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Shareable Catalog / QR Code Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 border border-stone-200 shadow-2xl text-center space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">{t('myProducts.qrModalTitle')}</span>
              <button onClick={() => setShowQrModal(false)} className="p-1 text-stone-400 hover:text-stone-700 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 bg-[#FAF6F0] rounded-2xl border border-[#EFE7DB] flex flex-col items-center justify-center space-y-3">
              {/* Simulated QR Code with craft styling */}
              <div className="w-44 h-44 bg-white p-3 rounded-2xl border-2 border-stone-900 shadow-inner flex flex-col items-center justify-center relative">
                <div className="grid grid-cols-6 gap-1.5 w-full h-full p-2">
                  {Array.from({ length: 36 }).map((_, i) => (
                    <div
                      key={i}
                      className={`rounded-xs ${
                        (i % 2 === 0 && i % 3 !== 0) || i === 0 || i === 5 || i === 30 || i === 35
                          ? 'bg-stone-900'
                          : i % 5 === 0
                          ? 'bg-[#C85A32]'
                          : 'bg-stone-200'
                      }`}
                    ></div>
                  ))}
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="bg-white p-1 rounded-full shadow-md">
                    <span className="text-base">🏺</span>
                  </div>
                </div>
              </div>
              <p className="font-serif font-bold text-sm text-stone-900">{artisan.name} — {t('myProducts.title')}</p>
              <p className="text-[11px] text-stone-500">{t('myProducts.qrModalDesc')}</p>
            </div>

            <button
              onClick={() => {
                handleShareCatalog();
                setShowQrModal(false);
              }}
              className="w-full py-3 bg-[#C85A32] hover:bg-[#A33D1C] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
            >
              {t('myProducts.shareCatalog')}
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
