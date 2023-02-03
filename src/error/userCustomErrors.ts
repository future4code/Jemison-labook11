import { CustomError } from "./customError"

export class MissingName extends CustomError{ 
    constructor(){
        super(422, "Nome do novo usuário faltando")
    }
}

export class MissingEmail extends CustomError{ 
    constructor(){
        super(422, "Email do novo usuário faltando")
    }
}

export class MissingPassword extends CustomError{ 
    constructor(){
        super(422, "Senha do novo usuário faltando")
    }
}