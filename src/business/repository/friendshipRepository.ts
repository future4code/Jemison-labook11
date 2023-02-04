import { FriendshipClass } from '../../model/class/friendshipClass';
import { FriendshipDTO } from '../../model/DTO/friendshipDTO';


export interface friendshipRepository{

    insertFriendship(friendship:FriendshipClass):Promise<void>
    friendshipExists(input: FriendshipDTO): Promise<string[]>
    deleteFriendship(input: FriendshipDTO): Promise<void>

}