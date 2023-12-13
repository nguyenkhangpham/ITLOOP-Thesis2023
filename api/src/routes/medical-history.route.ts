import express from 'express';
import medicalHistoryController from '@controllers/medical-history/medical-history.controller';
import { authenMiddleware } from '@middlewares/authen.middelware';
import { authoMiddleware } from '@middlewares/autho.middelware';
import { Role } from '@enums/index';

const router = express.Router();

router.get(
  '/order',
  authenMiddleware,
  authoMiddleware([Role.doctor, Role.patient]),
  medicalHistoryController.findOrders,
);

router.get(
  '/:medicalHistoryId',
  authenMiddleware,
  medicalHistoryController.findMedicalHistory,
);

router.get(
  '/',
  authenMiddleware,
  authoMiddleware([Role.doctor, Role.patient]),
  medicalHistoryController.findMedicalHistories,
);

router.post(
  '/order',
  authenMiddleware,
  authoMiddleware([Role.doctor]),
  medicalHistoryController.orderMedicine,
);

router.post(
  '/',
  authenMiddleware,
  authoMiddleware([Role.doctor]),
  medicalHistoryController.createMedicalHistory,
);

export default router;
