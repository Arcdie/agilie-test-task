import Notification from '../models/notification.model';

import { INotification, INotificationModel } from '../interfaces/entities/notification.interface'

export const createNotification = async (notification: Omit<INotification, '_id' | 'sendedAt' | 'createdAt' | 'updatedAt'>) => {
  const newNotification = new Notification(notification).save();
  return (await newNotification)._doc;
};

export const findReadyToSend = async (time: Date = new Date()) => {
  const results = await Notification.find({
    sendedAt: null,
    time: { $lte: time },
  }).exec();

  return unwrapMany(results);
};

export const makeSended = (notifications: INotification[], sendedAt: Date) =>
  Notification.updateMany({
    _id: { $in: notifications.map(n => n._id) },
  }, { sendedAt });

const unwrap = (entity: INotificationModel | null) => entity?._doc;
const unwrapMany = (entities: INotificationModel[]) => entities.map(e => e._doc);
