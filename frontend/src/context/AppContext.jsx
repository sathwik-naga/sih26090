import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_ARTISAN, INITIAL_PRODUCTS, INITIAL_INQUIRIES } from '../data/mockData';

const AppContext = createContext();

export function AppProvider({ children }) {
  // Load products from localStorage or fallback to initial (auto-upgrades old unsplash placeholders to 10 authentic craft images)
  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_artisan_products');
      if (saved) {
        const parsed = JSON.parse(saved);
        const hasOldImages = Array.isArray(parsed) && parsed.some(p => 
          p.images && p.images.some(img => typeof img === 'string' && (img.includes('unsplash') || !img.includes('/crafts/')))
        );
        if (hasOldImages || parsed.length < 10) {
          localStorage.setItem('smart_artisan_products', JSON.stringify(INITIAL_PRODUCTS));
          return INITIAL_PRODUCTS;
        }
        return parsed;
      }
      return INITIAL_PRODUCTS;
    } catch (e) {
      return INITIAL_PRODUCTS;
    }
  });

  // Load inquiries from localStorage or fallback to initial
  const [inquiries, setInquiries] = useState(() => {
    try {
      const saved = localStorage.getItem('smart_artisan_inquiries');
      return saved ? JSON.parse(saved) : INITIAL_INQUIRIES;
    } catch (e) {
      return INITIAL_INQUIRIES;
    }
  });

  // Active role: 'artisan' | 'buyer'
  const [currentRole, setCurrentRole] = useState(() => {
    return localStorage.getItem('smart_artisan_role') || 'artisan';
  });

  // Active page: 'landing' | 'dashboard' | 'add-product' | 'my-products' | 'marketplace' | 'product-detail' | 'enquiry'
  const [activePage, setActivePage] = useState('landing');
  const [selectedProductId, setSelectedProductId] = useState('prod-001');

  // Artisan Profile
  const [artisan] = useState(INITIAL_ARTISAN);

  // Toast Notification state
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      localStorage.setItem('smart_artisan_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('smart_artisan_inquiries', JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem('smart_artisan_role', currentRole);
    } catch (e) {
      console.error(e);
    }
  }, [currentRole]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const navigateTo = (page, prodId = null) => {
    // Strict role-based protection
    const artisanOnlyPages = ['dashboard', 'add-product', 'my-products'];
    let targetPage = page;
    if (currentRole === 'buyer' && artisanOnlyPages.includes(targetPage)) {
      targetPage = 'marketplace';
      showToast('Artisan Studio access is only available in Artisan mode.', 'info');
    }

    if (prodId) {
      setSelectedProductId(prodId);
    }
    setActivePage(targetPage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const switchRole = (role) => {
    setCurrentRole(role);
    if (role === 'artisan') {
      navigateTo('dashboard');
      showToast('Switched to Artisan Studio mode', 'info');
    } else {
      navigateTo('marketplace');
      showToast('Switched to Buyer Marketplace mode', 'info');
    }
  };

  const addProduct = (productData) => {
    const newProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      artisanId: artisan.id,
      artisanName: artisan.name,
      artisanAvatar: artisan.avatar,
      artisanState: artisan.state,
      villageCluster: `${artisan.village}`,
      views: 1,
      inquiriesCount: 0,
      createdAt: new Date().toISOString(),
    };

    setProducts(prev => [newProduct, ...prev]);
    showToast(`"${productData.name}" has been added to your digital catalog!`);
    return newProduct;
  };

  const updateProduct = (id, updatedFields) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updatedFields } : p));
    showToast('Product catalog details updated.');
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product removed from catalog.', 'info');
  };

  const toggleStockStatus = (id) => {
    setProducts(prev => prev.map(p => {
      if (p.id === id) {
        const nextStatus = p.stockStatus === 'In Stock' ? 'Made to Order' : 'In Stock';
        showToast(`Product marked as "${nextStatus}"`);
        return { ...p, stockStatus: nextStatus };
      }
      return p;
    }));
  };

  const addInquiry = (inquiryData) => {
    const targetProduct = products.find(p => p.id === inquiryData.productId) || {};
    const newInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      productName: targetProduct.name || 'Handicraft Item',
      status: 'New',
      date: new Date().toISOString().split('T')[0],
      artisanReply: null,
    };

    setInquiries(prev => [newInquiry, ...prev]);
    // increment inquiries count on product
    setProducts(prev => prev.map(p => p.id === inquiryData.productId ? { ...p, inquiriesCount: (p.inquiriesCount || 0) + 1 } : p));
    showToast('Inquiry successfully sent to the artisan!');
    return newInquiry;
  };

  const updateInquiryStatus = (id, status, reply = null) => {
    setInquiries(prev => prev.map(inq => {
      if (inq.id === id) {
        return { ...inq, status, ...(reply ? { artisanReply: reply } : {}) };
      }
      return inq;
    }));
    showToast(`Inquiry status updated to ${status}`);
  };

  const resetSampleData = () => {
    setProducts(INITIAL_PRODUCTS);
    setInquiries(INITIAL_INQUIRIES);
    showToast('Sample catalog & inquiries reset to default.', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        artisan,
        products,
        inquiries,
        currentRole,
        activePage,
        selectedProductId,
        toast,
        navigateTo,
        switchRole,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleStockStatus,
        addInquiry,
        updateInquiryStatus,
        resetSampleData,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
