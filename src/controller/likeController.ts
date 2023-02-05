import { LikeInputDTO } from '../model/DTO/likeDTO';
import { LikeBusiness } from "../business/likeBusiness";
import { Request, Response } from "express";
import { AuthenticationTokenDTO } from '../model/type/authenticationsTypes';

export class LikeController {
    constructor(private likeBusiness: LikeBusiness) { }

    public creatLike = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const { postId } = req.body
            const input: LikeInputDTO = {
                postId
            }
            const result = await this.likeBusiness.createLike(input, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public deleteLike = async (req: Request, res: Response): Promise<void> => {
        try {
            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const { postId } = req.body
            const input: LikeInputDTO = {
                postId
            }
            const result = await this.likeBusiness.deleteLike(input, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };
}