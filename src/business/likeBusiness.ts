import { LikeClass } from './../model/class/likeClass';
import { PostRepository } from './repository/postRepository';
import { LikeCreateReturnDTO, LikeInputDTO } from '../model/DTO/likeDTO';
import { LikeRepository } from './repository/likeRepository';
import { Authenticator } from '../services/authenticator';
import { CustomError } from '../error/customError';
import * as err from '../error/likeCustomError'


export class LikeBusiness {
    constructor(
        private likeDatabase: LikeRepository,
        private postDatabase: PostRepository
    ) { }

    public createLike = async (input: LikeInputDTO, token: string): Promise<LikeCreateReturnDTO> => {

        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)

            if (!input.postId) {
                throw new err.MissingPostId()
            }

            const postExists = await this.postDatabase.getPostById(input)
            if (postExists.length === 0) {
                throw new err.InvalidPostId()
            }

            const likeExists = await this.likeDatabase.getLikeByUserAndPost({ userId: id, postId: input.postId })
            if (likeExists.length > 0) {
                throw new err.LikeAlreadyExists()
            } else {

                const newLike = new LikeClass(
                    id,
                    input.postId
                )
                await this.likeDatabase.insertLike(newLike)

                return { message: 'Post Criado com sucesso', like: newLike }
            }
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public deleteLike = async (input: LikeInputDTO, token: string): Promise<string> => {
        try {
            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)

            if (!input.postId) {
                throw new err.MissingPostId()
            }

            const postExists = await this.postDatabase.getPostById(input)
            if (postExists.length === 0) {
                throw new err.InvalidPostId()
            }

            const likeExists = await this.likeDatabase.getLikeByUserAndPost({ userId: id, postId: input.postId })
            if (likeExists.length === 0) {
                throw new err.NonexistentLike()
            } else {
                await this.likeDatabase.deleteLike({ userId: id, postId: input.postId })

                return 'Like deletado com sucesso!'
            }
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };


}