import { CustomError } from "./customError";

export class MissingPostId extends CustomError {
    constructor() {
        super(422, "Id do post faltando")
    }
}

export class MissingComment extends CustomError {
    constructor() {
        super(422, "Comentátio para o post faltando")
    }
}

export class InvalidPostId extends CustomError {
    constructor() {
        super(409, "Post não encontrado no banco de dados.")
    }
}