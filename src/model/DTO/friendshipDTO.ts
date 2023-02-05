import { FriendshipClass } from '../class/friendshipClass';

export interface FriendshipInput{
    userReciever:string
}

export interface CreationFriendshipReturnDTO{
    message:string
    friendship:FriendshipClass
}

export interface FriendshipDTO{
    senderId:string,
    recieverId:string
}

export interface GetAllFriendsInput{
    userId:string
}

export interface FriendsForFeedDTO{
    amigo:string
}
