import { FriendshipClass } from '../../model/class/friendshipClass';
import { FriendshipDTO, GetAllFriendsInput } from '../../model/DTO/friendshipDTO';



export interface FriendshipRepository{

    insertFriendship(friendship:FriendshipClass):Promise<void>
    friendshipExists(input: FriendshipDTO): Promise<string[]>
    deleteFriendship(input: FriendshipDTO): Promise<void>
    getAllFriends(input: GetAllFriendsInput):Promise<any>

}