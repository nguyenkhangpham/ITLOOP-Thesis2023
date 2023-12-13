import express, { Request } from 'express';
import { Res } from '@type/express';
import authRoute from './auth.route';
import userRoute from './user.route';
import medicineRoute from './medicine.route';
import medicalHistoryRoute from './medical-history.route';

const rootRouter = express.Router();

rootRouter.get('/', (req: Request, res: Res) => {
  res.send(res.t('hello'));
});
rootRouter.use('/auth', authRoute);
rootRouter.use('/users', userRoute);
rootRouter.use('/medicines', medicineRoute);
rootRouter.use('/medical-history', medicalHistoryRoute);

export default rootRouter;
