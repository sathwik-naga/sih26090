import { Router } from 'express';
import { getArtisans, getArtisanById } from '../controllers/artisanController.js';

const router = Router();

router.get('/', getArtisans);
router.get('/:id', getArtisanById);

export default router;
