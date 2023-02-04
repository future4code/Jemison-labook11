import { PostGetByIdInputDTO, PostGetByTypeInputDTO } from '../model/DTO/postDTOs';
import { AuthenticationTokenDTO } from '../model/type/authenticationsTypes';
import { PostBusiness } from "../business/postBusiness";
import { Request, Response } from 'express';
import { PostInputDTO } from '../model/DTO/postDTOs';

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

            const { postId } = req.body
            const input: PostGetByIdInputDTO = {
                postId
            }

            const result = await this.postBusiness.getPostById(input, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public getPostByType = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const { type } = req.body
            const input: PostGetByTypeInputDTO = {
                type
            }

            const result = await this.postBusiness.getPostByType(type, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };
}