import { CustomError } from "./customError"

export class MissingPhoto extends CustomError {
    constructor() {
        super(422, "Url da imagem do post faltando.")
    }
}

export class MissingDescription extends CustomError {
    constructor() {
        super(422, "Descrição do post faltando.")
    }
}

export class MissingType extends CustomError {
    constructor() {
        super(422, "Tipo do post faltando.")
    }
}

export class MissingAuthorId extends CustomError {
    constructor() {
        super(422, "Id do autor da postagem faltando.")
    }
}

export class InvalidType extends CustomError {
    constructor() {
        super(422, 'O tipo do post precisa ser um "event" ou não ser preenchido.')
    }
}

export class MissingPostId extends CustomError {
    constructor() {
        super(422, 'Id do post faltando.')
    }
}

export class InvalidPostId extends CustomError {
    constructor() {
        super(409, "Post não encontrado no banco de dados.")
    }
}

export class InvalidGetByType extends CustomError {
    constructor() {
        super(422, 'O tipo do post precisa ser "event" ou "normal".')
    }
}