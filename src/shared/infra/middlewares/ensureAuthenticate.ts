import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersTokensRepository } from '@modules/users/infra/typeorm/repositories/UsersTokensRepository';
import { AppError } from '@shared/errors/AppErrors';
import { messages } from '@utils/messages/messages_PT-br';
import auth from '@config/auth';

interface IPayLoad {
  sub: string;
}


async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const authHeader = request.headers.authorization;
  
  if(!authHeader) {
    throw new AppError(messages.erros.tokenIsMissing, 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    
    const { sub: userId } = verify(token, auth.secreat_token) as IPayLoad;

    request.user = { id: userId }

    next();

  } catch(err) {
    throw new AppError(err.message, 401);
  }
}

export { ensureAuthenticate }