import { UserReturnDTO } from './../model/userDTOs';
import { UserClass } from "../model/userClass";

export interface UserReposytory{

    insertUser(user: UserClass):Promise<void>
    emailExists(email: string):Promise<UserReturnDTO[]>

}