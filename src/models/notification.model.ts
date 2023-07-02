import mongoose, { Types } from 'mongoose';

import { INotification, INotificationModel } from '../interfaces/entities/notification.interface';

const modelSchema: Record<keyof Omit<INotification, '_id'>, any> = {
  appointmentId: {
    type: Types.ObjectId,
    required: true,
  },

  key: {
    type: String,
    required: true,
  },

  time: {
    type: Date,
    required: true,
  },

  sendedAt: Date,

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
};

const Notification = new mongoose.Schema<INotificationModel>(modelSchema, { versionKey: false });
export default mongoose.model<INotificationModel>('Notification', Notification, 'notifications');
