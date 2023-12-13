import { Request } from 'express';

import { Res } from '@type/express';
import { AppDataSource } from '../../../typeorm.config';
import { HttpCode } from '@enums/index';
import { Medicine } from '@database/entities/medicine.entity';

const findMedicines = async (req: Request, res: Res) => {
  const limit = +req.query.limit || 20;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;
  const medicineRepo = AppDataSource.getRepository(Medicine);

  const [medicines, count] = await medicineRepo.findAndCount({
    skip: skip,
    take: limit,
    order: { id: 'DESC' },
  });

  return res.status(HttpCode.OK).json({
    data: medicines,
    totalUser: count,
    paginate: {
      pageIndex: page,
      totalPage: Math.ceil(count / limit),
    },
  });
};

const findMedicine = async (req: Request, res: Res) => {
  const medicineId = req.params.medicineId;
  const medicineRepo = AppDataSource.getRepository(Medicine);

  const medicine = await medicineRepo.findOne({
    where: {
      id: +medicineId,
    },
  });

  if (!medicine)
    return res
      .status(HttpCode.BadRequest)
      .json({ error: 'Medicine not found' });

  return res.status(HttpCode.OK).json(medicine);
};

const createMedicine = async (req: Request, res: Res) => {
  delete req.body.user;
  const medicineRepo = AppDataSource.getRepository(Medicine);
  const newMedicine = await medicineRepo.save({
    ...req.body,
  });

  return res.status(HttpCode.OK).json(newMedicine);
};

export default {
  createMedicine,
  findMedicines,
  findMedicine,
};
