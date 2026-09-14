import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './i18n/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';

// Pages
import { LandingPage } from './pages/LandingPage';
import { DashboardPage } from './pages/DashboardPage';
import { AddProductPage } from './pages/AddProductPage';
import { MyProductsPage } from './pages/MyProductsPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { EnquiryPage } from './pages/EnquiryPage';

import { CheckCircle2, Info, AlertCircle } from 'lucide-react';

function MainContent() {
  const { activePage, toast } = useApp();

  const renderPage = () => {
    switch (activePage) {
      case 'landing':
        return <LandingPage />;
      case 'dashboard':
        return <DashboardPage />;
      case 'add-product':
        return <AddProductPage />;
      case 'my-products':
        return <MyProductsPage />;
      case 'marketplace':
        return <MarketplacePage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'enquiry':
        return <EnquiryPage />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6F0] text-stone-900 selection:bg-[#C85A32] selection:text-white">
      {/* Toast Notification Container */}
      {toast && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 duration-200">
          <div className="bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-stone-700 flex items-center gap-3 text-xs sm:text-sm font-medium">
            {toast.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            ) : (
              <Info className="w-5 h-5 text-amber-400 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Global Navigation */}
      <Navbar />

      {/* Dynamic Page Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainContent />
      </AppProvider>
    </LanguageProvider>
  );
}
