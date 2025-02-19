import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded;
            
            // Check if user is admin
            if (!req.user.isAdmin) {
                return res.status(403).json({ msg: 'Access denied. Admin privileges required.' });
            }
            
            next();
        }
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};

export const isAuth = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        // Get token from header
        const token = req.header('x-auth-token');

        if (!token) {
            return res.status(401).json({ msg: 'No token, authorization denied' });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        
        if (typeof decoded === 'object' && decoded !== null) {
            req.user = decoded;
            next();
        }
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};
