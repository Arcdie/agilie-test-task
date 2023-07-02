import { Request, Response } from 'express';

import { validate } from '../libs/dtoValidator.lib';

import {
  dynamicResponse,
  successResponse,
  badRequestResponse,
} from '../libs/expressResponses.lib';

import * as doctorService from '../services/doctor.service';

import { EErrorCode } from '../interfaces/errorCode.enum';
import { ESpeciality } from '../interfaces/speciality.enum';

import { CreateDoctorDto } from './dto/createDoctor.dto';

export const getDoctors = async (req: Request, res: Response) => {
  const { speciality } : { speciality?: ESpeciality } = req.query;

  if (speciality && !Object.values(ESpeciality).includes(speciality)) {
    return badRequestResponse(res, EErrorCode.INVALID_SPECIALITY);
  }

  const result = await doctorService.getDoctors(req.query);

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};

export const createDoctor = async (req: { body: CreateDoctorDto }, res: Response) => {
  const errors = await validate(req.body, CreateDoctorDto);

  if (errors) {
    return badRequestResponse(res, errors);
  }

  const result = await doctorService.createDoctor(req.body);

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};
