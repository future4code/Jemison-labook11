import { CommentClass } from './../model/class/commentClass';
import { TABLE_COMMENTS } from './tableNames';
import { BaseDatabase } from './baseDatabase';
import { CommentRepository } from '../business/repository/commentRepository';
import { CustomError } from '../error/customError';


export class CommentDatabase extends BaseDatabase implements CommentRepository {

    TABLE_NAME = TABLE_COMMENTS

    public insertComment = async (comment: CommentClass): Promise<void> => {
        try {

            await super.CreateItem(comment)

        } catch (error: any) {
            throw new CustomError(400, error.message);
        }
    };

}

