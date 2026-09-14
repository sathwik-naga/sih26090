import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/Badge';
import { InquiryModal } from '../components/InquiryModal';
import { 
  ArrowLeft, 
  MapPin, 
  Award, 
  MessageSquare, 
  Phone, 
  Share2, 
  ShieldCheck, 
  Clock, 
  Package, 
  Sparkles, 
  HeartHandshake, 
  CheckCircle2,
  Layers,
  ChevronRight,
  Info
} from 'lucide-react';

export function ProductDetailPage() {
  const { products, selectedProductId, navigateTo, showToast } = useApp();
  
  // Get product or fallback to first
  const product = products.find(p => p.id === selectedProductId) || products[0];
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto py-16 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Craft Product Not Found</h2>
        <button
          onClick={() => navigateTo('marketplace')}
          className="px-4 py-2 bg-[#C85A32] text-white rounded-xl text-xs font-semibold"
        >
          Return to Marketplace
        </button>
      </div>
    );
  }

  const images = product.images && product.images.length > 0 
    ? product.images 
    : ['/crafts/fish-wooden-coasters.jpg'];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Product link copied to clipboard!');
  };

  // Other products from same category or region
  const relatedProducts = products
    .filter(p => p.id !== product.id && (p.category === product.category || p.artisanState === product.artisanState))
    .slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Breadcrumbs & Share */}
      <div className="flex items-center justify-between text-xs text-stone-500">
        <div className="flex items-center gap-1.5 flex-wrap">
          <button onClick={() => navigateTo('marketplace')} className="hover:text-stone-900 transition-colors">
            Marketplace
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-700">{product.category}</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="font-semibold text-stone-900 truncate max-w-xs">{product.name}</span>
        </div>

        <button
          onClick={handleShare}
          className="flex items-center gap-1 text-stone-600 hover:text-stone-900 bg-white px-3 py-1.5 rounded-xl border border-stone-200 transition-colors"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>Share Piece</span>
        </button>
      </div>

      {/* Main Top Grid: Gallery (6 cols) + Primary Details & Enquire CTA (6 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        
        {/* Image Gallery Column */}
        <div className="lg:col-span-6 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-stone-100 border border-[#EFE7DB] shadow-md">
            <img
              src={images[selectedImageIndex] || images[0]}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            {/* Overlay badges */}
            <div className="absolute top-4 left-4 right-4 flex justify-between items-center pointer-events-none">
              {product.giTag ? (
                <Badge type="gi" text="GI Provenance Certified" />
              ) : (
                <span className="bg-white/95 text-stone-800 text-xs px-3 py-1 rounded-full font-semibold shadow-xs">
                  Authentic Handcraft
                </span>
              )}
              <Badge type="stock" text={product.stockStatus} />
            </div>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-xs text-white text-xs px-3 py-1 rounded-lg">
              Cluster: {product.villageCluster || product.artisanState}
            </div>
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImageIndex === idx ? 'border-[#C85A32] ring-2 ring-[#C85A32]/20 scale-95' : 'border-stone-200 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Direct Craft Cluster Guarantee Banner */}
          <div className="p-4 rounded-2xl bg-[#FAF0E6] border border-[#EACBB8] flex items-center gap-3 text-xs text-stone-700">
            <ShieldCheck className="w-5 h-5 text-[#C85A32] shrink-0" />
            <div>
              <p className="font-bold text-stone-900">Direct Sourcing Guarantee</p>
              <p className="text-stone-500">Every rupee paid for this artifact goes directly to the traditional artisan family with zero commission cuts.</p>
            </div>
          </div>
        </div>

        {/* Product Details & Action CTA Column */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Category & Region */}
          <div className="flex items-center gap-2 text-xs text-stone-500">
            <span className="px-2.5 py-0.5 rounded-md bg-stone-100 text-stone-700 font-semibold uppercase tracking-wider text-[10px]">
              {product.category}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1 text-stone-600 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
              {product.villageCluster || product.artisanState}, India
            </span>
          </div>

          {/* Product Title */}
          <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-stone-900 leading-tight">
            {product.name}
          </h1>

          {/* Pricing Box */}
          <div className="p-5 rounded-2xl bg-white border border-[#EFE7DB] shadow-xs space-y-3">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div>
                <span className="text-xs text-stone-400 block font-medium">Direct Retail Price</span>
                <span className="text-2xl sm:text-3xl font-bold text-stone-900 font-sans">
                  ₹{Number(product.price).toLocaleString('en-IN')}
                </span>
                <span className="text-xs text-stone-400 block mt-0.5">Taxes & standard packing included</span>
              </div>

              {product.wholesalePrice && (
                <div className="p-3 bg-amber-50/80 rounded-xl border border-amber-200/70 text-right">
                  <span className="text-[11px] font-bold text-amber-900 block uppercase tracking-wider">
                    Wholesale / B2B Rate
                  </span>
                  <span className="text-xl font-bold text-amber-950 font-sans">
                    ₹{Number(product.wholesalePrice).toLocaleString('en-IN')} <span className="text-xs font-normal text-amber-800">/ unit</span>
                  </span>
                  <span className="text-[11px] text-amber-800 block mt-0.5">
                    MOQ: {product.moq || 5} units • Lead: {product.leadTime || '12 days'}
                  </span>
                </div>
              )}
            </div>

            {/* Inquire Buttons */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                onClick={() => navigateTo('enquiry', product.id)}
                className="py-3.5 px-4 bg-[#C85A32] hover:bg-[#A33D1C] text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Send Buyer Enquiry</span>
              </button>

              <button
                onClick={() => setShowInquiryModal(true)}
                className="py-3.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2"
              >
                <Package className="w-4 h-4" />
                <span>Quick Bulk Quote</span>
              </button>
            </div>
          </div>

          {/* Artisan Profile Card */}
          <div className="p-5 rounded-2xl bg-white border border-[#EFE7DB] shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <img
                src={product.artisanAvatar || '/crafts/fish-wooden-coasters.jpg'}
                alt={product.artisanName}
                className="w-14 h-14 rounded-2xl object-cover border-2 border-[#C85A32]/20"
              />
              <div>
                <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider block">Crafted By</span>
                <h4 className="font-serif font-bold text-stone-900 text-base">{product.artisanName}</h4>
                <p className="text-xs text-stone-500">{product.artisanState} Craft Cluster</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-semibold bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200 inline-flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Master
              </span>
            </div>
          </div>

          {/* Quick Specifications Snapshot */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-400 block font-medium">Dimensions</span>
              <span className="font-bold text-stone-800 mt-0.5 block">{product.dimensions || 'Standard Traditional Size'}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-400 block font-medium">Approx Weight</span>
              <span className="font-bold text-stone-800 mt-0.5 block">{product.weight || '1.5 kg'}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-400 block font-medium">Raw Materials</span>
              <span className="font-bold text-stone-800 mt-0.5 block truncate">{product.materials || 'Authentic Natural Materials'}</span>
            </div>
            <div className="p-3 rounded-xl bg-stone-50 border border-stone-200">
              <span className="text-stone-400 block font-medium">Craft Lead Time</span>
              <span className="font-bold text-stone-800 mt-0.5 block">{product.leadTime || '10-14 Days'}</span>
            </div>
          </div>

        </div>

      </div>

      {/* Deep Story & Craft Provenance Section */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-[#EFE7DB] shadow-sm space-y-8">
        <div>
          <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider">Provenance & Heritage</span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            The Story Behind This Artifact
          </h2>
          <p className="text-sm text-stone-600 mt-3 leading-relaxed max-w-4xl">
            {product.story || 'Every line, motif, and hue in this piece carries generational memory and cultural reverence. Crafted entirely by hand without assembly line machines, no two finished pieces are identical.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 border-t border-stone-100">
          <div>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1.5 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#C85A32]" /> Raw Material Provenance
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {product.materials || 'Handpicked alluvial clay and natural mineral pigments sourced directly from regional riverbeds.'}
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-[#C85A32]" /> Production Process
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              Takes approximately {product.leadTime || '10-14 days'} of meticulous manual labor, including drying, hand-shaping, firing, and organic patina polishing.
            </p>
          </div>

          <div>
            <h4 className="font-serif font-bold text-stone-900 text-sm mb-1.5 flex items-center gap-1.5">
              <Info className="w-4 h-4 text-[#C85A32]" /> Care Instructions
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed">
              {product.careInstructions || 'Dust with clean cotton cloth. Keep away from harsh abrasive chemicals to retain natural luster.'}
            </p>
          </div>
        </div>
      </div>

      {/* Related Crafts */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif font-bold text-2xl text-stone-900">More from this Craft Tradition</h3>
              <p className="text-xs text-stone-500">Explore complementary handicrafts from authentic regional clusters.</p>
            </div>
            <button
              onClick={() => navigateTo('marketplace')}
              className="text-xs font-semibold text-[#C85A32] hover:underline"
            >
              View Full Marketplace →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigateTo('product-detail', p.id)}
                className="bg-white rounded-2xl overflow-hidden border border-[#EFE7DB] p-3 shadow-xs hover:shadow-md cursor-pointer transition-all flex items-center gap-3"
              >
                <img src={p.images && p.images[0]} alt={p.name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
                <div className="min-w-0">
                  <h5 className="font-serif font-bold text-xs text-stone-900 truncate">{p.name}</h5>
                  <p className="text-[11px] text-stone-500 truncate">{p.artisanName} • {p.artisanState}</p>
                  <p className="text-xs font-bold text-[#C85A32] mt-0.5">₹{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Modal */}
      <InquiryModal
        product={product}
        isOpen={showInquiryModal}
        onClose={() => setShowInquiryModal(false)}
      />

    </div>
  );
}
