import { UserClass } from "./userClass"

export interface UserControllerInputDTO{
    name:string,
    email:string,
    password:string
}

export interface CreationUserReturnDTO{
    message:string
    user:UserClass
    token:string
}