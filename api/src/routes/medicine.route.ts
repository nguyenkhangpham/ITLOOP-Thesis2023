import express from 'express';
import medicineController from '@controllers/medicine/medicine.controller';
import { authenMiddleware } from '@middlewares/authen.middelware';
import { authoMiddleware } from '@middlewares/autho.middelware';
import { Role } from '@enums/index';

const router = express.Router();

router.get(
  '/',
  authenMiddleware,
  authoMiddleware([Role.doctor]),
  medicineController.findMedicines,
);

router.get('/:medicineId', authenMiddleware, medicineController.findMedicine);

router.post(
  '/',
  authenMiddleware,
  authoMiddleware([Role.doctor]),
  medicineController.createMedicine,
);

export default router;
