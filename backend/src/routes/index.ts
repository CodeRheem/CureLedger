import { Router } from 'express';
import authRoutes from './auth';
import campaignsRoutes from './campaigns';
import donateRoutes from './donate';
import verifyRoutes from './verify';
import withdrawRoutes from './withdraw';
import adminRoutes from './admin';
import paymentRoutes from './payments';
// import hospitalRoutes from './hospitals'; // TODO: Review - GET /hospitals endpoint
// import profileRoutes from './profile'; // TODO: Review - PATCH /profile endpoint

const router = Router();

// Mount route modules
router.use('/auth', authRoutes);
router.use('/campaigns', campaignsRoutes);
router.use('/donate', donateRoutes);
router.use('/campaigns', verifyRoutes);
router.use('/withdraw', withdrawRoutes);
router.use('/admin', adminRoutes);
router.use('/payments', paymentRoutes);
// router.use('/hospitals', hospitalRoutes); // TODO: Review
// router.use('/profile', profileRoutes); // TODO: Review

export default router;
