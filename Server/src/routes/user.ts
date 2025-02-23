import express, { Router } from 'express';
import { isAuth } from '../middleware/auth';
import UserController from '../controllers/UserController/UserController';
import multer from 'multer';
import path from 'path';

const router: Router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname))
    }
});

const fileFilter = (req: express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('Not an image! Please upload an image.'));
    }
};

const upload = multer({ 
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
});

// Profile Management
router.put('/update/:id', isAuth, UserController.updateProfile);
router.post('/upload-avatar/:id', isAuth, upload.single('profilePic'), UserController.updateProfilePicture);

// User Dashboard
router.get('/projects', isAuth,  /* userController.getUserProjects */);
router.get('/purchases', isAuth, /* userController.getPurchaseHistory */);

// Earnings & Withdrawal
router.get('/earnings', isAuth, /* userController.getEarnings */);
router.post('/withdraw', isAuth, /* userController.requestWithdrawal */);

export default router;
