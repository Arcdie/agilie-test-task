import { ENotificationMethod } from '../interfaces/notificationMethod.enum';

export class Notificator {
  private method: ENotificationMethod;

  // by default
  constructor(method: ENotificationMethod = ENotificationMethod.Console) {
    if (!Object.values(ENotificationMethod).includes(method)) {
      throw new Error('Invalid method');
    }

    this.method = method;
  }

  async send(message: string) {
    switch (this.method) {
      case ENotificationMethod.SMS: Notificator.sendSMS(message); break;
      case ENotificationMethod.Email: Notificator.sendEmail(message); break;
      case ENotificationMethod.Console: Notificator.logToConsole(message); break;
      case ENotificationMethod.PushNotification: Notificator.sendPushNotification(message); break;
      default: throw new Error('No handler for method');
    }
  }

  // by manual choice
  static logToConsole(message: string) {
    console.log('New notification', message);
  }

  static async sendSMS(message: string) {
    Notificator.logToConsole(message);
  }

  static async sendEmail(message: string) {
    Notificator.logToConsole(message);
  }

  static async sendPushNotification(message: string) {
    Notificator.logToConsole(message);
  }
}
