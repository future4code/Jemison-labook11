import { UserReturnDTO } from '../model/DTO/userDTOs';
import { CustomError } from './../error/customError';
import { UserClass } from '../model/class/userClass';
import { TABLE_USERS } from './tableNames';
import { BaseDatabase } from "./baseDatabase";
import { UserRepository } from '../business/repository/userRepository';


export class UserDatabase extends BaseDatabase implements UserRepository {

    TABLE_NAME = TABLE_USERS

    public insertUser = async (user: UserClass):Promise<void> => {
        try {

            await super.CreateItem(user)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    public emailExists = async (email: string):Promise<UserReturnDTO[]> => {
        try {

           const result = await UserDatabase.connection(this.TABLE_NAME).where('email', email)
           return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    public userExists =async (userId:string):Promise<UserReturnDTO[]> => {
        try {

            const result = await UserDatabase.connection(this.TABLE_NAME).where('id', userId)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

}

