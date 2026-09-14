import { Router } from 'express';
import healthRoutes from './healthRoutes.js';
import productRoutes from './productRoutes.js';
import artisanRoutes from './artisanRoutes.js';
import enquiryRoutes from './enquiryRoutes.js';
import aiRoutes from './aiRoutes.js';

const router = Router();

router.use('/health', healthRoutes);
router.use('/products', productRoutes);
router.use('/artisans', artisanRoutes);
router.use('/enquiries', enquiryRoutes);
router.use('/ai', aiRoutes);

export default router;
