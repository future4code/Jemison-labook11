import { CommentClass } from './../model/class/commentClass';
import { TABLE_COMMENTS, TABLE_USERS, TABLE_POSTS } from './tableNames';
import { BaseDatabase } from './baseDatabase';
import { CommentRepository } from '../business/repository/commentRepository';
import { CustomError } from '../error/customError';
import { GetCommentReturnDTO, GetCommentsInputDTO } from '../model/DTO/commentDTO';


export class CommentDatabase extends BaseDatabase implements CommentRepository {

    TABLE_NAME = TABLE_COMMENTS

    public insertComment = async (comment: CommentClass): Promise<void> => {
        try {

            await super.CreateItem(comment)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getCommentsByUser = async (input:GetCommentsInputDTO): Promise<GetCommentReturnDTO[]> =>{

    try {

        const result = await CommentDatabase.connection.raw(`
            SELECT c.id AS "ID do comentário", c.user_id_fk AS "ID Autor do comentário", u.name AS "Nome do Autor do comentário",
            p.id AS "ID do Post", p.photo AS "URL da imagem", p.description AS "Descrição", p.type AS "tipo de postagem", 
            DATE_FORMAT(STR_TO_DATE(p.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "postado em", ap.name AS "Autor do Post",
            c.comment AS "comentário", DATE_FORMAT(STR_TO_DATE(c.commented_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "comentado em"
            FROM ${this.TABLE_NAME} c
            INNER JOIN ${TABLE_USERS} u ON u.id = c.user_id_fk
            INNER JOIN ${TABLE_POSTS} p ON p.id = c.post_id_fk
            INNER JOIN ${TABLE_USERS} ap ON ap.id = p.author_id_fk
            WHERE c.user_id_fk = "${input.userId}";
        `)
        
        return result[0]

    } catch (error: any) {
        throw new CustomError(400, error.message);
    }
};
   
}

