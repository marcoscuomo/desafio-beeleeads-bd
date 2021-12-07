import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";

interface IRequest {
  id?: string;
  nome?: string;
  email?: string;
  sexo?: string;
  telefone?: string;
  dataNascimento?: Date;
}

@injectable()
class FindCustomerUseCase {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute({ id, nome, email, sexo, telefone, dataNascimento }: IRequest) {

    const customer = this.customerRepository.findCustomer({ id, nome, email, sexo, dataNascimento, telefone });

    if(!customer) {
      throw new AppError(messages.erros.noCustomersFound, 404);
    }

    return customer;
  }
}

export { FindCustomerUseCase }