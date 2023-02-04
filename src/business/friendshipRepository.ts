import { FriendshipClass } from './../model/friendshipClass';
import { FriendshipDTO } from '../model/friendshipDTO';


export interface friendshipRepository{

    insertFriendship(friendship:FriendshipClass):Promise<void>
    friendshipExists(input: FriendshipDTO): Promise<string[]>
    deleteFriendship(input: FriendshipDTO): Promise<void>

}