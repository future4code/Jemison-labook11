import { CustomError } from "./customError";

export class MissingPostId extends CustomError {
    constructor() {
        super(422, "Id do post faltando")
    }
}

export class InvalidPostId extends CustomError {
    constructor() {
        super(409, "Post não encontrado no banco de dados.")
    }
}

export class LikeAlreadyExists extends CustomError {
    constructor() {
        super(409, "Você já deu Like neste Post.")
    }
}

export class NonexistentLike extends CustomError {
    constructor() {
        super(404, "Não foi possível deletar o like, porque você não possui like neste post.")
    }
}