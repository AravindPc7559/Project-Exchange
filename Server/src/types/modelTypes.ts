import mongoose, { Types } from "mongoose";

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
    departMent: string;
  }
  
  export interface IReview {
    userId: Types.ObjectId;
    rating: number;
    review: string;
  }
  
  export interface IProject extends Document {
    title: string;
    description: string;
    techUsed: string[];
    category: string;
    price: number;
    file: string;
    document: string;
    demoVideo: string;
    userId: Types.ObjectId;
    reviews: IReview[];
    approvalStatus: 'pending' | 'approved' | 'rejected';
    isFeatured: boolean;
  }
  