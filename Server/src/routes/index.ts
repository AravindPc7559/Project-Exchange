import express from 'express';
import { Router } from 'express';

const router: Router = express.Router();

router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});

export default router;
