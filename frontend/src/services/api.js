/**
 * Smart Artisan Frontend API Service
 * Lightweight HTTP client with graceful offline fallback to local mock data.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

class ApiService {
  constructor(baseUrl = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    try {
      const response = await fetch(url, { ...options, headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (err) {
      console.warn(`[Smart Artisan API] Backend unreachable at ${url}. Operating in offline-first mode:`, err.message);
      return null;
    }
  }

  // Health check
  async getHealth() {
    return this.request('/api/health');
  }

  // Products API (Future-ready)
  async getProducts() {
    return this.request('/api/products');
  }

  async getProductById(id) {
    return this.request(`/api/products/${id}`);
  }

  async createProduct(productData) {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    });
  }

  // Artisans API (Future-ready)
  async getArtisans() {
    return this.request('/api/artisans');
  }

  // Enquiries API (Future-ready)
  async createEnquiry(enquiryData) {
    return this.request('/api/enquiries', {
      method: 'POST',
      body: JSON.stringify(enquiryData),
    });
  }
}

export const api = new ApiService();
export default api;
