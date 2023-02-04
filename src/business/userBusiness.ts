import { Authenticator } from './../services/authenticator';
import { UserClass } from './../model/userClass';
import { HashManager } from './../services/hashManager';
import { IdGenerator } from './../services/idGenerator';
import { ValidatePassword } from './../services/validatePassword';
import { ValidateEmail } from './../services/validateEmail';
import { CustomError } from '../error/customError';
import { UserControllerInputDTO, CreationUserReturnDTO } from '../model/userDTOs';
import { UserRepository } from './userRepository';
import * as err from '../error/userCustomError'



export class UserBusiness {

    constructor(private userDatabase: UserRepository) { }


    public createUser = async (input: UserControllerInputDTO): Promise<CreationUserReturnDTO> => {

        try {
            if (!input.name) {
                throw new err.MissingName()
            }
            if (!input.email) {
                throw new err.MissingEmail()
            }
            if (!input.password) {
                throw new err.MissingPassword
            }

            const isEmailValid = ValidateEmail(input.email)
            if (!isEmailValid) {
                throw new err.InvalidEmail()
            }

            const isPasswordValid = ValidatePassword(input.password)
            if (!isPasswordValid) {
                throw new err.InvalidPassword()
            }

            const emailExists = await this.userDatabase.emailExists(input.email)
                 
            if (emailExists) {
                throw new err.EmailAlreadyExists()
            }else{
            const idGenerator = new IdGenerator()
            const hashManager = new HashManager()

            const authenticator = new Authenticator()

            const id: string = idGenerator.generateId()
            const hashPassord: string = await hashManager.generateHash(input.password)

            const newUser = new UserClass(
                id,
                input.name,
                input.email,
                hashPassord
            )
            await this.userDatabase.insertUser(newUser)

            const token = authenticator.generateToken({ id })

            return { message: 'Usuário criado com sucesso', user: newUser, token: token }
            }
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}


