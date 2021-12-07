import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('CUSTOMER')
class Customer {
  @PrimaryColumn({
    name: 'CUSTOMER_ID'
  })
  id: string;

  @Column({
    name: 'CUSTOMER_NAME'
  })
  nome: string;

  @Column({
    name: 'CUSTOMER_EMAIL'
  })
  email: string

  @Column({
    name: 'CUSTOMER_PHONE'
  })
  telefone: string;

  @Column({
    name: 'CUSTOMER_BIRTH_DATE'
  })
  dataNascimento: Date;

  @Column({
    name: 'CUSTOMER_GENDER'
  })
  sexo: string

  @Column({
    name: 'CUSTOMER_CREATED_AT'
  })
  createdAt: Date;

  @Column({
    name: 'CUSTOMER_ACTIVE'
  })
  active: boolean;

  @Column({
    name: 'CUSTUMER_DELETED'
  })
  deleted: boolean;
}

export { Customer }