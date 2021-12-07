import { inject, injectable } from "tsyringe";

import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";

@injectable()
class ListCustomersUseCase {
  
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository
  ) {}

  async execute(): Promise<Customer[]> {
    return await this.customerRepository.listCustomers();
  }

}

export { ListCustomersUseCase }