import constants from '../config/constants';

import log from '../libs/winston.lib';
import { getValidFormat } from '../libs/moment.lib';
import { Notificator } from '../libs/notificator.lib';
import { getUnix, getUniqueArray, isDefined, getQueue } from '../libs/helper.lib';

import * as userRepository from '../repositories/user.repository';
import * as doctorRepository from '../repositories/doctor.repository';
import * as appointmentRepository from '../repositories/appointment.repository';
import * as notificationRepository from '../repositories/notification.repository';

import { IFail, ISuccess } from '../interfaces/result.interface';
import { IUser } from '../interfaces/entities/user.interface';
import { IDoctor } from '../interfaces/entities/doctor.interface';
import { IAppointment } from '../interfaces/entities/appointment.interface';
import { INotification } from '../interfaces/entities/notification.interface';
import { ICreateNotification } from '../interfaces/createNotification.interface';

interface IExtendedNotification extends INotification {
  appointment: IAppointment & {
    user: IUser;
    doctor: IDoctor;
  };
}

export const createNotification = async (notificationData: ICreateNotification): Promise<IFail | ISuccess<INotification>> => {
  const newNotification = await notificationRepository.createNotification(notificationData);

  return {
    status: true,
    result: newNotification,
  };
};

export const createNotificationsByAppointment = async (appointment: IAppointment): Promise<IFail | ISuccess<INotification[]>> => {
  const timeNowUnix = getUnix();
  const startOfAppointmentUnix = getUnix(appointment.time);
  const difference = startOfAppointmentUnix - timeNowUnix;
  const targetTime = constants.appointmentNotificationsTime.filter(({ value }) => difference >= value);

  if (!targetTime.length) {
    return {
      status: true,
      result: [],
    };
  }

  const result = (await Promise.all(targetTime.map(async ({ key, value }) => {
    const resultCreate = await createNotification({
      key,
      appointmentId: appointment._id,
      time: new Date((startOfAppointmentUnix - value) * 1000),
    });

    return resultCreate.status ? resultCreate.result : null;
  }))).filter(isDefined);

  return {
    status: true,
    result,
  };
};

export const checkRequiredToSendNotifications = async (): Promise<IFail | ISuccess<number>> => {
  const targetNotifications = await notificationRepository.findReadyToSend();

  if (!targetNotifications.length) {
    return {
      status: true,
      result: 0,
    };
  }

  let numberSendedNotifications = 0;
  const queues = getQueue(targetNotifications, 30); // split arr into queues to prevent memory depletion

  for await (const notifications of queues) {
    const appointments = await appointmentRepository.findManyById(
      getUniqueArray(notifications.map(e => e.appointmentId)),
    );

    const [users, doctors] = await Promise.all([
      userRepository.findManyById(getUniqueArray(appointments.map(e => e.userId))),
      doctorRepository.findManyById(getUniqueArray(appointments.map(e => e.doctorId))),
    ]);

    const extendedAppointments = appointments.map(a => ({
      ...a,
      user: users.find(u => u._id.toString() === a.userId.toString()) as IUser,
      doctor: doctors.find(d => d._id.toString() === a.doctorId.toString()) as IDoctor,
    }));

    const extendedNotifications: IExtendedNotification[] = notifications.map(n => ({
      ...n,
      appointment: extendedAppointments.find(a => a._id.toString() === n.appointmentId.toString()) as IExtendedNotification['appointment'],
    }));

    const sendedNotifications = (await Promise.all(extendedNotifications.map(async notification => {
      try {
        const message = collectNotificationMessage(notification);
        await new Notificator().send(message);
        return notification;
      } catch (err) {
        log.error(err instanceof Error ? err.message : err);
        return null;
      }
    }))).filter(isDefined);

    numberSendedNotifications += sendedNotifications.length;
    await notificationRepository.makeSended(sendedNotifications, new Date());
  }

  return {
    status: true,
    result: numberSendedNotifications,
  };
};

const collectNotificationMessage = (notification: IExtendedNotification) => {  
  return notification.key === '2h'
    ? `Hello ${notification.appointment.user.name}! You have an appointment to ${notification.appointment.doctor.speciality} in 2 hours at ${getValidFormat(notification.time)}!`
    : `Hello ${notification.appointment.user.name}! Remember that you have an appointment to ${notification.appointment.doctor.speciality} tomorrow at ${getValidFormat(notification.time)}!`;
};
