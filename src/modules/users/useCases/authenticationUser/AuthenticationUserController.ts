import { Request, Response } from 'express';
import * as yup from 'yup';
import { container } from 'tsyringe';

import { messages } from '@utils/messages/messages_PT-br';
import { AuthenticationUserUseCase } from './AuthenticationUserUseCase';
import { AppError } from '@shared/errors/AppErrors';

class AuthenticationUserController {
  
  async handle(request: Request, response: Response) {
    try {
      
      const { email, password } = request.body;

      const schema = yup.object().shape({      
        email: yup.string().email(messages.validation.CampoEmailNaoValido).required(messages.validation.CampoEmailObrigatorio),
        password: yup.string().required().min(6, messages.validation.CampoSenhaMinimo6Digitos)
      });

      await schema.validate(request.body);

      const authenticationUserUseCase = container.resolve(AuthenticationUserUseCase);
      
      const token = await authenticationUserUseCase.execute({ email, password });

      return response.json(token);

    } catch(err) {
      if(err instanceof yup.ValidationError){
        response.status(401).json({errors: err.errors});
      }

      throw new AppError(err.message);
    }
  }
}

export { AuthenticationUserController }