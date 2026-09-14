/**
 * AI Catalog Analysis controller - Future-ready API endpoint
 */
import { sendSuccess } from '../utils/responseHelper.js';

export const analyzeProductImage = (req, res) => {
  const { imageUrl, hint } = req.body;
  
  // Future hook for cloud AI models (Gemini / Vision API)
  const analysisResult = {
    analyzed: true,
    hint: hint || 'Handcrafted Indian craft',
    confidence: 98,
    timestamp: new Date().toISOString(),
  };

  return sendSuccess(res, analysisResult, 'AI analysis endpoint ready for cloud extension.');
};
