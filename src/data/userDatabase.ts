import { CustomError } from './../error/customError';
import { UserClass } from '../model/userClass';
import { TABLE_USERS } from './tableNames';
import { BaseDatabase } from "./baseDatabase";
import { UserReposytory } from '../business/userRepository';


export class UserDatabase extends BaseDatabase implements UserReposytory {

    TABLE_NAME = TABLE_USERS

    public insertUser = async (user: UserClass) => {
        try {

            await UserDatabase.connection(this.TABLE_NAME).insert(user)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    public emailExists = async (email: string) => {
        try {

            return await UserDatabase.connection(this.TABLE_NAME).where('email', email)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

}

