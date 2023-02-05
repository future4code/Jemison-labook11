import { GetLikeByInputDTO, GetLikeByReturnDTO } from './../model/DTO/likeDTO';
import { TABLE_LIKES } from './tableNames';
import { BaseDatabase } from './baseDatabase';
import { LikeRepository } from '../business/repository/likeRepository';
import { LikeClass } from '../model/class/likeClass';
import { CustomError } from '../error/customError';


export class LikeDatabase extends BaseDatabase implements LikeRepository {

    TABLE_NAME = TABLE_LIKES

    public insertLike = async (like: LikeClass): Promise<void> => {
        try {
            await super.CreateItem(like)
        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getLikeByUserAndPost = async (input: GetLikeByInputDTO): Promise<GetLikeByReturnDTO[]> => {

        try {

            const result = await LikeDatabase.connection.raw(`
                SELECT user_id_fk AS "Usuário ID", post_id_fk AS "Post ID" FROM ${this.TABLE_NAME}
                WHERE user_id_fk = "${input.userId}"
                AND post_id_fk = "${input.postId}";
            `)
            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }

    };

    public deleteLike = async (input: GetLikeByInputDTO): Promise<void> => {

        try {

            const result = await LikeDatabase.connection.raw(`
                DELETE FROM ${this.TABLE_NAME}
                WHERE user_id_fk = "${input.userId}"
                AND post_id_fk = "${input.postId}";
            `)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }

    };
}