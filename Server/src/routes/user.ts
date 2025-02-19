import express, { Router } from 'express';
import { isAuth } from '../middleware/auth';

const router: Router = express.Router();

// Profile Management
router.put('/update', isAuth, /* userController.updateProfile */);
router.post('/upload-avatar', isAuth, /* userController.uploadAvatar */);

// User Dashboard
router.get('/projects', isAuth, /* userController.getUserProjects */);
router.get('/purchases', isAuth, /* userController.getPurchaseHistory */);

// Earnings & Withdrawal
router.get('/earnings', isAuth, /* userController.getEarnings */);
router.post('/withdraw', isAuth, /* userController.requestWithdrawal */);

export default router;
