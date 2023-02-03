import { CustomError } from "./customError"

export class WrongEmail extends CustomError {
    constructor() {
        super(404, "Email não cadastrado.")
    }
}

export class WrongPassword extends CustomError {
    constructor() {
        super(404, "Password inserido não combina com o banco de dados.")
    }
}