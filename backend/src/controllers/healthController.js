/**
 * Health check controller
 */
import { sendSuccess } from '../utils/responseHelper.js';

export const getHealth = (req, res) => {
  const healthData = {
    status: 'healthy',
    uptimeSeconds: Math.floor(process.uptime()),
    timestamp: new Date().toISOString(),
    service: 'smart-artisan-backend',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  };

  return sendSuccess(res, healthData, 'Smart Artisan backend is operational.');
};
