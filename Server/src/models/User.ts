import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types/modelTypes';

// User Schema
const UserSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  education: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  interests: [{
    type: String,
  }],
  departMent: {
    type: String
  },
  profilePic: {
    type: String,
    default: '',
  },
  uploadedProjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
  purchasedProjects: [{
    type: Schema.Types.ObjectId,
    ref: 'Project',
  }],
  earnings: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

export const User = mongoose.model<IUser>('User', UserSchema);
