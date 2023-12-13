import { HttpCode } from '@enums/index';
import { Res } from '@type/express';
import { Request, NextFunction } from 'express';

export const authoMiddleware =
  (roles: string[]) => async (req: Request, res: Res, next: NextFunction) => {
    const user: UserRequest = req.body.user;
    const checkRole = roles.includes(user?.role);
    if (checkRole) {
      next();
      return;
    } else {
      return res.status(HttpCode.Forbidden).json({
        error: res.t('not_have_access'),
      });
    }
  };
