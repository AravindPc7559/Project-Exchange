import express, { Router } from 'express';
import { isAdmin } from '../middleware/auth';

const router: Router = express.Router();

// Admin Authentication
router.post('/login', /* adminController.login */);

// Dashboard
router.get('/dashboard', isAdmin, /* adminController.getDashboardStats */);

// User Management
router.get('/users', isAdmin, /* adminController.getAllUsers */);
router.put('/users/:userId', isAdmin, /* adminController.updateUser */);
router.delete('/users/:userId', isAdmin, /* adminController.deleteUser */);
router.put('/users/:userId/ban', isAdmin, /* adminController.toggleUserBan */);

// Project Management
router.put('/projects/:projectId/status', isAdmin, /* adminController.updateProjectStatus */);
router.delete('/projects/:projectId', isAdmin, /* adminController.deleteProject */);
router.put('/projects/:projectId/feature', isAdmin, /* adminController.toggleProjectFeature */);

// Transaction Management
router.get('/transactions', isAdmin, /* adminController.getTransactions */);
router.post('/refund/:transactionId', isAdmin, /* adminController.processRefund */);
router.get('/reports', isAdmin, /* adminController.getReports */);

export default router;
