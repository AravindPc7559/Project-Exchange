import express, { Router } from 'express';
import { isAuth } from '../middleware/auth';
import ProjectController from '../controllers/ProjectController/ProjectController';

const router: Router = express.Router();

// Project Listing & Search
router.get('/', /* projectController.getProjects */);
router.get('/search', /* projectController.searchProjects */);
router.get('/trending', /* projectController.getTrendingProjects */);

// Project Details
router.get('/:projectId', /* projectController.getProjectDetails */);
router.get('/:projectId/similar', /* projectController.getSimilarProjects */);

// Project Reviews
router.post('/:projectId/review', isAuth, ProjectController.addReview);

// Project Upload & Management
router.post('/upload', isAuth, ProjectController.uploadProject);
router.put('/:projectId', isAuth, ProjectController.updateProject);
router.delete('/:projectId', isAuth, ProjectController.deleteProject);
router.put('/:projectId/request-approval', isAuth, /* projectController.requestApproval */);

export default router;
