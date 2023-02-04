import { CustomError } from "./customError"

export class MissingPhoto extends CustomError {
    constructor() {
        super(422, "Url da imagem do novo post faltando.")
    }
}

export class MissingDescription extends CustomError {
    constructor() {
        super(422, "Descrição do novo post faltando.")
    }
}

export class MissingType extends CustomError {
    constructor() {
        super(422, "Tipo do novo post faltando.")
    }
}

export class MissingAuthorId extends CustomError {
    constructor() {
        super(422, "Id do autor da nova postagem faltando.")
    }
}

export class InvalidType extends CustomError {
    constructor() {
        super(422, 'O tipo do novo post precisa ser um "event" ou não ser preenchido.')
    }
}