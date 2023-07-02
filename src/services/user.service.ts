import * as userRepository from '../repositories/user.repository';

import { EErrorCode } from '../interfaces/errorCode.enum';
import { EResponseType } from '../interfaces/responseType.enum';
import { IUser } from '../interfaces/entities/user.interface';
import { IFail, ISuccess } from '../interfaces/result.interface';

import { CreateUserDto } from '../controllers/dto/createUser.dto';

export const getUsers = async (searchOptions: {} = {}): Promise<IFail | ISuccess<IUser[]>> => {
  const users = await userRepository.findManyBy(searchOptions);

  return {
    status: true,
    result: users,
  };
};

export const createUser = async (userData: CreateUserDto): Promise<IFail | ISuccess<IUser>> => {
  const existedUser = await userRepository.findOneByPhone(userData.phone);

  if (existedUser) {
    return {
      status: false,
      message: EErrorCode.EXIST_USER_WITH_PHONE,
      responseType: EResponseType.badRequestResponse,
    };
  }

  const newUser = await userRepository.createUser(userData);

  return {
    status: true,
    result: newUser,
  };
};
