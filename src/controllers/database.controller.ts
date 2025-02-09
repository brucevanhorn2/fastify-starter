import { User } from '../models/mongoose/user.model';

// Create a new user
export const createUser = async (name: string, email: string, password: string) => {
  return await User.create({ name, email, password });
};

// Get all users
export const getUsers = async () => {
  return await User.find();
};
