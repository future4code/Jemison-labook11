import * as err from '../error/userCustomErrors'
import { CustomError } from '../error/customError';
import { UserControllerInputDTO, CreationUserReturnDTO } from '../model/userDTOs';
import { UserReposytory } from './userRepository';


export class UserBusiness {

    constructor(private userDatabase: UserReposytory) { }

    public createUser = async (input: UserControllerInputDTO): Promise<CreationUserReturnDTO> => {

        try{
            if(!input.name){
                throw new err.MissingName()
            }
            if(!input.email){
                throw new err.MissingEmail()
            }
            if(!input.password){
                  throw new err.MissingPassword  
            }


        } catch (error: any) {
            throw new CustomError(400, error.message);
          }

        return

    }
}