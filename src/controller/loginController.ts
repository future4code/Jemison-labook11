import { LoginInputDTO } from './../model/loginDTO';
import { Request, Response } from 'express';
import { LoginBusiness } from '../business/loginBusiness';

export class LoginController {

  constructor(private loginBusiness: LoginBusiness) { }

  public login = async (req: Request, res: Response): Promise<void> => {
    
    try {

      const { email, password } = req.body

      const input: LoginInputDTO = {
        email,
        password
      }

      const result = await this.loginBusiness.login(input)

      res.status(201).send(result)

    } catch (error: any) {
      res.status(400).send(error.message);
    }
  };   
}