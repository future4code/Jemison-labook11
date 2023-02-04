import { AuthenticationTokenDTO } from './../model/authenticationsTypes';
import { PostBusiness } from "../business/postBusiness";
import { Request, Response } from 'express';
import { PostInputDTO } from '../model/postDTOs';

export class PostController {
    constructor(private postBusiness: PostBusiness) { }

    public creatPost = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const { photo, description, type } = req.body
            const input: PostInputDTO = {
                photo,
                description,
                type           
            }
            const result = await this.postBusiness.createPost(input, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };
}