import { CustomError } from "./customError"

export class MissingName extends CustomError {
    constructor() {
        super(422, "Nome do novo usuário faltando")
    }
}

export class MissingEmail extends CustomError {
    constructor() {
        super(422, "Email do novo usuário faltando")
    }
}

export class MissingPassword extends CustomError {
    constructor() {
        super(422, "Senha do novo usuário faltando")
    }
}

export class InvalidEmail extends CustomError {
    constructor() {
        super(422, 'Email no formato inválido, o email precisa ter o formato "nome@email.com".')
    }
}

export class InvalidPassword extends CustomError {
    constructor() {
        super(409, "Senha Inválida, a senha deve possuir no mínimo 8 caracteres contendo ao menos um números, uma letra maíuscula, uma letra minúsculas e um caracter especial(!@#$%&).")
    }
}

export class EmailAlreadyExists extends CustomError{
    constructor() {
        super(409, "Email já existente no banco de dados")
    }
}