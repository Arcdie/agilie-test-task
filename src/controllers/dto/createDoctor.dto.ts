import { Type } from 'class-transformer';
import { IsArray, IsNumber, IsEnum, IsNotEmpty, IsObject, IsString, ValidateNested } from 'class-validator';

import { AbstractDto } from './abstract.dto';

import { ESpeciality } from '../../interfaces/speciality.enum';
import { IDoctorTemplate, IWorkingShift } from '../../interfaces/entities/doctor.interface';

export class WorkingShiftDto implements IWorkingShift {
  @IsNumber()
  @IsNotEmpty()
  from: number;

  @IsNumber()
  @IsNotEmpty()
  to: number;
};

export class WeekDaysDto {
  @IsArray()
  @Type(() => WorkingShiftDto)
  @ValidateNested({ each: true })
  Monday: WorkingShiftDto[];

  @IsArray()
  @Type(() => WorkingShiftDto)
  @ValidateNested({ each: true })
  Tuesday: WorkingShiftDto[];

  @IsArray()
  @Type(() => WorkingShiftDto)
  @ValidateNested({ each: true })
  Wednesday: WorkingShiftDto[];

  @IsArray()
  @Type(() => WorkingShiftDto)
  @ValidateNested({ each: true })
  Thursday: WorkingShiftDto[];

  @IsArray()
  @Type(() => WorkingShiftDto)
  @ValidateNested({ each: true })
  Friday: WorkingShiftDto[];

  @IsArray()
  @Type(() => WorkingShiftDto)
  @ValidateNested({ each: true })
  Saturday: WorkingShiftDto[];

  @IsArray()
  @Type(() => WorkingShiftDto)
  @ValidateNested({ each: true })
  Sunday: WorkingShiftDto[];
}

export class CreateDoctorDto extends AbstractDto implements IDoctorTemplate {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ESpeciality)
  @IsNotEmpty()
  speciality: ESpeciality;

  @IsObject()
  @Type(() => WeekDaysDto)
  @ValidateNested()
  working_hours: WeekDaysDto;
}
