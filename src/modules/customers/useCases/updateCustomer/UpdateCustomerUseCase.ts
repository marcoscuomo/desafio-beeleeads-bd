import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";

interface IRequest {
  id: string;
  nome: string;
  email: string;
  dataNascimento: Date;
  sexo: string;
  telefone: string
}

@injectable()
class UpdateCustomerUseCase {

  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({ id, nome, email, dataNascimento, sexo, telefone }: IRequest) {
    
    const customer = await this.customerRepository.findById(id);
    sexo = sexo.toLocaleLowerCase();

    if(!customer) {
      throw new AppError(messages.erros.customerDoesNotExists, 401);
    }

    await this.customerRepository.updateCustomer({ id, nome, email, dataNascimento, sexo, telefone });
  }
}

export { UpdateCustomerUseCase }