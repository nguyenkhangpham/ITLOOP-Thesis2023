import { Request } from 'express';

import { Res } from '@type/express';
import { AppDataSource } from '../../../typeorm.config';
import { HttpCode } from '@enums/index';
import { MedicalHistory } from '@database/entities/medical-history.entity';
import { Order } from '@database/entities/order.entity';
import { IsNull } from 'typeorm';

const findMedicalHistories = async (req: Request, res: Res) => {
  const { patientId } = req.query;
  const limit = +req.query.limit || 20;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;
  const medicalHistoryRepo = AppDataSource.getRepository(MedicalHistory);

  const [medicalHistories, count] = await medicalHistoryRepo.findAndCount({
    where: { patientId: +patientId || undefined },
    skip: skip,
    take: limit,
    order: { id: 'DESC' },
  });

  return res.status(HttpCode.OK).json({
    data: medicalHistories,
    totalUser: count,
    paginate: {
      pageIndex: page,
      totalPage: Math.ceil(count / limit),
    },
  });
};

const findMedicalHistory = async (req: Request, res: Res) => {
  const medicalHistoryId = req.params.medicalHistoryId;
  const medicalHistoryRepo = AppDataSource.getRepository(MedicalHistory);

  const medicalHistory = await medicalHistoryRepo.findOne({
    where: {
      id: +medicalHistoryId,
    },
  });

  if (!medicalHistory)
    return res
      .status(HttpCode.BadRequest)
      .json({ error: 'MedicalHistory not found' });

  return res.status(HttpCode.OK).json(medicalHistory);
};

const createMedicalHistory = async (req: Request, res: Res) => {
  delete req.body.user;
  const MedicalHistoryRepo = AppDataSource.getRepository(MedicalHistory);
  const newMedicalHistory = await MedicalHistoryRepo.save({
    ...req.body,
  });

  return res.status(HttpCode.OK).json(newMedicalHistory);
};

const orderMedicine = async (req: Request, res: Res) => {
  const data = req.body.orders;
  const OrderRepo = AppDataSource.getRepository(Order);

  if (!data || data?.length <= 0)
    return res.status(HttpCode.BadRequest).json('Data invalid');

  const orders = await OrderRepo.save(data);

  return res.status(HttpCode.OK).json(orders);
};

const findOrders = async (req: Request, res: Res) => {
  const { medicalHistoryId } = req.query;
  console.log(medicalHistoryId);
  const limit = +req.query.limit || 20;
  const page = +req.query.page || 1;
  const skip = (page - 1) * limit;
  const OrderRepo = AppDataSource.getRepository(Order);

  const [medicalHistories, count] = await OrderRepo.findAndCount({
    where: {
      medicalHistoryId: +medicalHistoryId,
      deletedAt: IsNull(),
    },
    relations: { medicine: true },
    skip: skip,
    take: limit,
    order: { id: 'DESC' },
  });

  return res.status(HttpCode.OK).json({
    data: medicalHistories,
    totalUser: count,
    paginate: {
      pageIndex: page,
      totalPage: Math.ceil(count / limit),
    },
  });
};

export default {
  findMedicalHistories,
  findMedicalHistory,
  createMedicalHistory,
  orderMedicine,
  findOrders,
};
