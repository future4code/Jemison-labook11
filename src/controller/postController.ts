import { TypeEnum } from './../model/postClass';
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

    public getPostById = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const postId:string  = req.body.postId
       
            const result = await this.postBusiness.getPostById (postId, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public getPostByType = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const type:TypeEnum  = req.body.type
       
            const result = await this.postBusiness.getPostByType(type, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };
}