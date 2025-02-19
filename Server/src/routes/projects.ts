import express, { Router } from 'express';
import { isAuth } from '../middleware/auth';

const router: Router = express.Router();

// Project Listing & Search
router.get('/', /* projectController.getProjects */);
router.get('/search', /* projectController.searchProjects */);
router.get('/trending', /* projectController.getTrendingProjects */);

// Project Details
router.get('/:projectId', /* projectController.getProjectDetails */);
router.get('/:projectId/similar', /* projectController.getSimilarProjects */);

// Project Reviews
router.post('/:projectId/review', isAuth, /* projectController.addReview */);

// Project Upload & Management
router.post('/upload', isAuth, /* projectController.uploadProject */);
router.put('/:projectId', isAuth, /* projectController.updateProject */);
router.delete('/:projectId', isAuth, /* projectController.deleteProject */);
router.put('/:projectId/request-approval', isAuth, /* projectController.requestApproval */);

export default router;
