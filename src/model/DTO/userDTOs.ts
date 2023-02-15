import { UserClass } from "../class/userClass"

export interface UserReturnDTO {
    id: string,
    name: string,
    email: string,
    password: string
}


export interface UserControllerInputDTO {
    name: string,
    email: string,
    password: string
}

export interface CreationUserReturnDTO {
    message: string
    user: UserClass
    token: string
}