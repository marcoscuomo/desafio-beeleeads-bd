import { Customer } from "@modules/customers/infra/typeorm/entities/Customer";
import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateDTO";
import { ISearchCustomerDTO } from "@modules/customers/dtos/ISearchCustomerDTO";
import { IUpdateCustomerDTO } from "@modules/customers/dtos/IUpdateCustomerDTO";

interface ICustomerRepository {
  create(data: ICreateCustomerDTO): Promise<Customer>;
  findById(id: string): Promise<Customer>;
  listCustomers(): Promise<Customer[]>;
  findByName(nome: string): Promise<Customer[]>;
  findByEmail(email: string): Promise<Customer>;
  updateCustomer(data: IUpdateCustomerDTO): Promise<void>;
  deleteCustomer(id: string): Promise<void>;
  findCustomer(data: ISearchCustomerDTO): Promise<Customer[]>
}

export { ICustomerRepository }