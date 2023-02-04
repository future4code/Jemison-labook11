import { ReturnPostGetBy } from './../model/postDTOs';
import { PostClass } from "../model/postClass"
import { TypeEnum } from '../model/postClass';

export interface PostRepository{

    insertPost(post: PostClass):Promise<void>
    getPostById(postId:string):Promise<ReturnPostGetBy>
    getPostByType(type:TypeEnum): Promise<ReturnPostGetBy[]>    
}