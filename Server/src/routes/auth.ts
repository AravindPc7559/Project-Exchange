import express, { Router, Request, Response } from 'express';
import AuthController from '../controllers/AuthController/AuthController';

const router: Router = express.Router();

// Login route
router.post('/login', AuthController.login);

// Register route
router.post('/register', AuthController.Registration);

// Logout route
router.post('/logout', (req: Request, res: Response) => {
    res.json({ message: 'Logout endpoint' });
});

export default router;
