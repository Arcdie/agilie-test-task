import * as doctorRepository from '../repositories/doctor.repository';

import { ESpeciality } from '../interfaces/speciality.enum';
import { IFail, ISuccess } from '../interfaces/result.interface';
import { IDoctor } from '../interfaces/entities/doctor.interface';

import { CreateDoctorDto, WeekDaysDto } from '../controllers/dto/createDoctor.dto';

export const getDoctors = async (searchOptions: { speciality?: ESpeciality }): Promise<IFail | ISuccess<IDoctor[]>> => {
  const doctors = await doctorRepository.findManyBy(searchOptions);

  return {
    status: true,
    result: doctors,
  };
};

export const createDoctor = async (doctoData: CreateDoctorDto): Promise<IFail | ISuccess<IDoctor>> => {
  const workingHours = validateWorkshifts(doctoData.working_hours);

  const newDoctor = await doctorRepository.createDoctor({
    ...doctoData,
    working_hours: workingHours,
  });

  return {
    status: true,
    result: newDoctor,
  };
};

export const getDoctorWorkshift = (doctor: IDoctor, date: Date = new Date()) => {
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const dayOfWeek = new Date(date).getDay();
  const today = daysOfWeek[dayOfWeek] as keyof WeekDaysDto;
  return doctor.working_hours[today];
};

const validateWorkshifts = (workingHours: WeekDaysDto) => {
  const validWorkingHours: WeekDaysDto = {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };

  Object.keys(workingHours).forEach(key => {
    if (key in validWorkingHours) {
      const k = key as keyof WeekDaysDto;
      const workingShifts = workingHours[k];
      const sorted = workingShifts.sort((a, b) => a.from < b.from ? -1 : 1);
      validWorkingHours[k].push(...sorted.filter(e => e.from < e.to));
    }
  });

  return validWorkingHours;
};
