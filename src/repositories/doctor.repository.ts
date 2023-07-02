import { Types } from 'mongoose';

import Doctor from '../models/doctor.model';

import { ESpeciality } from '../interfaces/speciality.enum';
import { IDoctor, IDoctorModel } from '../interfaces/entities/doctor.interface';

export const createDoctor = async (user: Omit<IDoctor, '_id' | 'createdAt' | 'updatedAt'>) => {
  const newDoctor = new Doctor(user).save();
  return (await newDoctor)._doc;
};

export const findOneById = async (id: string | Types.ObjectId) =>
  unwrap(await Doctor.findById(id).exec());

export const findManyById = async (ids: string[] | Types.ObjectId[]) =>
  unwrapMany(await Doctor.find({ _id: { $in: ids } }).exec());

export const findManyBy = async (
  options: {
    speciality?: ESpeciality
  } = {},
) => {
  const searchOptions: {
    speciality?: ESpeciality;
  } = {};

  if (options.speciality) {
    searchOptions.speciality = options.speciality;
  }

  const results = await Doctor.find(searchOptions).exec();
  return unwrapMany(results);
}

const unwrap = (entity: IDoctorModel | null) => entity?._doc;
const unwrapMany = (entities: IDoctorModel[]) => entities.map(e => e._doc);
