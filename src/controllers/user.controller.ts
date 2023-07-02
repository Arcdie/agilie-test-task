import { Request, Response } from 'express';

import { validate } from '../libs/dtoValidator.lib';

import {
  dynamicResponse,
  successResponse,
  badRequestResponse,
} from '../libs/expressResponses.lib';

import * as userService from '../services/user.service';

import { CreateUserDto } from './dto/createUser.dto';

export const getUsers = async (req: Request, res: Response) => {
  const result = await userService.getUsers();

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};

export const createUser = async (req: { body: CreateUserDto }, res: Response) => {
  const errors = await validate(req.body, CreateUserDto);

  if (errors) {
    return badRequestResponse(res, errors);
  }

  const result = await userService.createUser(req.body);

  if (!result.status) {
    return dynamicResponse(result.responseType)(res, result.message);
  }

  return successResponse(res, result);
};
