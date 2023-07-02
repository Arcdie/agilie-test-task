import { getUnix } from '../libs/helper.lib';
import { getStartOfDay } from '../libs/moment.lib';

import * as doctorService from '../services/doctor.service';
import * as notificationService from '../services/notification.service';

import * as userRepository from '../repositories/user.repository';
import * as doctorRepository from '../repositories/doctor.repository';
import * as appointmentRepository from '../repositories/appointment.repository';

import { EErrorCode } from '../interfaces/errorCode.enum';
import { EResponseType } from '../interfaces/responseType.enum';
import { IFail, ISuccess } from '../interfaces/result.interface';
import { IAppointment } from '../interfaces/entities/appointment.interface';

import { CreateAppointmentDto } from '../controllers/dto/createAppointment.dto';

export const createAppointment = async (appointmentData: CreateAppointmentDto): Promise<IFail | ISuccess<IAppointment>> => {
  const user = await userRepository.findOneById(appointmentData.userId);

  if (!user) {
    return {
      status: false,
      message: EErrorCode.NO_USER_IN_DB,
      responseType: EResponseType.notFoundResponse,
    };
  }

  const doctor = await doctorRepository.findOneById(appointmentData.doctorId);

  if (!doctor) {
    return {
      status: false,
      message: EErrorCode.NO_DOCTOR_IN_DB,
      responseType: EResponseType.notFoundResponse,
    };
  }

  const doctorWorkshift = doctorService.getDoctorWorkshift(doctor, appointmentData.time);

  // check if doctor works today
  if (!doctorWorkshift.length) {
    return {
      status: false,
      message: EErrorCode.DOCTOR_CANNOT_HAVE_APPOINTMENT_AT_THIS_TIME,
      responseType: EResponseType.badRequestResponse,
    };
  }

  const startOfDayUnix = getUnix(getStartOfDay(appointmentData.time));

  const startAppointmentTime = getUnix(appointmentData.time);
  const endAppointmentTime = startAppointmentTime + appointmentData.duration;

  const countdownForStart = startAppointmentTime - startOfDayUnix;
  const countdownForEnd = endAppointmentTime - startOfDayUnix;

  // check if doctor works in appropriated time
  if (!doctorWorkshift.some(w => w.from <= countdownForStart && w.to >= countdownForEnd)) {
    return {
      status: false,
      message: EErrorCode.DOCTOR_CANNOT_HAVE_APPOINTMENT_AT_THIS_TIME,
      responseType: EResponseType.badRequestResponse,
    };
  }

  const doctorAppointments = await appointmentRepository.findManyByDoctor(doctor);

  // check if it is available time between/before/after existed appointments
  const isCrossed = doctorAppointments.some(a => {
    const start = getUnix(a.time) - startOfDayUnix;
    const end = (getUnix(a.time) + a.duration) - startOfDayUnix;

    if ((countdownForStart <= start && countdownForEnd > start)
      || (countdownForStart < end && countdownForEnd >= end)
      || (countdownForStart >= start && countdownForEnd <= end)) {
      return true;
    }

    return false;
  });

  if (isCrossed) {
    return {
      status: false,
      message: EErrorCode.APPOINTMENT_INTERSECTS_WITH_EXISTED,
      responseType: EResponseType.badRequestResponse,
    };
  }

  const newAppointment = await appointmentRepository.createAppointment({
    userId: user._id,
    doctorId: doctor._id,
    time: appointmentData.time,
    duration: appointmentData.duration,
  });

  await notificationService.createNotificationsByAppointment(newAppointment);

  return {
    status: true,
    result: newAppointment,
  };
};
