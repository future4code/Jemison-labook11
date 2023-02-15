import { FeedInputDTO } from './../model/DTO/postDTOs';
import { ReturnPostGetByDTO, PostGetByIdInputDTO, PostGetByTypeInputDTO } from '../model/DTO/postDTOs';
import { PostRepository } from '../business/repository/postRepository';
import { PostClass, TypeEnum } from '../model/class/postClass';
import { CustomError } from './../error/customError';
import { TABLE_POSTS, TABLE_USERS } from './tableNames';
import { BaseDatabase } from "./baseDatabase";




export class PostDatabase extends BaseDatabase implements PostRepository {

    TABLE_NAME = TABLE_POSTS

    public insertPost = async (post: PostClass): Promise<void> => {
        try {

            await super.CreateItem(post)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getPostById = async (input: PostGetByIdInputDTO): Promise<ReturnPostGetByDTO[]> => {
        try {
            const result = await PostDatabase.connection.raw(`
                SELECT p.id AS "ID do Post", p.photo AS "URL da imagem", p.description AS "Descrição", p.type AS "tipo de postagem", DATE_FORMAT(STR_TO_DATE(p.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "postado em", p.author_id_fk AS "ID Autor", a.name AS "Nome Autor", a.email AS "Email Autor"
                FROM ${this.TABLE_NAME} p
                INNER JOIN ${TABLE_USERS} a ON a.id = p.author_id_fk
                WHERE p.id = "${input.postId}"
            `)

            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public getPostByType = async (input: PostGetByTypeInputDTO): Promise<ReturnPostGetByDTO[]> => {
        try {
            const result = await PostDatabase.connection.raw(`
                SELECT p.id AS "ID do Post", p.photo AS "URL da imagem", p.description AS "Descrição", p.type AS "tipo de postagem", DATE_FORMAT(STR_TO_DATE(p.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "postado em", p.author_id_fk AS "ID Autor", a.name AS "Nome Autor", a.email AS "Email Autor"
                FROM ${this.TABLE_NAME} p
                INNER JOIN ${TABLE_USERS} a ON a.id = p.author_id_fk
                WHERE p.type = "${input.type}"
                ORDER BY created_at
            `)

            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

    public postFeed = async (input: FeedInputDTO): Promise<ReturnPostGetByDTO[]> => {
        try {
            const result = await PostDatabase.connection.raw(`
            SELECT p.id AS "Id do Post", p.photo AS "URL da imagem", p.description AS "Descrição",
            p.type AS "tipo de postagem", DATE_FORMAT(STR_TO_DATE(p.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "postado em",
            p.author_id_fk AS "ID Autor", a.name AS "Nome Autor", a.email AS "Email Autor"
            FROM ${this.TABLE_NAME} p
            INNER JOIN ${TABLE_USERS} a ON a.id = p.author_id_fk
            WHERE ${input.stringForQuery}
            ORDER BY created_at
            LIMIT ${input.limit};
            `)

            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

}
