import { HydratedDocument, Types } from 'mongoose';

import { ESpeciality } from '../speciality.enum';

export interface IWorkingShift {
  from: number;
  to: number;
}

export interface IDoctorTemplate {
  name: string;
  speciality: ESpeciality;

  working_hours: {
    Monday: IWorkingShift[];
    Tuesday: IWorkingShift[];
    Wednesday: IWorkingShift[];
    Thursday: IWorkingShift[];
    Friday: IWorkingShift[];
    Saturday: IWorkingShift[];
    Sunday: IWorkingShift[];
  };
};

export interface IDoctor extends IDoctorTemplate {
  _id: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface IDoctorModel extends HydratedDocument<IDoctor> {
  _doc: IDoctor & { _id: Types.ObjectId };
};
