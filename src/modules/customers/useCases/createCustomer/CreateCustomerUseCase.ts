import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";

interface IRequest {
  nome: string;
  email: string;
  sexo: string;
  telefone: string;
  dataNascimento: Date;
}


@injectable()
class CreateCustomerUseCase {
  
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({ nome, email, sexo, telefone, dataNascimento }: IRequest) {
    
    const customerExists = await this.customerRepository.findByEmail(email);
    
    if(customerExists) {
      throw new AppError(messages.erros.customerExists, 401);
    }

    const customer = await this.customerRepository.create({ nome, email, sexo, telefone, dataNascimento });

    return customer;
  }
}

export { CreateCustomerUseCase }