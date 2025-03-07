import express, { Router } from 'express';
import { isAdmin } from '../middleware/auth';
import adminController from '../controllers/AdminController/adminController';
import UserController from '../controllers/UserController/UserController';
import ProjectController from '../controllers/ProjectController/ProjectController';

const router: Router = express.Router();

// Admin Authentication
router.post('/login', adminController.adminLogin);

// Dashboard
router.get('/dashboard', isAdmin, /* adminController.dashboardData */);

// User Management
router.get('/users', isAdmin, adminController.getAllUsers);
router.put('/users/:id', isAdmin, UserController.updateProfile);
router.delete('/users/:userId', isAdmin, adminController.deleteUser);
router.put('/users/:userId/ban', isAdmin, adminController.banUser);

// Project Management
router.put('/projects/:projectId/status', isAdmin, /* adminController.updateProjectStatus */);
router.delete('/projects/:projectId', isAdmin, ProjectController.deleteProject);
router.put('/projects/:projectId/feature', isAdmin, /* adminController.toggleProjectFeature */);

// Transaction Management
router.get('/transactions', isAdmin, /* adminController.getTransactions */);
router.post('/refund/:transactionId', isAdmin, /* adminController.processRefund */);
router.get('/reports', isAdmin, /* adminController.getReports */);

export default router;
