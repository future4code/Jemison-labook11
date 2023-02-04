import { ReturnPostGetBy, PostGetByIdInputDTO, PostGetByTypeInputDTO } from '../../model/DTO/postDTOs';
import { PostClass } from "../../model/class/postClass"

export interface PostRepository{

    insertPost(post: PostClass):Promise<void>
    getPostById(input:PostGetByIdInputDTO):Promise<ReturnPostGetBy[]>
    getPostByType(input:PostGetByTypeInputDTO): Promise<ReturnPostGetBy[]>    
}