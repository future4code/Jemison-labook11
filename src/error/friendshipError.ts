import { CustomError } from "./customError"

export class MissingRecieverID extends CustomError {
    constructor() {
        super(422, "Faltando o id do usuário que vai receber o pedido de amizade.")
    }
}

export class FriendshipAlreadyExists extends CustomError {
    constructor() {
        super(404, "Você já é amigo deste usuário.")
    }
}

export class InvalidFriendId extends CustomError {
    constructor() {
        super(404, "O seu próprio Id não pode ser usado como o Id de um amigo.")
    }
}

export class NonexistentFrined extends CustomError {
    constructor() {
        super(404, "Id do amigo não encontrado no banco de dados.")
    }
}

export class MissingDeleteFriendshipID extends CustomError {
    constructor() {
        super(422, "Faltando o id do usuário para cancelar a amizade.")
    }
}

export class InvalidDeleteFriendId extends CustomError {
    constructor() {
        super(404, "Você não pode utilizar o seu próprio Id para desfazer uma amizade.")
    }
}

export class FriendshipNonexist extends CustomError {
    constructor() {
        super(404, "Você não é amigo deste usuário.")
    }
}

