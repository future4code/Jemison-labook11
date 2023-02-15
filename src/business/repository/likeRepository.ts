import { LikeClass } from "../../model/class/likeClass";
import { GetLikeByInputDTO, GetLikeByReturnDTO } from "../../model/DTO/likeDTO";

export interface LikeRepository{

    insertLike(like: LikeClass):Promise<void> 
    getLikeByUserAndPost(input:GetLikeByInputDTO):Promise<GetLikeByReturnDTO[]>
    deleteLike(input:GetLikeByInputDTO):Promise<void>

}