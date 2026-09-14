import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useLanguage } from '../i18n/LanguageContext';
import { StatCard } from '../components/StatCard';
import { Badge } from '../components/Badge';
import { SCHEMES_AND_NOTICES } from '../data/mockData';
import { 
  PackagePlus, 
  Boxes, 
  ShoppingBag, 
  MessageSquare, 
  Eye, 
  TrendingUp, 
  MapPin, 
  Phone, 
  Mail, 
  Award, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight, 
  Share2, 
  Sparkles, 
  Lightbulb,
  Building,
  Check,
  Calendar
} from 'lucide-react';

export function DashboardPage() {
  const { artisan, products, inquiries, navigateTo, updateInquiryStatus, showToast } = useApp();
  const { t } = useLanguage();
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [statusChoice, setStatusChoice] = useState('In Discussion');

  // Filter artisan's products
  const artisanProducts = products.filter(p => p.artisanId === artisan.id || p.artisanName === artisan.name);
  const totalViews = artisanProducts.reduce((sum, p) => sum + (p.views || 0), 0);
  const newInquiries = inquiries.filter(i => i.status === 'New');

  // Calculate estimated order pipeline
  const estimatedPipeline = inquiries.reduce((sum, inq) => {
    const prod = products.find(p => p.id === inq.productId);
    const unitPrice = prod ? (prod.wholesalePrice || prod.price) : 2500;
    return sum + (unitPrice * (inq.quantity || 1));
  }, 0);

  const handleUpdateInquiry = (e) => {
    e.preventDefault();
    if (!selectedInquiry) return;
    updateInquiryStatus(selectedInquiry.id, statusChoice, replyText);
    setSelectedInquiry(null);
    setReplyText('');
  };

  const copyShareLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Digital Catalog link copied to clipboard!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Artisan Profile Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EFE7DB] shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-[#FAF0E6] via-transparent to-transparent rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Avatar & Artisan Details */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={artisan.avatar}
                alt={artisan.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-[#C85A32]/20 shadow-md"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-xs" title="Verified Artisan">
                <CheckCircle2 className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                  {artisan.name}
                </h1>
                <Badge type="gi" text="GI Tag Practitioner" />
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full font-medium">
                  State Master Craftsman
                </span>
              </div>

              <p className="text-sm font-medium text-stone-600">
                {artisan.title} • <span className="text-[#C85A32] font-semibold">{artisan.experienceYears} Years Generational Legacy</span>
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-stone-500 pt-1">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                  {artisan.village}, {artisan.district}, {artisan.state}
                </span>
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-stone-400" />
                  {artisan.phone}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Primary Actions */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => navigateTo('add-product')}
              className="flex-1 md:flex-none px-5 py-3 rounded-2xl bg-[#C85A32] hover:bg-[#A33D1C] text-white font-semibold text-xs sm:text-sm shadow-sm transition-all flex items-center justify-center gap-2"
            >
              <PackagePlus className="w-4 h-4" />
              <span>{t('dashboard.addNewCraft')}</span>
            </button>
            <button
              onClick={() => navigateTo('my-products')}
              className="flex-1 md:flex-none px-4 py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Boxes className="w-4 h-4" />
              <span>{t('nav.myProducts')}</span>
            </button>
            <button
              onClick={() => navigateTo('marketplace')}
              className="flex-1 md:flex-none px-4 py-3 rounded-2xl border border-stone-200 hover:bg-stone-50 text-stone-700 font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4 text-stone-500" />
              <span>{t('dashboard.viewPublicCatalog')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          label={t('dashboard.activeListings')}
          value={artisanProducts.length}
          subtext="Published & visible to buyers"
          icon={Boxes}
          iconBg="bg-[#FAF0E6]"
          iconColor="text-[#C85A32]"
        />
        <StatCard
          label={t('dashboard.pendingInquiries')}
          value={inquiries.length}
          subtext={`${newInquiries.length} pending response`}
          icon={MessageSquare}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          label="Estimated Order Pipeline"
          value={`₹${(estimatedPipeline / 1000).toFixed(1)}k`}
          subtext="From active buyer requests"
          icon={TrendingUp}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-700"
        />
        <StatCard
          label={t('dashboard.totalViews')}
          value={totalViews}
          subtext="Total buyer store visits"
          icon={Eye}
          iconBg="bg-amber-50"
          iconColor="text-amber-700"
        />
      </div>

      {/* Main Grid: Inquiries & Schemes/Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (8 cols): Recent Buyer Inquiries */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7DB] shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-serif text-xl font-bold text-stone-900">Direct Buyer Inquiries</h2>
                <p className="text-xs text-stone-500 mt-0.5">Wholesale and custom craft orders awaiting your confirmation</p>
              </div>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#FAF0E6] text-[#C85A32]">
                {inquiries.length} Inquiries Total
              </span>
            </div>

            {/* Inquiries List */}
            {inquiries.length === 0 ? (
              <div className="text-center py-12 text-stone-400">
                <MessageSquare className="w-10 h-10 mx-auto mb-2 opacity-50" />
                <p className="text-sm font-medium">No buyer inquiries yet.</p>
                <p className="text-xs mt-1">Once buyers browse your catalog, their order requests will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {inquiries.map((inq) => {
                  const isNew = inq.status === 'New';
                  return (
                    <div 
                      key={inq.id}
                      className={`p-4 sm:p-5 rounded-2xl border transition-all ${
                        isNew 
                          ? 'bg-[#FCF9F5] border-[#EACBB8] shadow-xs' 
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-stone-900 text-sm sm:text-base">
                              {inq.buyerName}
                            </h4>
                            {inq.buyerOrg && (
                              <span className="text-xs text-stone-500 flex items-center gap-1">
                                • <Building className="w-3 h-3 text-stone-400" /> {inq.buyerOrg}
                              </span>
                            )}
                            <span className={`text-[11px] px-2.5 py-0.5 rounded-full font-semibold ${
                              inq.status === 'New' 
                                ? 'bg-red-100 text-red-800' 
                                : inq.status === 'In Discussion'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-emerald-100 text-emerald-800'
                            }`}>
                              {inq.status}
                            </span>
                          </div>
                          <p className="text-xs font-semibold text-[#C85A32] mt-1">
                            Interested in: {inq.productName}
                          </p>
                        </div>

                        <div className="text-left sm:text-right">
                          <span className="text-xs font-bold text-stone-800 bg-stone-100 px-2.5 py-1 rounded-lg">
                            Qty: {inq.quantity} units ({inq.orderType})
                          </span>
                          <span className="text-[11px] text-stone-400 block mt-1">
                            Received {inq.date}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-stone-600 bg-white p-3 rounded-xl border border-stone-100 italic leading-relaxed mb-3">
                        "{inq.message || 'Customer requested standard wholesale catalog pricing and sample delivery timelines.'}"
                      </p>

                      {inq.artisanReply && (
                        <div className="text-xs bg-emerald-50 text-emerald-900 p-2.5 rounded-xl border border-emerald-200 mb-3">
                          <span className="font-bold">Your Response:</span> {inq.artisanReply}
                        </div>
                      )}

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs">
                        <div className="flex items-center gap-3 text-stone-500">
                          {inq.buyerPhone && (
                            <a
                              href={`tel:${inq.buyerPhone}`}
                              className="flex items-center gap-1 font-semibold text-[#C85A32] hover:underline"
                            >
                              <Phone className="w-3.5 h-3.5" /> Call Buyer ({inq.buyerPhone})
                            </a>
                          )}
                          {inq.buyerEmail && (
                            <span className="hidden sm:flex items-center gap-1">
                              <Mail className="w-3.5 h-3.5" /> {inq.buyerEmail}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            setSelectedInquiry(inq);
                            setStatusChoice(inq.status);
                            setReplyText(inq.artisanReply || '');
                          }}
                          className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold transition-colors flex items-center gap-1"
                        >
                          Update Status & Note
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (4 cols): Schemes & Master Craft Tips */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* ODOP & Government Schemes */}
          <div className="bg-white rounded-3xl p-6 border border-[#EFE7DB] shadow-sm space-y-4">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#C85A32]" />
              <h3 className="font-serif font-bold text-stone-900 text-base">
                Cluster Schemes & Grants
              </h3>
            </div>
            <p className="text-xs text-stone-500">
              Government subsidies for registered Bastar artisan cooperatives.
            </p>

            <div className="space-y-3">
              {SCHEMES_AND_NOTICES.map((item) => (
                <div key={item.id} className="p-3.5 rounded-2xl bg-[#FAF6F0] border border-[#EFE7DB] text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded uppercase">
                      {item.tag}
                    </span>
                    <span className="text-stone-400 text-[10px] font-semibold">{item.date}</span>
                  </div>
                  <h5 className="font-bold text-stone-800 text-xs mt-1">{item.title}</h5>
                  <p className="text-stone-500 leading-normal">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Artisan Digital Growth Tips */}
          <div className="bg-[#FAF0E6] rounded-3xl p-6 border border-[#EACBB8] space-y-3">
            <div className="flex items-center gap-2 text-[#C85A32]">
              <Lightbulb className="w-5 h-5" />
              <h4 className="font-serif font-bold text-base text-stone-900">Digital Catalog Tip</h4>
            </div>
            <p className="text-xs text-stone-700 leading-relaxed">
              Export and boutique buyers look for the <strong>origin story</strong> and <strong>tribal technique</strong>. When adding products, describe the lost-wax casting and natural materials—it builds emotional trust and earns 40% higher pricing!
            </p>
            <button
              onClick={() => navigateTo('add-product')}
              className="w-full py-2.5 rounded-xl bg-white hover:bg-stone-50 text-[#C85A32] font-semibold text-xs border border-[#EACBB8] transition-colors"
            >
              Add Another Craft Piece
            </button>
          </div>

        </div>
      </div>

      {/* Inquiry Response / Status Update Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 border border-stone-200 shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-lg text-stone-900">
              Update Inquiry from {selectedInquiry.buyerName}
            </h3>
            <p className="text-xs text-stone-500">
              {selectedInquiry.productName} • Qty: {selectedInquiry.quantity}
            </p>

            <form onSubmit={handleUpdateInquiry} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Inquiry Status</label>
                <select
                  value={statusChoice}
                  onChange={(e) => setStatusChoice(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                >
                  <option value="New">New / Unaddressed</option>
                  <option value="In Discussion">In Discussion / Rate Quoted</option>
                  <option value="Confirmed">Confirmed / In Production</option>
                  <option value="Completed">Fulfilled / Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Response / Negotiation Note</label>
                <textarea
                  rows="3"
                  placeholder="e.g. Quoted wholesale price of ₹2,600 with custom packaging. Production will take 14 days."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full px-3 py-2 text-sm bg-stone-50 border border-stone-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#C85A32]"
                ></textarea>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="px-4 py-2 text-xs font-medium text-stone-600 hover:text-stone-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#C85A32] hover:bg-[#A33D1C] text-white text-xs font-semibold rounded-xl transition-colors"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
