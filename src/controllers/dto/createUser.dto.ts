import { IsNotEmpty, IsString } from 'class-validator';

import { AbstractDto } from './abstract.dto';

import { IUserTemplate } from '../../interfaces/entities/user.interface';

export class CreateUserDto extends AbstractDto implements IUserTemplate {
  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}
