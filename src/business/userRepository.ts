import { UserReturnDTO } from './../model/userDTOs';
import { UserClass } from "../model/userClass";

export interface UserRepository{

    insertUser(user: UserClass):Promise<void>
    emailExists(email: string):Promise<UserReturnDTO[]>

}