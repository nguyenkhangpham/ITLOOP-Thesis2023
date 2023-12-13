import { Request } from 'express';
import { IsNull } from 'typeorm';

import validateFunc from '@helpers/validate-request-body';
import { Res } from '@type/express';
import { AppDataSource } from '../../../typeorm.config';
import { HttpCode } from '@enums/index';
import { encoded } from '@helpers/jwt-func';
import { comparePw, hashPw } from '@helpers/bcrypt-func';
import { User } from '@database/entities/user.entity';
import { LoginDto } from '@dto/auth/login.dto';
import { RegisterDto } from '@dto/auth/register.dto';

const login = async (req: Request, res: Res) => {
  try {
    const result = await validateFunc(LoginDto, req.body);
    if (!result.success) {
      return res.status(HttpCode.BadRequest).json({ error: result.error });
    }

    const userRepo = AppDataSource.getRepository(User);
    const data: LoginDto = req.body;
    const { email, password } = data;

    const user = await userRepo.findOne({
      relations: { role: true },
      where: { email, deletedAt: IsNull() },
    });
    const checkPw = await comparePw(password, user?.password ?? '');

    if (!user || !checkPw) {
      return res.status(HttpCode.BadRequest).json({
        error: res.t('email_password_incorrect'),
      });
    }

    delete user.password;

    const jwtData = await encoded({
      id: user.id,
      email: user.email,
    });

    return res.status(HttpCode.OK).json({
      auth: jwtData,
      user: user,
    });
  } catch (error) {
    return res.status(HttpCode.InternalServerError).json({ error });
  }
};

const register = async (req: Request, res: Res) => {
  try {
    const result = await validateFunc(RegisterDto, req.body);
    if (!result.success) {
      return res.status(HttpCode.BadRequest).json({ error: result.error });
    }

    const userRepo = AppDataSource.getRepository(User);
    const data: RegisterDto = result.data;
    const { email, password } = data;

    const user = await userRepo.findOneBy({ email, deletedAt: IsNull() });

    if (user) {
      return res.status(HttpCode.BadRequest).json({
        error: res.t('user_already_exists'),
      });
    }

    data.password = await hashPw(password);
    const newUser = await AppDataSource.getRepository(User).save({
      ...data,
    });

    return res.status(HttpCode.OK).json(newUser);
  } catch (error) {
    return res.status(HttpCode.InternalServerError).json({ error });
  }
};

export default {
  login,
  register,
};
