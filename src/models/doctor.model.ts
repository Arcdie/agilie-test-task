import mongoose from 'mongoose';

import { ESpeciality } from '../interfaces/speciality.enum';
import { IDoctor, IDoctorModel } from '../interfaces/entities/doctor.interface';

const modelSchema: Record<keyof Omit<IDoctor, '_id'>, any> = {
  name: {
    type: String,
    required: true,
  },

  speciality: {
    type: String,
    enum: ESpeciality,
    required: true,
  },

  /*
    Idea is using number seconds for calclating period of a day.
    0 -> 00:00, 3600 -> 01:00, etc
  */
  working_hours: {
    Monday: [{ from: Number, to: Number }],
    Tuesday: [{ from: Number, to: Number }],
    Wednesday: [{ from: Number, to: Number }],
    Thursday: [{ from: Number, to: Number }],
    Friday: [{ from: Number, to: Number }],
    Saturday: [{ from: Number, to: Number }],
    Sunday: [{ from: Number, to: Number }],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: Date,
};

const Doctor = new mongoose.Schema<IDoctorModel>(modelSchema, { versionKey: false });
export default mongoose.model<IDoctorModel>('Doctor', Doctor, 'doctors');
