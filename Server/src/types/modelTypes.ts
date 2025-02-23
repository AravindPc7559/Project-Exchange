import mongoose from "mongoose";

// Interface representing a User document
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    mobile: string;
    education: string;
    description: string;
    interests: string[];
    profilePic: string;
    uploadedProjects: mongoose.Types.ObjectId[];
    purchasedProjects: mongoose.Types.ObjectId[];
    earnings: number;
  }
  