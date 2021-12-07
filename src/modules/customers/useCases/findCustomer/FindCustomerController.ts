import { Request, Response } from 'express';
import * as yup from 'yup';
import { container } from 'tsyringe';

import { messages } from '@utils/messages/messages_PT-br';
import { FindCustomerUseCase } from './FindCustomerUseCase';
import { AppError } from '@shared/errors/AppErrors';

class FindCustomerController {

  async handle(request: Request, response: Response) {

    const { id, nome, email, sexo, telefone, dataNascimento } = request.body;
    const phoneRegExp = /^[1-9]{2}[0-9]?[0-9]{4}[0-9]{4}$/;
    const dateRegExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const sexoRegExp = /[mf]/i;

    try {
      const schema = yup.object().shape({      
        nome: yup.string()
          .min(2, messages.validation.CampoNomeMinimo),
        email: yup.string()
          .email(messages.validation.CampoEmailNaoValido),
        sexo: yup.string()
          .matches(sexoRegExp, messages.validation.campoSexoInvalido),
        telefone: yup.string()
          .matches(phoneRegExp, messages.validation.campoTelefoneInvalido),
        dataNascimento: yup.string()
        .matches(dateRegExp, messages.validation.campoDataNascimentoInvalido),
      }); 

      await schema.validate({ id, nome, email, sexo, telefone, dataNascimento });

      const findCustomerUseCase = container.resolve(FindCustomerUseCase);
      const customer = await findCustomerUseCase.execute({ id, nome, email, sexo, telefone, dataNascimento });

      return response.status(200).json(customer);
      
    } catch(err) {
      if(err instanceof yup.ValidationError){
        response.status(401).json({errors: err.errors});
      }

      throw new AppError(err.message);
    }
  }
}

export { FindCustomerController }