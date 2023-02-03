import { CustomError } from './../error/customError';
import { UserControllerInputDTO, CreationUserReturnDTO } from './../model/userDTOs';
import { UserBusiness } from './../business/userBusiness';
import { Request, Response } from 'express';

export class UserController {
  constructor(private userBusiness: UserBusiness) { }

  public creatUser = async (req: Request, res: Response): Promise<void> => {
    try {

      const { name, email, password } = req.body
      const input: UserControllerInputDTO = {
        name,
        email,
        password
      }
      const result = await this.userBusiness.createUser(input)
      res.status(201).send(result)

    } catch (error: any) {
      throw new CustomError(400, error.message);
    }
  }
}