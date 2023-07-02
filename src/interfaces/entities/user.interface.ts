import { HydratedDocument, Types } from 'mongoose';

export interface IUserTemplate {
  phone: string;
  name: string;
};

export interface IUser extends IUserTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IUserModel extends HydratedDocument<IUser> {
  _doc: IUser & { _id: Types.ObjectId };
};
