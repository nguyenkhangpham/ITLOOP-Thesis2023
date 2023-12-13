import express from 'express';
import authController from '@controllers/auth/auth.controller';
import { authenMiddleware } from '@middlewares/authen.middelware';
import { authoMiddleware } from '@middlewares/autho.middelware';
import { Role } from '@enums/index';

const router = express.Router();

router.post('/login', authController.login);
router.post(
  '/register',
  authenMiddleware,
  authoMiddleware([Role.doctor]),
  authController.register,
);

export default router;
