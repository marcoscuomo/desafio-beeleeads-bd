import { Request, Response } from 'express';
import { container } from 'tsyringe';
import * as yup from 'yup';

import { UpdateCustomerUseCase } from './UpdateCustomerUseCase';
import { AppError } from '@shared/errors/AppErrors';
import { messages } from '@utils/messages/messages_PT-br';

class UpdateCustomerController {

  async handle( request: Request, response: Response ) {
    
    const { 
      id,
      nome, 
      email,
      telefone,
      sexo,
      dataNascimento  
    } = request.body;

    const phoneRegExp = /^[1-9]{2}[0-9]?[0-9]{4}[0-9]{4}$/;
    const dateRegExp = /^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/;
    const sexoRegExp = /[mf]/i;

    try {

      const schema = yup.object().shape({  
        id: yup.string()
        .min(1, messages.validation.campoIdInvalido),    
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

      const updateCustomerUseCase = container.resolve(UpdateCustomerUseCase);

      await updateCustomerUseCase.execute({ id, nome, email, telefone, sexo, dataNascimento });

      return response.status(204).send();

    } catch(err) {
      if(err instanceof yup.ValidationError){
        response.status(401).json({errors: err.errors});
      }

      throw new AppError(err.message);
    }
  } 

}

export { UpdateCustomerController }