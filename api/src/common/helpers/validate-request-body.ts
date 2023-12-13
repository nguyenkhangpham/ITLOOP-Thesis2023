import {
  ClassConstructor,
  ClassTransformOptions,
  plainToClass,
} from 'class-transformer';
import { validate } from 'class-validator';

const validateFunc = async (
  cls: ClassConstructor<any>,
  plain: any[],
  options?: ClassTransformOptions,
) => {
  const createTaskDto: any = plainToClass(cls, plain, options);
  const errors = await validate(createTaskDto);
  if (errors.length > 0) {
    let errMessages = [];
    errors.forEach((e) => {
      errMessages.push(...Object.values(e.constraints));
    });

    errMessages = errMessages.map((errMessage) =>
      errMessage.replaceAll(' ', ' '),
    );

    return { success: false, error: errMessages.join(', ') };
  } else {
    return { success: true, data: createTaskDto };
  }
};

export default validateFunc;
