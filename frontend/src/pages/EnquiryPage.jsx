import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { Badge } from '../components/Badge';
import { 
  ArrowLeft, 
  Send, 
  CheckCircle2, 
  Building, 
  User, 
  Phone, 
  Mail, 
  Package, 
  Calendar, 
  ShieldCheck,
  Sparkles
} from 'lucide-react';

export function EnquiryPage() {
  const { products, selectedProductId, addInquiry, navigateTo } = useApp();
  const { t, tp, tc, ts } = useLanguage();

  const rawProduct = products.find(p => p.id === selectedProductId) || products[0];
  const product = rawProduct ? tp(rawProduct) : null;

  const [formData, setFormData] = useState({
    buyerName: '',
    buyerOrg: '',
    buyerType: 'Retail Boutique',
    buyerPhone: '',
    buyerEmail: '',
    quantity: rawProduct?.moq || 10,
    orderType: 'Wholesale Order',
    targetDate: '2026-10-30',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [createdInquiryId, setCreatedInquiryId] = useState(null);

  if (!product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.buyerPhone) {
      alert(t('enquiry.validationNamePhone'));
      return;
    }

    const newInq = addInquiry({
      productId: rawProduct.id,
      ...formData,
      quantity: Number(formData.quantity),
    });

    setCreatedInquiryId(newInq.id);
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Top Breadcrumb */}
      <div>
        <button
          onClick={() => navigateTo('product-detail', rawProduct.id)}
          className="text-xs font-semibold text-stone-500 hover:text-stone-800 flex items-center gap-1 mb-2 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {t('enquiry.backToProduct')}
        </button>
        <div className="flex items-center gap-2">
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
            {t('enquiry.title')}
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-stone-500 mt-1">
          {t('enquiry.subtitle')}
        </p>
      </div>

      {submitted ? (
        /* Submission Success State */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#EFE7DB] shadow-md text-center space-y-6 animate-in zoom-in-95 duration-200">
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-12 h-12" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-200">
              {t('enquiry.transmissionVerified')}
            </span>
            <h2 className="font-serif text-3xl font-bold text-stone-900">
              {t('enquiry.enquiryLogged')}
            </h2>
            <p className="text-sm text-stone-600 leading-relaxed">
              {t('enquiry.enquiryLoggedDesc')}
            </p>
          </div>

          {/* Artisan Direct Contact Card */}
          <div className="bg-[#FAF6F0] p-6 rounded-2xl border border-[#EFE7DB] text-left max-w-md mx-auto space-y-3 text-xs">
            <div className="flex items-center gap-3 border-b border-[#EFE7DB] pb-3">
              <img
                src={product.artisanAvatar || '/crafts/fish-wooden-coasters.jpg'}
                alt={product.artisanName}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="font-serif font-bold text-sm text-stone-900">{product.artisanName}</h4>
                <p className="text-stone-500">{ts(rawProduct.villageCluster || rawProduct.artisanState)}, India</p>
              </div>
            </div>

            <div className="space-y-1.5 text-stone-600">
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C85A32]" />
                <span>{t('enquiry.phoneWhatsapp')}: <strong>+91 94255 83120</strong></span>
              </p>
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>{t('productDetail.verifiedMaster')}</span>
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4 max-w-md mx-auto">
            <button
              onClick={() => navigateTo('marketplace')}
              className="w-full sm:w-auto px-6 py-3 bg-[#C85A32] hover:bg-[#A33D1C] text-white text-xs font-bold rounded-2xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{t('enquiry.returnToMarketplace')}</span>
              <ArrowLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('dashboard')}
              className="w-full sm:w-auto px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold rounded-2xl transition-colors cursor-pointer"
            >
              {t('enquiry.viewDashboard')}
            </button>
          </div>
        </div>
      ) : (
        /* The Inquiry Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Product Summary Card (4 cols) */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-5 border border-[#EFE7DB] shadow-sm space-y-4">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">{t('productDetail.craftSpecs')}</span>
            
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-stone-100">
              <img
                src={product.images && product.images[0] ? product.images[0] : ''}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-2 left-2">
                {rawProduct.giTag && <Badge type="gi" text={t('productDetail.giCertified')} />}
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-bold text-stone-900 text-base leading-snug">{product.name}</h3>
              <p className="text-xs text-stone-500">{t('productDetail.directMakerContact')}: <strong>{product.artisanName}</strong> ({ts(rawProduct.artisanState)})</p>

              <div className="pt-2 border-t border-stone-100 space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-stone-400">{t('productDetail.directRetail')}:</span>
                  <span className="font-bold text-stone-800 font-sans">₹{product.price}</span>
                </div>
                {product.wholesalePrice && (
                  <div className="flex justify-between text-amber-800 font-semibold">
                    <span>{t('productDetail.wholesaleRate')}:</span>
                    <span>₹{product.wholesalePrice} / unit</span>
                  </div>
                )}
                <div className="flex justify-between text-stone-500">
                  <span>{t('productDetail.moqLabel')}:</span>
                  <span>{product.moq || 5} {t('productCard.moqUnits')}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>{t('productDetail.leadTime')}:</span>
                  <span>{product.leadTime || '10-14 days'}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-[#FAF0E6] rounded-xl text-[11px] text-stone-600 flex items-start gap-2 border border-[#EACBB8]">
              <Sparkles className="w-3.5 h-3.5 text-[#C85A32] shrink-0 mt-0.5" />
              <p>{t('productDetail.careGuide')}</p>
            </div>
          </div>

          {/* Right Column: Inquiry Form (8 cols) */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7DB] shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">{t('enquiry.fullName')}</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder={t('enquiry.fullNamePlaceholder')}
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">{t('enquiry.orgName')}</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder={t('enquiry.orgPlaceholder')}
                      value={formData.buyerOrg}
                      onChange={(e) => setFormData({ ...formData, buyerOrg: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">{t('enquiry.phone')}</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder={t('enquiry.phonePlaceholder')}
                      value={formData.buyerPhone}
                      onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">{t('enquiry.email')}</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder={t('enquiry.emailPlaceholder')}
                      value={formData.buyerEmail}
                      onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">{t('enquiry.orderType')}</label>
                  <select
                    value={formData.orderType}
                    onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                    className="w-full px-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                  >
                    <option value="Wholesale Order">{t('enquiry.orderTypeWholesale')}</option>
                    <option value="Corporate Gifting">{t('enquiry.typeCorporate')}</option>
                    <option value="Custom Modification">{t('enquiry.orderTypeBespoke')}</option>
                    <option value="Sample Unit">{t('enquiry.orderTypeSample')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">{t('enquiry.quantity')}</label>
                  <div className="relative">
                    <Package className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white font-semibold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">{t('enquiry.targetDate')}</label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                      className="w-full pl-9 pr-3 py-2.5 text-xs sm:text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {t('enquiry.message')}
                </label>
                <textarea
                  rows="4"
                  placeholder={t('enquiry.messagePlaceholder')}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-stone-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  {t('marketplace.directGuarantee')}
                </span>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#C85A32] hover:bg-[#A33D1C] text-white font-semibold text-xs sm:text-sm rounded-2xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  {t('enquiry.submitBtn')}
                </button>
              </div>

            </form>
          </div>

        </div>
      )}

    </div>
  );
}
