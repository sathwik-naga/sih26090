/**
 * Enquiry controller - Lightweight foundation
 */
import { sendSuccess } from '../utils/responseHelper.js';

export const createEnquiry = (req, res) => {
  const enquiryData = req.body;
  const newEnquiry = {
    id: `inq-${Date.now()}`,
    ...enquiryData,
    status: 'New',
    createdAt: new Date().toISOString(),
  };
  return sendSuccess(res, newEnquiry, 'Enquiry submitted successfully.', 201);
};
