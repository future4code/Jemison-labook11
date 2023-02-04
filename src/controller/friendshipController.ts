import { FriendshipInput } from './../model/friendshipDTO';
import { AuthenticationTokenDTO } from './../model/authenticationsTypes';
import{FriendshipBusiness} from '../business/frienshipBusiness'
import { Request, Response } from 'express';

export class FriendshipController {
    constructor(private friendshipBusiness: FriendshipBusiness) { }

    public createFrienship = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const { userReciever } = req.body
            const input: FriendshipInput = {
                userReciever
            }
            const result = await this.friendshipBusiness.createFriendship(input,token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };

    public deleteFrienship = async (req: Request, res: Response): Promise<void> => {
        try {

            const token: AuthenticationTokenDTO = { token: req.headers.auth as string }

            const { userReciever } = req.body
            const input: FriendshipInput = {
                userReciever
            }
            const result = await this.friendshipBusiness.deleteFriendship(input,token.token)
            res.status(201).send(result)

        } catch (error: any) {
            res.status(400).send(error.message);
        }
    };



}