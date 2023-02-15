import { ReturnPostGetByDTO, PostGetByIdInputDTO, PostGetByTypeInputDTO, FeedInputDTO } from '../../model/DTO/postDTOs';
import { PostClass } from "../../model/class/postClass"

export interface PostRepository{

    insertPost(post: PostClass):Promise<void>
    getPostById(input:PostGetByIdInputDTO):Promise<ReturnPostGetByDTO[]>
    getPostByType(input:PostGetByTypeInputDTO): Promise<ReturnPostGetByDTO[]> 
    postFeed(input:FeedInputDTO):Promise<ReturnPostGetByDTO[]>
}