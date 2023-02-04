import { PostRepository } from './../business/postRepository';
import { PostClass } from './../model/postClass';
import { CustomError } from './../error/customError';
import {TABLE_POSTS } from './tableNames';
import { BaseDatabase } from "./baseDatabase";



export class PostDatabase extends BaseDatabase implements PostRepository {

    TABLE_NAME = TABLE_POSTS

    public insertPost = async (post: PostClass):Promise<void> => {
        try {

            await PostDatabase.connection(this.TABLE_NAME).insert(post)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}