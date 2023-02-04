import { ReturnPostGetBy } from './../model/postDTOs';
import { PostRepository } from './../business/postRepository';
import { PostClass, TypeEnum } from './../model/postClass';
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
    }

    public getPostById = async (postId: string): Promise<ReturnPostGetBy> => {
        try {
            const result = await PostDatabase.connection.raw(`
                SELECT p.id AS "Id do Post", p.photo AS "URL da imagem", p.description AS "Descrição", p.type AS "tipo de postagem", DATE_FORMAT(STR_TO_DATE(p.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "postado em", p.author_id_fk AS "ID Autor", a.name AS "Nome Autor", a.email AS "Email Autor"
                FROM ${this.TABLE_NAME} p
                INNER JOIN ${TABLE_USERS} a ON a.id = p.author_id_fk
                WHERE p.id = "${postId}"
            `)

            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }

    public getPostByType = async (type:TypeEnum): Promise<ReturnPostGetBy[]> => {
        try {
            const result = await PostDatabase.connection.raw(`
                SELECT p.id AS "Id do Post", p.photo AS "URL da imagem", p.description AS "Descrição", p.type AS "tipo de postagem", DATE_FORMAT(STR_TO_DATE(p.created_at, '%Y-%m-%d %H:%i:%s'), '%d/%m/%Y %H:%i:%s') AS "postado em", p.author_id_fk AS "ID Autor", a.name AS "Nome Autor", a.email AS "Email Autor"
                FROM ${this.TABLE_NAME} p
                INNER JOIN ${TABLE_USERS} a ON a.id = p.author_id_fk
                WHERE p.type = "${type}"
                ORDER BY created_at
            `)

            return result[0]

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    }
}