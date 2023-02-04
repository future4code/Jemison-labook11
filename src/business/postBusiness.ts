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

                const idGenerator = new IdGenerator()
                const postId: string = idGenerator.generateId()

                const newPost = new PostClass(
                    postId,
                    input.photo,
                    input.description,
                    TypeEnum.NORMAL,
                    id
                )

                await this.postDatabase.insertPost(newPost)

                return { message: 'Post Criado com sucesso', post: newPost }

            } else {
                const idGenerator = new IdGenerator()
                const postId: string = idGenerator.generateId()

                const newPost = new PostClass(
                    postId,
                    input.photo,
                    input.description,
                    TypeEnum.EVENT,
                    id
                )

                await this.postDatabase.insertPost(newPost)

                return { message: 'Post Criado com sucesso', post: newPost }

            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}

