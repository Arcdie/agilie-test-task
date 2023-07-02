import mongoose from 'mongoose';

import { IUser, IUserModel } from '../interfaces/entities/user.interface';

const modelSchema: Record<keyof Omit<IUser, '_id'>, any> = {
  phone: {
    type: String,
    unique: true,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
};

const User = new mongoose.Schema<IUserModel>(modelSchema, { versionKey: false });
export default mongoose.model<IUserModel>('User', User, 'users');
