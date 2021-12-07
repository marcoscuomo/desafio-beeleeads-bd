import { inject, injectable } from "tsyringe";
import { sign, verify } from "jsonwebtoken";

import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";
import auth from "@config/auth";


interface IResponse {
  user: {
    name: string;
    email: string
  }
  token: string;
  refreshToken: string;
}

interface IPayLoad {
  sub: string;
}

@injectable()
class RefreshTokenUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,

    @inject('DayJsProvider')
    private dayProvider: IDateProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
    
  ) {}

  async execute(refreshToken: string) {
    
    if(!refreshToken) {
      throw new AppError(messages.erros.invalidToken, 401);
    }
    
    const authCredentials = verify(refreshToken, auth.secreate_refresh_token) as IPayLoad;

    if(!authCredentials) {
      throw new AppError(messages.erros.invalidToken, 401);
    }

    const userRefreshToken = await this.usersTokensRepository.findByRefreshToken(refreshToken);

    if(!userRefreshToken){
      throw new AppError(messages.erros.refreshTokenDoesNotExists, 401);
    }

    const { sub: userId } = authCredentials;

    const user = await this.userRepository.findById(userId);

    if(!user) {
      throw new AppError(messages.erros.userDoesNotExists, 401);
    }
    const { email } = user;

    const token = sign({}, auth.secreat_token, {
      subject: userId.toString(),
      expiresIn: auth.expires_in_token
    });

    const newRefreshToken = sign({ email }, auth.secreate_refresh_token, {
      subject: userId.toString(),
      expiresIn: auth.expires_in_refresh_token
    });

    const refreshTokenExpiresDate = this.dayProvider.addDays(auth.expires_refresh_token_days);

    await this.usersTokensRepository.deleteById(userRefreshToken.id);
    
    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken: newRefreshToken,
      expiresDate: refreshTokenExpiresDate
    });

    const returnToken: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refreshToken: newRefreshToken
    }

    return returnToken;
    

  }
}

export { RefreshTokenUseCase }