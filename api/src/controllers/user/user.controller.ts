import { Request } from 'express';
import { IsNull } from 'typeorm';

import { Res } from '@type/express';
import { AppDataSource } from '../../../typeorm.config';
import { HttpCode } from '@enums/index';
import { User } from '@database/entities/user.entity';

const findUsers = async (req: Request, res: Res) => {
  try {
    const { userId, fullName, roleId, email } = req.query;

    const limit = +req.query.limit || 20;
    const page = +req.query.page || 1;
    const skip = (page - 1) * limit;

    const userRepo = AppDataSource.getRepository(User);
    const query = userRepo
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.role', 'role')
      .where('user.deletedAt is null');

    if (userId) {
      query.andWhere('user.id = :userId', { userId });
    }

    if (roleId) {
      query.andWhere('user.roleId = :roleId', { roleId });
    }

    if (fullName) {
      query.andWhere('user.fullName like concat("%",:fullName,"%")', {
        fullName,
      });
    }

    if (email) {
      query.andWhere('user.email like concat("%",:email,"%")', {
        email,
      });
    }

    const [data, count] = await query
      .take(limit)
      .skip(skip)
      .orderBy('user.id', 'DESC')
      .getManyAndCount();

    return res.status(HttpCode.OK).json({
      data: data,
      totalUser: count,
      paginate: {
        pageIndex: page,
        totalPage: Math.ceil(count / limit),
      },
    });
  } catch (error: any) {
    return res
      .status(HttpCode.InternalServerError)
      .json({ error: error.message });
  }
};

const findUser = async (req: Request, res: Res) => {
  try {
    const userRepo = AppDataSource.getRepository(User);
    const userId = req.body.user.id;

    const user = await userRepo.findOne({
      relations: { role: true },
      where: { id: userId, deletedAt: IsNull() },
    });

    if (!user) {
      return res.status(HttpCode.BadRequest).json({
        error: res.t('user_notfound'),
      });
    }
    delete user.password;

    return res.status(HttpCode.OK).json(user);
  } catch (error) {
    return res.status(HttpCode.InternalServerError).json({ error });
  }
};

export default {
  findUsers,
  findUser,
};
