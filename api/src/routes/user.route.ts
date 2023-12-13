import express from 'express';
import { Role } from '@enums/index';
import userController from '@controllers/user/user.controller';
import { authenMiddleware } from '@middlewares/authen.middelware';
import { authoMiddleware } from '@middlewares/autho.middelware';

const router = express.Router();

router.get(
  '/',
  authenMiddleware,
  authoMiddleware([Role.doctor]),
  userController.findUsers,
);
router.get('/profile', authenMiddleware, userController.findUser);

export default router;
