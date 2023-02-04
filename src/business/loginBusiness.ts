import { UserClass } from './../model/userClass';
import { Authenticator } from '../services/authenticator';
import { HashManager } from './../services/hashManager';
import { LoginInputDTO } from './../model/loginDTO';
import { UserRepository } from './userRepository';
import * as err from '../error/loginError';
import { CustomError } from '../error/customError';

export class LoginBusiness {
    constructor(private UserDatabase: UserRepository) { }


    public login = async (input: LoginInputDTO) => {

        try {

            let token

            const emailExists = await this.UserDatabase.emailExists(input.email)
   
            if (!emailExists) {
                throw new err.WrongEmail()
            }

            const hashManager = new HashManager()

            const comparePassword: boolean = await hashManager.compareHash(input.password,emailExists.password )
            if (!comparePassword) {
                throw new err.WrongPassword()
            } else {

                const authenticator = new Authenticator()

                 return {token: authenticator.generateToken({ id: emailExists.id })}
                 
                 

            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

}
