import { Request, Response } from "express";
import Admin from "../../models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";
import { User } from "../../models/User";
import redisClient from "../../utils/redisClient";

const adminLogin = async (req: Request, res: Response) => {
    try {
        if(!req.body) return res.status(400).json({ message: 'Invalid request body' });

        const {email, password} = req.body;

        const user = await Admin.findOne({ email }).lean();

        if(user){
            const isMatch = await bcrypt.compare(password, user.password);
            if(isMatch){
                const token = jwt.sign(
                    { id: user._id, email: user.email },
                    config.jwtSecret as string,
                    { expiresIn: '1d' }
                );

                res.status(200).json({ token });
            }
        }
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Retrieves all users from the database with optional pagination.
 * 
 * @param {Request} req - The request object containing the pagination limit.
 * @param {Response} res - The response object used to send the response.
 * @returns {Promise<void>} - A promise that resolves when the response is sent.
 */
const getAllUsers = async (req: Request, res: Response) => {
    try {
        const { limit } = req.body
        let dataLimit = limit ?? 10
        const cacheKey = `adminUsers:${dataLimit}`;

        const cachedData = await redisClient.get(cacheKey);

        if(cachedData){
            return res.status(200).json({users: JSON.parse(cachedData)});
        }
        
        const users = await User.find({}, { password: 0 }, { limit: dataLimit }).lean();

        const keys = await redisClient.keys('users:*');
        for (const key of keys) {
            if (key !== cacheKey) {
              await redisClient.del(key);
            }
        }

        await redisClient.set(cacheKey, JSON.stringify(users), {
            EX: 10800,
          });

        res.status(200).json({ users });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Deletes a user from the database
 * @param {Request} req - The request object containing the user's ID
 * @param {Response} res - The response object used to send the response
 * @returns {Promise<void>} - A promise that resolves when the user is deleted
 */
const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if(!userId) return res.status(400).json({ message: 'User ID is required' });

        const user = await User.findByIdAndDelete(userId);

        if(user){
            await redisClient.del(`${userId}_user_info`);
            return res.status(200).json({ message: 'User deleted successfully' });
        }

        return res.status(404).json({ message: 'User not found' });
        
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Bans a user for a specified duration
 * @param {Request} req - The request object containing the user's ID and duration
 * @param {Response} res - The response object used to send the response
 * @returns {Promise<void>} - A promise that resolves when the user is banned
 */
const banUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params
        const { duration } = req.body;
        
        let currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + duration);
        const banDate = currentDate.toISOString().split('T')[0];

        const user = await User.findByIdAndUpdate(userId, { isBan: {
            ban: true,
            duration: banDate
        } }, { new: true });

        if(user){
            return res.status(200).json({ message: 'User banned successfully' });
        }

        return res.status(404).json({ message: 'User not found' });
        
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default { adminLogin, getAllUsers, deleteUser, banUser }