import { Request, Response } from "express";
import { AuthenticationTokenDTO } from "../model/type/authenticationsTypes";
import { CommentInput } from "../model/DTO/commentDTO";
import { CommentBusiness } from "../business/commentBusiness";

export class CommentController {
    constructor(private commentBusiness: CommentBusiness) { }

    public createComment = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const { postId, comment } = req.body
            const input: CommentInput = {
                postId,
                comment
            }

            const result = await this.commentBusiness.createComment(input, token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public getCommentByUser = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }
           
            const result = await this.commentBusiness.getCommentsByUser(token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

}