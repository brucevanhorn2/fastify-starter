import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } // (Normally hashed in production)
}, { timestamps: true });

export const User = mongoose.model('User', userSchema);
