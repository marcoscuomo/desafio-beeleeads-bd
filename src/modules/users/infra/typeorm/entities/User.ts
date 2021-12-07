import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('USER')
class User {
  @PrimaryColumn({
    name: 'USER_ID'
  })
  id: string;

  @Column({
    name: 'USER_NAME'
  })
  name: string;

  @Column({
    name: 'USER_EMAIL'
  })
  email: string;

  @Column({
    name: 'USER_PASSWORD'
  })
  password: string;

  @Column({
    name: 'USER_CREATED_AT'
  })
  createdAt: Date;

  @Column({
    name: 'USER_ACTIVE'
  })
  active: boolean;

  @Column({
    name: 'USER_DELETED'
  })
  deleted: boolean;
}

export { User }