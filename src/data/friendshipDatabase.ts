import { FriendshipDTO } from './../model/friendshipDTO';
import { FriendshipClass } from './../model/friendshipClass';
import { friendshipRepository } from './../business/friendshipRepository';
import { TABLE_FRIENDSHIPS } from './tableNames';
import { BaseDatabase } from './baseDatabase';
import { CustomError } from '../error/customError';


export class FriendshipDatabase extends BaseDatabase implements friendshipRepository {

    TABLE_NAME = TABLE_FRIENDSHIPS

    public insertFriendship = async (friendship: FriendshipClass): Promise<void> => {
        try {

            await super.CreateItem(friendship)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    public friendshipExists = async (input: FriendshipDTO): Promise<string[]> => {
        try {

            const result = await FriendshipDatabase.connection.raw(`
                SELECT * FROM ${this.TABLE_NAME}
                WHERE (user_sender_fk = "${input.senderId}" AND user_reciever_fk ="${input.recieverId}")
                OR (user_sender_fk = "${input.recieverId}" AND user_reciever_fk = "${input.senderId}");            
            `)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    public deleteFriendship = async (input: FriendshipDTO): Promise<void> => {
        try {
            await FriendshipDatabase.connection.raw(`
                DELETE FROM ${this.TABLE_NAME}
                WHERE (user_sender_fk = "${input.senderId}" AND user_reciever_fk ="${input.recieverId}")
                OR (user_sender_fk = "${input.recieverId}" AND user_reciever_fk = "${input.senderId}");            
            `)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }


    public getAllFriends = async () => {
        try {
            const result = await FriendshipDatabase.connection.raw(`
        SELECT user_sender_fk AS "Amigos" from Labook_users_friendships WHERE user_reciever_fk = "81199684-e6e0-48a3-9bac-ff29256904e2"
        UNION SELECT user_reciever_fk from Labook_users_friendships WHERE user_sender_fk = "81199684-e6e0-48a3-9bac-ff29256904e2";
        `)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}