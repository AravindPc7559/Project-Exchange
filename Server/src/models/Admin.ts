import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema({
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
        minLength: 8,
        set: (value: string) => bcrypt.hashSync(value, 12)
      },
      name: {
        type: String,
        required: true,
        trim: true
      },
      role: {
        type: String,
        required: true,
        enum: ["admin", "user", "super admin"],
        default: "user"
      },
      blocked: {
        type: Boolean,
        default: false
      }
}, {timestamps: true})

const Admin = mongoose.model("Admin", adminSchema)

export default Admin;