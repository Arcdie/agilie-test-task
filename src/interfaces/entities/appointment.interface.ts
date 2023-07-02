import { HydratedDocument, Types } from 'mongoose';

export interface IAppointmentTemplate {
  time: Date;
  duration: number;
};

export interface IAppointment extends IAppointmentTemplate {
  _id: string;
  userId: string;
  doctorId: string;

  createdAt: Date;
  updatedAt: Date;
};

export interface IAppointmentModel extends HydratedDocument<IAppointment> {
  _doc: IAppointment & { _id: Types.ObjectId };
};
