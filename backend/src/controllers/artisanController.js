/**
 * Artisan controller - Lightweight foundation
 */
import { sendSuccess } from '../utils/responseHelper.js';

export const getArtisans = (req, res) => {
  return sendSuccess(res, [], 'Artisans list retrieved (API foundation).');
};

export const getArtisanById = (req, res) => {
  const { id } = req.params;
  return sendSuccess(res, { id }, `Artisan ${id} retrieved (API foundation).`);
};
