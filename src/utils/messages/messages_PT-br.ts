const messages = {
  erros: {
    customerExists: 'Cliente já cadastrado',
    customerDoesNotExists: 'Cliente não encontrado',
    emailOrPasswordIncorrect: 'Email ou password está incorreto',
    invalidToken: 'Token inválido',
    noCustomersFound: 'Nenhum cliente encontrado',
    refreshTokenDoesNotExists: 'Refresh token não existe',
    tokenIsMissing: 'Token não encontrado',
    userAlreadyExists: 'Usuário já existe',
    userDoesNotExists: 'Usuário não existe'
  },
  validation: {
    campoDataNascimento: 'Campo dataNascimento é obrigatório',
    campoDataNascimentoInvalido: 'Campo dataNascimento não é válido',
    CampoEmailNaoValido: 'Campo e-mail não é válido',
    CampoEmailObrigatorio: 'Campo e-mail é obrigatório',
    campoIdInvalido: 'Campo id não é válido',
    CampoNomeMinimo: 'Campo nome deve ter no minimo 2 digitos',
    CampoNomeObrigatorio: 'Campo nome é obrigatório',
    CampoSenhaMinimo6Digitos: 'A senha deve ter no minimo 6 digitos',
    campoSexoObrigatorio: 'Campo sexo obrigatorio',
    campoSexoInvalido: 'Campo sexo não é válido',
    campoTelefone: 'Campo telefone obrigatorio',
    campoTelefoneInvalido: 'Campo telefone não é valido',
    campoUserIdObrigatorio: 'Campo User_id é obrigatório'
  }
}

export { messages }
