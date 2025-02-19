import express, { Router } from 'express';
import authRoutes from './auth';
import userRoutes from './user';
import projectRoutes from './projects';
import adminRoutes from './admin';

const router: Router = express.Router();

// Mount authentication routes
router.use('/auth', authRoutes);

// Mount user routes
router.use('/user', userRoutes);

// Mount project routes
router.use('/projects', projectRoutes);

// Mount admin routes
router.use('/admin', adminRoutes);

export default router;
