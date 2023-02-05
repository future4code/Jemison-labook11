import { FriendsForFeedDTO, GetAllFriendsInput } from './../model/DTO/friendshipDTO';
import { FriendshipDTO } from '../model/DTO/friendshipDTO';
import { FriendshipClass } from '../model/class/friendshipClass';
import { FriendshipRepository } from '../business/repository/friendshipRepository';
import { TABLE_FRIENDSHIPS } from './tableNames';
import { BaseDatabase } from './baseDatabase';
import { CustomError } from '../error/customError';


export class FriendshipDatabase extends BaseDatabase implements FriendshipRepository {

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
    };

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
    };

    public getAllFriends = async (input: GetAllFriendsInput):Promise<FriendsForFeedDTO[]> => {
        try {
            const result = await FriendshipDatabase.connection.raw(`
                SELECT user_sender_fk AS "amigo" from ${this.TABLE_NAME}
                WHERE user_reciever_fk = "${input.userId}"
                UNION SELECT user_reciever_fk from ${this.TABLE_NAME}
                WHERE user_sender_fk = "${input.userId}";
            `)
            
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
}