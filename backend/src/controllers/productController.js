/**
 * Products controller - Lightweight foundation ready for database integration
 */
import { sendSuccess } from '../utils/responseHelper.js';

export const getProducts = (req, res) => {
  return sendSuccess(res, [], 'Products retrieved successfully (API foundation).');
};

export const getProductById = (req, res) => {
  const { id } = req.params;
  return sendSuccess(res, { id }, `Product ${id} retrieved (API foundation).`);
};

export const createProduct = (req, res) => {
  const productData = req.body;
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...productData,
    createdAt: new Date().toISOString(),
  };
  return sendSuccess(res, newProduct, 'Product created successfully.', 201);
};
