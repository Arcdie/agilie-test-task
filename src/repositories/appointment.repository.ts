import { Types } from 'mongoose';

import Appointment from '../models/appointment.model';

import { IDoctor } from '../interfaces/entities/doctor.interface'
import { IAppointment, IAppointmentModel } from '../interfaces/entities/appointment.interface'

export const createAppointment = async (appointment: Omit<IAppointment, '_id' | 'createdAt' | 'updatedAt'>) => {
  const newAppointment = new Appointment(appointment).save();
  return (await newAppointment)._doc;
};

export const findManyByDoctor = async (doctor: IDoctor) =>
  unwrapMany(await Appointment.find({ doctorId: doctor._id }).exec());

export const findManyById = async (ids: string[] | Types.ObjectId[]) =>
  unwrapMany(await Appointment.find({ _id: { $in: ids } }).exec());

const unwrap = (entity: IAppointmentModel | null) => entity?._doc;
const unwrapMany = (entities: IAppointmentModel[]) => entities.map(e => e._doc);
