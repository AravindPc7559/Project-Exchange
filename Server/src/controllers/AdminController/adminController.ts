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

export default { adminLogin, getAllUsers }