import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { User } from "./User";

@Entity('USERS_TOKENS')
class UsersTokens {
  @PrimaryColumn({
    name: 'TOKEN_ID'
  })
  id: string;

  @Column({
    name: 'TOKEN_REFRESH_TOKEN'
  })
  refreshToken: string;

  @Column({
    name: 'TOKEN_USER_ID'
  })
  userId: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'TOKEN_USER_ID' })
  user: User

  @Column({
    name: 'TOKEN_EXPIRES_DATE'
  })
  expiresDate: Date;

  @Column({
    name: 'TOKEN_CREATED_AT'
  })
  createdAt: Date;

  @Column({
    name: 'TOKEN_ACTIVE'
  })
  active: boolean;

  @Column({
    name: 'TOKEN_DELETED'
  })
  deleted: boolean;
}

export { UsersTokens }