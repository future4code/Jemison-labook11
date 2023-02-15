import { GetCommentReturnDTO } from './../model/DTO/commentDTO';
import { CommentClass } from './../model/class/commentClass';
import { CommentInput, CreationCommentReturnDTO } from '../model/DTO/commentDTO';
import { PostDatabase } from './../data/postsDatabase';
import { CommentRepository } from './repository/commentRepository';
import { CustomError } from '../error/customError';
import { Authenticator } from '../services/authenticator';
import * as err from '../error/commentCustomError';
import { IdGenerator } from '../services/idGenerator';


export class CommentBusiness {
    constructor(
        private commentDatabase: CommentRepository,
        private postDatabase: PostDatabase
    ) { }

    public createComment = async (input: CommentInput, token: string): Promise<CreationCommentReturnDTO> => {

        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)

            if (!input.postId) {
                throw new err.MissingPostId
            }

            if (!input.comment) {
                throw new err.MissingComment
            }

            const postExists = await this.postDatabase.getPostById(input)
            if (postExists.length === 0) {
                throw new err.InvalidPostId()
            } else {
                const idGenerator = new IdGenerator()
                const CommentId: string = idGenerator.generateId()


                const newComment = new CommentClass(
                    CommentId,
                    id,
                    input.postId,
                    input.comment
                )
                await this.commentDatabase.insertComment(newComment)

                return { message: 'Comentário criado com sucesso', comment: newComment }
            }
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getCommentsByUser = async (token: string): Promise<GetCommentReturnDTO[]> => {

        try {

            const authenticator = new Authenticator()
            const { id } = authenticator.getTokenData(token)
           
               const result = await this.commentDatabase.getCommentsByUser({userId:id})

                return result
            
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };
  

}