import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { X, Send, CheckCircle2, Building, User, Phone, Mail, Package } from 'lucide-react';

export function InquiryModal({ product, isOpen, onClose }) {
  const { addInquiry } = useApp();
  const [formData, setFormData] = useState({
    buyerName: '',
    buyerOrg: '',
    buyerType: 'Retail Boutique',
    buyerPhone: '',
    buyerEmail: '',
    quantity: product?.moq || 10,
    orderType: 'Wholesale Order',
    targetDate: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !product) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.buyerName || !formData.buyerPhone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    addInquiry({
      productId: product.id,
      ...formData,
      quantity: Number(formData.quantity),
    });

    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setFormData({
      buyerName: '',
      buyerOrg: '',
      buyerType: 'Retail Boutique',
      buyerPhone: '',
      buyerEmail: '',
      quantity: product?.moq || 10,
      orderType: 'Wholesale Order',
      targetDate: '',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-stone-200 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF6F0] border-b border-[#EFE7DB] flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider text-[#C85A32] uppercase">Direct Buyer Connect</span>
            <h3 className="font-serif font-bold text-stone-900 text-lg">
              Enquire with {product.artisanName}
            </h3>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 text-stone-400 hover:text-stone-700 rounded-full hover:bg-stone-200/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto">
          {submitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="font-serif font-bold text-2xl text-stone-900 mb-2">Enquiry Transmitted!</h4>
              <p className="text-sm text-stone-600 max-w-md mx-auto leading-relaxed mb-6">
                Your direct craft inquiry for <span className="font-semibold text-stone-800">"{product.name}"</span> has been logged on <span className="font-semibold text-[#C85A32]">{product.artisanName}'s</span> dashboard.
              </p>
              <div className="bg-[#FAF6F0] p-4 rounded-xl text-xs text-stone-600 text-left border border-[#EFE7DB] mb-6">
                <p className="font-semibold text-stone-800 mb-1">Direct Artisan Contact:</p>
                <p>Phone: +91 94255 83120 (WhatsApp)</p>
                <p>Location: {product.villageCluster || 'Bastar Artisan Cluster, India'}</p>
              </div>
              <button
                onClick={handleClose}
                className="w-full py-3 bg-[#C85A32] hover:bg-[#A33D1C] text-white rounded-xl font-semibold text-sm transition-colors"
              >
                Close & Continue Exploring
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Product snippet */}
              <div className="flex items-center gap-3 p-3 rounded-xl bg-stone-50 border border-stone-200">
                <img
                  src={product.images && product.images[0] ? product.images[0] : ''}
                  alt={product.name}
                  className="w-14 h-14 object-cover rounded-lg shrink-0"
                />
                <div className="min-w-0">
                  <h5 className="font-serif font-bold text-sm text-stone-900 truncate">{product.name}</h5>
                  <p className="text-xs text-stone-500">Retail: ₹{product.price} • Wholesale: ₹{product.wholesalePrice} (MOQ: {product.moq})</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name *</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rahul Mehta"
                      value={formData.buyerName}
                      onChange={(e) => setFormData({ ...formData, buyerName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Business / Brand Name</label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="e.g. Sanskriti Living"
                      value={formData.buyerOrg}
                      onChange={(e) => setFormData({ ...formData, buyerOrg: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp / Phone *</label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.buyerPhone}
                      onChange={(e) => setFormData({ ...formData, buyerPhone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      placeholder="buyer@domain.com"
                      value={formData.buyerEmail}
                      onChange={(e) => setFormData({ ...formData, buyerEmail: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Required Quantity</label>
                  <div className="relative">
                    <Package className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                    <input
                      type="number"
                      min="1"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Inquiry Purpose</label>
                  <select
                    value={formData.orderType}
                    onChange={(e) => setFormData({ ...formData, orderType: e.target.value })}
                    className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                  >
                    <option>Wholesale Order</option>
                    <option>Corporate Gifting</option>
                    <option>Sample Unit Request</option>
                    <option>Custom Modification</option>
                    <option>Export Inquiry</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Message / Customization Details</label>
                <textarea
                  rows="3"
                  placeholder="Mention target delivery date, branding/custom size requirements, or packaging needs..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32] focus:bg-white"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-[#C85A32] hover:bg-[#A33D1C] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send Inquiry Directly
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
