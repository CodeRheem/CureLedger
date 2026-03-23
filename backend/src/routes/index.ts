import { Router } from 'express';
import authRoutes from './auth';
import campaignsRoutes from './campaigns';
import donateRoutes from './donate';

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/campaigns', campaignsRoutes);
router.use('/donate', donateRoutes);

export default router;
