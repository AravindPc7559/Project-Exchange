import { Request, Response } from "express";
import Admin from "../../models/Admin";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../../config/config";

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

export default { adminLogin }