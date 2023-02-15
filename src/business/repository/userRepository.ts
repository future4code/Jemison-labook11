import { UserReturnDTO } from '../../model/DTO/userDTOs';
import { UserClass } from "../../model/class/userClass";

export interface UserRepository{

    insertUser(user: UserClass):Promise<void>
    emailExists(email: string):Promise<UserReturnDTO>
    userExists(userId:string):Promise<UserReturnDTO[]>

}