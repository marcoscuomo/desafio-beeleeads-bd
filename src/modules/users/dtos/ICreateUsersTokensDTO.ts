interface ICreateUsersTokensDTO {
  userId: string;
  refreshToken: string;
  expiresDate: Date;
}

export { ICreateUsersTokensDTO }