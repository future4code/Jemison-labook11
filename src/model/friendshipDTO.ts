import { FriendshipClass } from './friendshipClass';

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

