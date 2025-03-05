import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';

interface AuthRequest extends Request {
    user?: any;
}

export const isAdmin = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, config.jwtSecret || 'your-secret-key');
        
        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded;            
            next();
        }
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export const isAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        const decoded = jwt.verify(token, config.jwtSecret);
        
        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded;
            next();
        }
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
