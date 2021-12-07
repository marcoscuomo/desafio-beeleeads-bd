import { Router } from 'express';

import { userRouter } from './users.routes';
import { customerRouter } from './customer.routes';

const router = Router();

router.use('/users', userRouter);
router.use('/customer', customerRouter);

export { router };