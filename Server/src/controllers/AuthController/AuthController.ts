import { User } from "../../models/User";
import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from "../../config/config";
import redisClient from "../../utils/redisClient";

/**
 * Handles new user registration
 * @async
 * @param {Request} req - Express request object containing user registration data
 * @param {Object} req.body - Request body containing user details
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {Promise<void>} - Returns JSON response with success/error message
 * @throws {Error} - Throws error if registration fails
 */
const Registration = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body) return res.status(400).json({ message: 'Invalid request body' });

        const { name, email, password, mobile, education, description, interests } = req.body;

        const user = await User.findOne({ email });

        if(user) return res.status(400).json({ message: 'User already exists' });

        const newPassword = bcrypt.hashSync(password, 10);

        const createUser = await User.create({
            name,
            email,
            password: newPassword,
            mobile,
            education,
            description,
            interests
        })

        if(createUser){
            res.status(201).json({ message: 'User created successfully' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Handles user login
 * @async
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @returns {Promise<void>} - Returns JSON response with token on success
 */
const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if(!req.body) return res.status(400).json({ message: 'Invalid request body' });

        const {email, password} = req.body;

        const user = await User.findOne({ email }).lean();
        
        if(!user) return res.status(400).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign(
            { id: user._id, email: user.email },
            config.jwtSecret as string,
            { expiresIn: '30d' }
        );
        
        const redisItem = {...user}
        Reflect.deleteProperty(redisItem, 'password');
        redisClient.SET(`${user._id}_user_info`, JSON.stringify(redisItem));

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default { Registration, login }