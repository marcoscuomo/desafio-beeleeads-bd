import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";


@injectable()
class DeleteCustomerUseCase {
  
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}
  
  async execute(id: string): Promise<void> {

    const customer = await this.customerRepository.findById(id);
    
    if(!customer) {
      throw new AppError(messages.erros.customerDoesNotExists, 401);
    }

    await this.customerRepository.deleteCustomer(id);
  }

}

export { DeleteCustomerUseCase }