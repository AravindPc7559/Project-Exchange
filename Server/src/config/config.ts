import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required in environment variables');
}

export const config = {
    port: process.env.PORT || 3005,
    nodeEnv: process.env.NODE_ENV || 'development',
    mongoUrl: process.env.MONGO_URL || 'mongodb://localhost:27017/project-exchange',
    jwtSecret: process.env.JWT_SECRET
};
