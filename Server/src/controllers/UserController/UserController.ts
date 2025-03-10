import { Request, Response } from "express";
import { User } from "../../models/User";
import { uploadFile } from "../../utils/s3";
import { RequestHandler } from 'express';
import { Project } from "../../models/Project";
import redisClient from "../../utils/redisClient";

interface MulterRequest extends Request {
    file?: any
}

/**
 * Updates user profile information
 * @async
 * @param {MulterRequest} req - Express request object
 * @param {Object} req.body - Request body containing user details
 * @param {string} req.body.name - User's name
 * @param {string} req.body.email - User's email
 * @param {string} req.body.mobile - User's mobile number
 * @param {string} req.body.education - User's education details
 * @param {string} req.body.description - User's profile description
 * @param {string[]} req.body.interests - User's interests
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - User's ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Returns updated user data
 * @throws {Error} If user update fails
 */
const updateProfile: RequestHandler = async (req: MulterRequest, res: Response) => {
    try {
        if(!req.body) return res.status(400).json({ message: 'Invalid request body' });
        if(!req.params.id) return res.status(400).json({ message: 'Invalid request params' });

        const { name, email, mobile, education, description, interests } = req.body;
        const { id } = req.params;

        const user = await User.findOneAndUpdate(
            {_id: id},
            { $set: { 
                name, 
                email, 
                mobile, 
                education, 
                description, 
                interests, 
            }},
            { new: true }
        );

        if(user){
            res.status(200).json({ message: 'Profile updated successfully', user });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Updates user's profile picture
 * @async
 * @param {MulterRequest} req - Express request object with file upload
 * @param {Object} req.file - Uploaded file object from multer
 * @param {string} req.file.path - Temporary path of uploaded file
 * @param {string} req.file.mimetype - MIME type of uploaded file
 * @param {string} req.file.originalname - Original name of uploaded file
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.id - User's ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Returns updated user data with new profile picture URL
 * @throws {Error} If file upload or user update fails
 */
const updateProfilePicture = async (req: MulterRequest, res: Response) => {
    try {
        if(!req.file) return res.status(400).json({ message: 'No file uploaded' });
        if(!req.params.id) return res.status(400).json({ message: 'Invalid request params' })

        const { id } = req.params
        const profilePic = req?.file;
        let profilePicUrl;

        if(profilePic){
            const uploadedFile = await uploadFile(profilePic, "ProfilePics");
            profilePicUrl = uploadedFile;
        }

        if(profilePicUrl){
            const user = await User.findOneAndUpdate({_id: id}, { $set: { profilePic: profilePicUrl }}, { new: true })
            if(user){
                res.status(200).json({ message: 'Profile picture updated successfully', user });
            }
        } else {
            res.status(400).json({ message: 'No file uploaded' });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Gets projects uploaded by a user
 * @async
 * @param {Request} req - Express request object
 * @param {Object} req.body - Request body object
 * @param {string} req.body.userId - User's ID
 * @param {number} [req.body.limit] - Number of projects to fetch
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Returns a JSON response with projects
 * @throws {Error} If project fetch fails
 */
const getUserProjects = async ({ body }: Request, res: Response) => {
    try {
        const { userId, limit } = body;
        const dataLimit = limit ?? null;

        if (!userId) {
            return res.status(400).json({ message: 'Invalid request body' });
        }

        const projects = await Project.find({ userId }, null, { limit: dataLimit }).lean();

        if (projects.length) {
            res.status(200).json({ message: 'Projects fetched successfully', projects });
        } else {
            res.status(200).json({ message: "No projects found" });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

/**
 * Gets projects uploaded by other users matching the logged in user's interests
 * @async
 * @param {Request} req - Express request object
 * @param {Object} req.params - URL parameters
 * @param {string} req.params.userId - User's ID
 * @param {Response} res - Express response object
 * @returns {Promise<void>} Returns a JSON response with projects
 * @throws {Error} If project fetch fails
 */
const getUserHomepageProjects = async ({ params }: Request, res: Response) => {
    try {
        const { userId } = params;
        if (!userId) {
            return res.status(400).json({ message: 'Invalid request params' });
        }

        const userCache = await redisClient.get(`${userId}_user_info`);
        const userData = userCache ? JSON.parse(userCache) : await User.findById(userId, null, { lean: true });

        if (!userData) {
            return res.status(404).json({ message: 'User not found' });
        }

        const projects = await Project.find(
            {
                $and: [
                    { userId: { $ne: userId } },
                    { $or: [{ techUsed: { $in: userData.interests } }, { category: userData.category }] },
                ],
            },
            null,
            { lean: true, limit: 10 }
        );

        if (projects.length) {
            res.status(200).json({ message: 'Projects fetched successfully', projects });
        } else {
            res.status(200).json({ message: "No projects found" });
        }

    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}

export default { updateProfile, updateProfilePicture, getUserProjects, getUserHomepageProjects }