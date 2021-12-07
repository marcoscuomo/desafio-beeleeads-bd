import { Request, Response } from 'express';
import * as yup from 'yup';
import { container } from 'tsyringe';

import { messages } from '@utils/messages/messages_PT-br';
import { CreateCustomerUseCase } from './CreateCustomerUseCase';
import { AppError } from '@shared/errors/AppErrors';


class CreateCustomerController {

  async handle( request: Request, response: Response ) {
  
    try {
      const { nome, email, sexo, telefone, dataNascimento } = request.body;
      const phoneRegExp = /^[1-9]{2}[0-9]?[0-9]{4}[0-9]{4}$/;
      const dateRegExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
      const sexoRegExp = /[mf]/i;

      const schema = yup.object().shape({      
        nome: yup.string()
          .required(messages.validation.CampoNomeObrigatorio)
          .min(2, messages.validation.CampoNomeMinimo),
        email: yup.string()
          .required(messages.validation.CampoEmailObrigatorio)
          .email(messages.validation.CampoEmailNaoValido),
        sexo: yup.string()
          .required(messages.validation.campoSexoObrigatorio)
          .matches(sexoRegExp, messages.validation.campoSexoInvalido),
        telefone: yup.string()
          .required(messages.validation.campoTelefone)
          .matches(phoneRegExp, messages.validation.campoTelefoneInvalido),
        dataNascimento: yup.string()
        .required(messages.validation.campoDataNascimento)
        .matches(dateRegExp, messages.validation.campoDataNascimentoInvalido),
      }); 

      await schema.validate({ nome, email, sexo, telefone, dataNascimento });

      const createCutomerUseCase = container.resolve(CreateCustomerUseCase);
      const customer = await createCutomerUseCase.execute({ nome, email, sexo, telefone, dataNascimento });

      return response.status(201).json(customer);
      
    } catch(err) {  
      if(err instanceof yup.ValidationError){
        response.status(401).json({errors: err.errors});
      }

      throw new AppError(err.message);
    }   
  }
}

export { CreateCustomerController }