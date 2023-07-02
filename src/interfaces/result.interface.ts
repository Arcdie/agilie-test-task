import { EErrorCode } from './errorCode.enum';
import { EResponseType } from './responseType.enum';

export interface IFail {
  status: false;
  responseType: EResponseType;
  message: EErrorCode | string;
};

export interface ISuccess<T> {
  status: true;
  result: T;
};

export type TResult<T> = IFail | ISuccess<T>;
