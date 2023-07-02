import { INotificationTemplate } from './entities/notification.interface';

export interface ICreateNotification extends INotificationTemplate {
  appointmentId: string;
};
