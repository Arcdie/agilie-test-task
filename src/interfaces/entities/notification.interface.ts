import { HydratedDocument, Types } from 'mongoose';

export interface INotificationTemplate {
  key: string;
  time: Date;
};

export interface INotification extends INotificationTemplate {
  _id: string;
  appointmentId: string;

  sendedAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export interface INotificationModel extends HydratedDocument<INotification> {
  _doc: INotification & { _id: Types.ObjectId };
};
