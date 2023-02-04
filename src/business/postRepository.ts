import { PostClass } from "../model/postClass"

export interface PostRepository{

    insertPost(post: PostClass):Promise<void>
   
}