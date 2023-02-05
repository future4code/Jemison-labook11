import { CommentClass } from './../../model/class/commentClass';


export interface CommentRepository{

    insertComment(comment:CommentClass):Promise<void>
}