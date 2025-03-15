import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, rquired: true },
    lastName: { type: String },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['admin', 'editor'],
      required: true,
    },
    isAdmin: { type: Boolean, default: false },
    isActivated: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const User = mongoose.models?.User || mongoose.model('User', userSchema);
