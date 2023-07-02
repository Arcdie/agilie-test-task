import { IsDateString, IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

import constants from '../../config/constants';

import { AbstractDto } from './abstract.dto';

import { IAppointmentTemplate } from '../../interfaces/entities/appointment.interface';

export class CreateAppointmentDto extends AbstractDto implements IAppointmentTemplate {
  @IsMongoId()
  @IsNotEmpty()
  userId: string;

  @IsMongoId()
  @IsNotEmpty()
  doctorId: string;

  @IsDateString()
  @IsNotEmpty()
  time: Date;

  @IsNumber()
  @Min(constants.minAppointmentTime)
  @Max(constants.maxAppointmentTime)
  duration: number;
}
