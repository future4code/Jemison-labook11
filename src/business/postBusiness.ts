import { InvalidPostId } from './../error/postCustomError';
import { ReturnPostGetBy, PostGetByIdInputDTO, PostGetByTypeInputDTO } from '../model/DTO/postDTOs';
import { IdGenerator } from './../services/idGenerator';
import { PostClass } from '../model/class/postClass';
import { Authenticator } from './../services/authenticator';
import { CreationPostReturnDTO, PostInputDTO } from '../model/DTO/postDTOs';
import { PostRepository } from './repository/postRepository';
import { CustomError } from '../error/customError';
import * as err from '../error/postCustomError';
import { TypeEnum } from '../model/class/postClass';

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

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }


    public getPostById = async (input: PostGetByIdInputDTO, token: string): Promise<ReturnPostGetBy[]> => {

        try {
            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)

            if (!input.postId) {
                throw new err.MissingPostId()
            }
            const result = await this.postDatabase.getPostById({ postId: input.postId })

            if (result.length === 0) {
                throw new InvalidPostId()
            } else {
                return result
            }

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    public getPostByType = async (input: PostGetByTypeInputDTO, token: string): Promise<ReturnPostGetBy[]> => {

        try {
            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)

            if (!input.type) {
                throw new err.MissingType()
            }

            if (input.type !== TypeEnum.EVENT.toString() && input.type !== TypeEnum.NORMAL.toString()) {
                throw new err.InvalidGetByType()
            }

            return await this.postDatabase.getPostByType({ type: input.type })

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

}

