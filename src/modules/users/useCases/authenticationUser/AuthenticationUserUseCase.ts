import { inject, injectable } from "tsyringe";
import { sign } from "jsonwebtoken";
import { compare } from "bcryptjs";

import { UserRepository } from "@modules/users/infra/typeorm/repositories/UserRepository";
import { IUsersTokensRepository } from "@modules/users/repositories/IUsersTokensRepository";
import { IDateProvider } from "@shared/container/providers/DateProviders/IDateProvider";
import { AppError } from "@shared/errors/AppErrors";
import { messages } from "@utils/messages/messages_PT-br";
import auth from "@config/auth";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string
  }
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticationUserUseCase {

  constructor(
    @inject('UserRepository')
    private userRepository: UserRepository,

    @inject('DayJsProvider')
    private dayProvider: IDateProvider,

    @inject('UsersTokensRepository')
    private usersTokensRepository: IUsersTokensRepository
  ){}

  async execute({email, password}: IRequest): Promise<IResponse> {
    
    const user = await this.userRepository.findByEmail(email);  

    if(!user){
      throw new AppError(messages.erros.emailOrPasswordIncorrect, 401);
    }

    const passwordMach = await compare(password, user.password);

    if (!passwordMach) {
      throw new AppError(messages.erros.emailOrPasswordIncorrect, 401)
    }

    const token = sign({}, auth.secreat_token, {
      subject: user.id.toString(),
      expiresIn: auth.expires_in_token
    });

    const refreshToken = sign({ email }, auth.secreate_refresh_token, {
      subject: user.id.toString(),
      expiresIn: auth.expires_in_refresh_token
    });

    const refreshTokenExpiresDate = this.dayProvider.addDays(auth.expires_refresh_token_days);

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate
    });

    const returnToken: IResponse = {
      user: {
        name: user.name,
        email: user.email
      },
      token,
      refreshToken
    }

    return returnToken;
  }
}

export { AuthenticationUserUseCase }