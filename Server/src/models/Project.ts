import { Schema, model, Document, Types } from 'mongoose';
import { IProject, IReview } from '../types/modelTypes';


const reviewSchema = new Schema<IReview>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  review: {
    type: String,
    required: true
  }
});

const projectSchema = new Schema<IProject>({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  techUsed: [{
    type: String,
    required: true
  }],
  category: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  file: {
    type: String,
    required: true
  },
  document: {
    type: String,
    required: false
  },
  demoVideo: {
    type: String,
    required: false
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  reviews: [reviewSchema],
  approvalStatus: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  isFeatured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

export const Project = model<IProject>('Project', projectSchema);
