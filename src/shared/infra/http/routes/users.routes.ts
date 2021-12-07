import { Router } from 'express'

import { CreateUserController } from '@modules/users/useCases/createUser/CreateUserController';
import { AuthenticationUserController } from '@modules/users/useCases/authenticationUser/AuthenticationUserController';
import { RefreshTokenController } from '@modules/users/useCases/refreshToken/RefreshTokenController';

const userRouter = Router();

const createUserController = new CreateUserController();
const authenticationUserControler = new AuthenticationUserController();
const refreshTokenController = new RefreshTokenController();

userRouter.post('/', createUserController.handle);
userRouter.post('/auth', authenticationUserControler.handle);
userRouter.post('/refresh-token', refreshTokenController.handle);

export { userRouter };