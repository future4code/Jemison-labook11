import { LikeClass } from "../class/likeClass";

export interface LikeInputDTO {
    postId: string
}

export interface GetLikeByInputDTO{
userId:string,
postId:string
}

export interface LikeCreateReturnDTO {
    message: string
    like: LikeClass
}

export interface GetLikeByReturnDTO{
    "Usuário ID":string,
    "Post ID":string
}