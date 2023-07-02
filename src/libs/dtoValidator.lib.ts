import * as classValidator from 'class-validator';
import { AbstractDto } from '../controllers/dto/abstract.dto';

export const validate = async <T, S extends typeof AbstractDto>(inputData: T, DtoSchema: S) => {
  const dto = new DtoSchema(inputData);
  const errors = await classValidator.validate(dto);
  return errors.length ? errors : false;
};
