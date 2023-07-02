import { Response } from 'express';

import { validate } from '../libs/dtoValidator.lib';

import {
  dynamicResponse,
  successResponse,
  badRequestResponse,
} from '../libs/expressResponses.lib';

import * as appointmentService from '../services/appointment.service';

import { CreateAppointmentDto } from './dto/createAppointment.dto';

export const createAppointment = async (req: { body: CreateAppointmentDto }, res: Response) => {
  const errors = await validate(req.body, CreateAppointmentDto);

  if (errors) {
    return badRequestResponse(res, errors);
  }

  const result = await appointmentService.createAppointment(req.body);

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};
