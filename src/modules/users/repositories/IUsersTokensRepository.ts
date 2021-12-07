import { ICreateUsersTokensDTO } from "../dtos/ICreateUsersTokensDTO";
import { UsersTokens } from "../infra/typeorm/entities/UsersTokens";

interface IUsersTokensRepository {
  create({expiresDate, refreshToken, userId}: ICreateUsersTokensDTO): Promise<UsersTokens>;
  findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UsersTokens>
  deleteById(id: string): Promise<void>
  findByRefreshToken(refreshToken: string): Promise<UsersTokens>
}

export { IUsersTokensRepository }