import { Router } from 'express';
import { analyzeProductImage } from '../controllers/aiController.js';

const router = Router();

router.post('/analyze-product', analyzeProductImage);

export default router;
