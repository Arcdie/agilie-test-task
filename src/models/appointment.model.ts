import mongoose, { Types } from 'mongoose';

import { IAppointment, IAppointmentModel } from '../interfaces/entities/appointment.interface';

const modelSchema: Record<keyof Omit<IAppointment, '_id'>, any> = {
  userId: {
    type: Types.ObjectId,
    required: true,
  },

  doctorId: {
    type: Types.ObjectId,
    required: true,
  },

  time: {
    type: Date,
    required: true,
  },

  duration: {
    type: Number,
    required: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
};

const Appointment = new mongoose.Schema<IAppointmentModel>(modelSchema, { versionKey: false });
export default mongoose.model<IAppointmentModel>('Appointment', Appointment, 'appointments');
