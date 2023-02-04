import { InvalidPostId } from './../error/postCustomError';
import { ReturnPostGetBy } from './../model/postDTOs';
import { IdGenerator } from './../services/idGenerator';
import { PostClass } from './../model/postClass';
import { Authenticator } from './../services/authenticator';
import { CreationPostReturnDTO, PostInputDTO } from '../model/postDTOs';
import { PostRepository } from './postRepository';
import { CustomError } from '../error/customError';
import * as err from '../error/postCustomError'
import { TypeEnum } from '../model/postClass';

export class PostBusiness {

    constructor(private postDatabase: PostRepository) { }

    public createPost = async (input: PostInputDTO, token: string): Promise<CreationPostReturnDTO> => {

        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)
            
            let typeChoosed

            if (!input.photo) {
                throw new err.MissingPhoto()
            }

            if (!input.description) {
                throw new err.MissingDescription()
            }
            if (input.type && input.type !== TypeEnum.EVENT) {
                throw new err.InvalidType()
            }
            if (!input.type) {
                typeChoosed = TypeEnum.NORMAL

            } else {
                typeChoosed = TypeEnum.EVENT
            }

            const idGenerator = new IdGenerator()
            const postId: string = idGenerator.generateId()

            const newPost = new PostClass(
                postId,
                input.photo,
                input.description,
                typeChoosed,
                id
            )

            await this.postDatabase.insertPost(newPost)

            return { message: 'Post Criado com sucesso', post: newPost }

        } catch(error: any) {
        throw new CustomError(400, error.message);
    }
}


    public getPostById = async (postId: string, token: string): Promise<ReturnPostGetBy> => {

    try {
        const authenticator = new Authenticator()
        const { id } = authenticator.getTokenData(token)

        if (!postId) {
            throw new err.MissingPostId()
        }
        const result = await this.postDatabase.getPostById(postId)

        if (!result) {
            throw new InvalidPostId()
        } else {
            return result
        }

    } catch (error: any) {
        throw new CustomError(400, error.message);
    }
}

public getPostByType = async (type:TypeEnum, token:string):Promise<ReturnPostGetBy[]> =>{
    
    try{
        const authenticator = new Authenticator()
        const { id } = authenticator.getTokenData(token)

        if(!type){
            throw new err.MissingType()
        }

        if(type !== TypeEnum.EVENT.toString() && type !== TypeEnum.NORMAL.toString()){
            throw new err.InvalidGetByType()
        }

        return await this.postDatabase.getPostByType(type)

    }catch (error: any) {
        throw new CustomError(400, error.message);
    }
}

}

