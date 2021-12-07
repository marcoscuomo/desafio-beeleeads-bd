import { getRepository, Repository } from "typeorm";

import { ICustomerRepository } from "@modules/customers/repositories/ICustomerRepository";
import { Customer } from "../entities/Customer";
import { ISearchCustomerDTO } from "@modules/customers/dtos/ISearchCustomerDTO";
import { ICreateCustomerDTO } from "@modules/customers/dtos/ICreateDTO";
import { IUpdateCustomerDTO } from "@modules/customers/dtos/IUpdateCustomerDTO";

class CustomerRepository implements ICustomerRepository {

  private repository: Repository<Customer>;

  constructor() {
    this.repository = getRepository(Customer);
  }
  
  async create({ nome, email, dataNascimento, sexo, telefone }: ICreateCustomerDTO): Promise<Customer> {
    const customer = this.repository.create({
      nome,
      email,
      dataNascimento,
      sexo,
      telefone
    });

    this.repository.save(customer);

    return customer;
  }

  async findById(id: string): Promise<Customer> {
    return await this.repository.findOne({ id });
  }
  
  async listCustomers(): Promise<Customer[]> {
    return await this.repository.find({
      where: {active: true, deleted: false}
    });
  }
  
  async findByName(nome: string): Promise<Customer[]> {
    return await this.repository.find({ nome });
  }
  
  async findByEmail(email: string): Promise<Customer> {
    return await this.repository.findOne({ email });
  }
  
  async updateCustomer({ id, nome, email, dataNascimento, sexo, telefone }: IUpdateCustomerDTO): Promise<void> {
    await this.repository
    .createQueryBuilder()
    .update(Customer)
    .set({
      nome,
      email,
      dataNascimento,
      sexo,
      telefone
    })
    .where("id = :id")
    .setParameters({id})
    .execute();
  }
  
  async deleteCustomer(id: string): Promise<void> {
    await this.repository
    .createQueryBuilder()
    .update(Customer)
    .set({
      deleted: true,
      active: false,
    })
    .where("id = :id")
    .setParameters({id})
    .execute();
  }

  async findCustomer({ id, nome, email, dataNascimento, sexo, telefone }: ISearchCustomerDTO): Promise<Customer[]> {
    const queryCustomer = this.repository
    .createQueryBuilder("c")
    .where("c.deleted = :deleted")
    .setParameters({deleted: false})
    .andWhere("c.active = :active")
    .setParameters({active: true});

    if(id) {
      queryCustomer.andWhere("c.id = :id")
      .setParameters({ id })
    }

    if(nome) {
      queryCustomer.andWhere("c.nome like :nome")
      .setParameters({ nome: `%${nome}%` })
    }

    if(email) {
      queryCustomer.andWhere("c.mail = :email")
      .setParameters({ email })
    }

    if(dataNascimento) {
      queryCustomer.andWhere("c.dataNascimento = :dataNascimento")
      .setParameters({ dataNascimento })
    }

    if(sexo) {
      queryCustomer.andWhere("c.sexo = :sexo")
      .setParameters({ sexo })
    }

    if(telefone) {
      queryCustomer.andWhere("c.telefone like :telefone")
      .setParameters({ telefone: `%${telefone}%` })
    }

    return await queryCustomer.getMany();

  }

}

export { CustomerRepository }