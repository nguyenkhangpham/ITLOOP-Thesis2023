import { compareSync, hashSync } from 'bcrypt';
import Logger from '@helpers/logger';

const logger = Logger();

export const comparePw = async (password: string, hashPw: string) => {
  try {
    return await compareSync(password, hashPw);
  } catch (error: any) {
    logger.error(error.message);
  }
};

export const hashPw = async (password: string) => {
  try {
    return await hashSync(password, 10);
  } catch (error: any) {
    logger.error(error.message);
  }
};
