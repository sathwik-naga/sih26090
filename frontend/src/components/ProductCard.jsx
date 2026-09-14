import React from 'react';
import { useApp } from '../context/AppContext';
import { Badge } from './Badge';
import { MapPin, Eye, MessageSquare, ArrowUpRight } from 'lucide-react';

export function ProductCard({ product, onQuickEnquire }) {
  const { navigateTo, currentRole } = useApp();

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-[#EFE7DB] shadow-sm hover:shadow-craft-hover transition-all duration-200 flex flex-col group">
      {/* Image container */}
      <div className="relative aspect-[4/3] bg-stone-100 overflow-hidden cursor-pointer" onClick={() => navigateTo('product-detail', product.id)}>
        <img
          src={product.images && product.images[0] ? product.images[0] : '/crafts/fish-wooden-coasters.jpg'}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex justify-between items-center pointer-events-none">
          {product.giTag ? (
            <Badge type="gi" text="GI Provenance" />
          ) : (
            <span className="bg-white/90 backdrop-blur-sm text-stone-700 text-xs px-2.5 py-0.5 rounded-full font-medium shadow-xs">
              Handcrafted
            </span>
          )}
          <Badge type="stock" text={product.stockStatus || 'In Stock'} />
        </div>

        {/* Category tag */}
        <div className="absolute bottom-3 left-3">
          <span className="bg-[#1A1817]/75 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-md">
            {product.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Artisan & Region */}
          <div className="flex items-center gap-2 text-xs text-stone-500 mb-2">
            <span className="font-semibold text-stone-800 truncate max-w-[140px]">
              {product.artisanName}
            </span>
            <span>•</span>
            <span className="flex items-center gap-0.5 truncate">
              <MapPin className="w-3 h-3 text-[#C85A32] shrink-0" />
              {product.artisanState || 'India'}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            className="font-serif font-bold text-stone-900 text-base sm:text-lg leading-snug line-clamp-2 hover:text-[#C85A32] cursor-pointer transition-colors"
            onClick={() => navigateTo('product-detail', product.id)}
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-stone-500 mt-2 line-clamp-2 leading-relaxed">
            {product.story || 'Authentic traditional handmade craft preserving generational indigenous craftsmanship.'}
          </p>
        </div>

        {/* Pricing & Footer Actions */}
        <div className="mt-4 pt-3 border-t border-stone-100">
          <div className="flex items-baseline justify-between mb-3">
            <div>
              <span className="text-xs text-stone-400 block font-medium">Direct Retail</span>
              <span className="text-lg sm:text-xl font-bold text-stone-900 font-sans">
                ₹{Number(product.price).toLocaleString('en-IN')}
              </span>
            </div>
            {product.wholesalePrice && (
              <div className="text-right">
                <span className="text-[11px] text-amber-700 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded font-medium block">
                  Wholesale ₹{Number(product.wholesalePrice).toLocaleString('en-IN')}
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">MOQ: {product.moq || 5} units</span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => navigateTo('product-detail', product.id)}
              className="px-3 py-2 text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              View Story
              <ArrowUpRight className="w-3.5 h-3.5 text-stone-500" />
            </button>
            
            <button
              onClick={() => {
                if (onQuickEnquire) {
                  onQuickEnquire(product);
                } else {
                  navigateTo('enquiry', product.id);
                }
              }}
              className="px-3 py-2 text-xs font-semibold text-white bg-[#C85A32] hover:bg-[#A33D1C] rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              Enquire
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
