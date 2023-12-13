import { Request, NextFunction } from 'express';
import { decoded } from '@helpers/jwt-func';
import { AppDataSource } from '../../typeorm.config';
import Logger from '@helpers/logger';
import { User } from '@database/entities/user.entity';
import { HttpCode } from '@enums/index';
import { Res } from '@type/express';

const logger = Logger();
export const authenMiddleware = async (
  req: Request,
  res: Res,
  next: NextFunction,
) => {
  try {
    const authHeader = req.header('Authorization');
    const token: string = (authHeader && authHeader.split(' ')[1]) as string;
    if (!token) {
      return res.status(401).json({
        error: res.t('you_are_not_logged_in'),
      });
    }

    const tokenDecode = await decoded(token);
    if (!tokenDecode) {
      return res.status(HttpCode.Unauthorized).json({
        error: res.t('token_expires'),
      });
    }

    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      relations: { role: true },
      where: { id: tokenDecode.data.id },
    });

    if (user) {
      const userReq = {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        avatar: user.avatar,
        role: user.role.name,
      };
      req.body.user = userReq;
      next();
      return;
    }
  } catch (error: any) {
    logger.error(error.message);
    return res.status(HttpCode.Unauthorized).json({
      error: res.t('token_expires'),
    });
  }
};
