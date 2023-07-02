import { Types } from 'mongoose';

import User from '../models/user.model';

import { IUser, IUserModel } from '../interfaces/entities/user.interface';

export const createUser = async (user: Omit<IUser, '_id' | 'createdAt' | 'updatedAt'>) => {
  const newUser = new User(user).save();
  return (await newUser)._doc;
};

export const findOneByPhone = async (phone: string) =>
  unwrap(await User.findOne({ phone }).exec());

export const findOneById = async (id: string | Types.ObjectId) =>
  unwrap(await User.findById(id).exec());

export const findManyById = async (ids: string[] | Types.ObjectId[]) =>
  unwrapMany(await User.find({ _id: { $in: ids } }).exec());

export const findManyBy = async (
  options: {} = {},
) => {
  const searchOptions: {} = {};
  const results = await User.find(searchOptions).exec();
  return unwrapMany(results);
}

const unwrap = (entity: IUserModel | null) => entity?._doc;
const unwrapMany = (entities: IUserModel[]) => entities.map(e => e._doc);
