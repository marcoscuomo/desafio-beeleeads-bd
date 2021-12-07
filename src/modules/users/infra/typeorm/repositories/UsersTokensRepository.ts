import { getRepository, Repository } from "typeorm";

import { ICreateUsersTokensDTO } from "@modules/users/dtos/ICreateUsersTokensDTO";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { UsersTokens } from "../entities/UsersTokens";

class UsersTokensRepository implements IUsersTokensRepository {
 
  private repository: Repository<UsersTokens>;

  constructor() {
    this.repository = getRepository(UsersTokens);
  }
  
  async create({ expiresDate, refreshToken, userId }: ICreateUsersTokensDTO): Promise<UsersTokens> {
       
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId
    })

    await this.repository.save(userToken);

    return userToken;
  }
  
  async findByUserIdAndRefreshToken(userId: string, refreshToken: string): Promise<UsersTokens> {
    const userToken = await this.repository.findOne({
      userId, refreshToken
    })

    return userToken
  }
  
  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id)
  }
  
  async findByRefreshToken(refreshToken: string): Promise<UsersTokens> {
    return await this.repository.findOne({ refreshToken })
  }
}

export { UsersTokensRepository }