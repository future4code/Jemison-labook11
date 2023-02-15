
import { CommentClass } from './../../model/class/commentClass';
import { GetCommentsInputDTO, GetCommentReturnDTO } from '../../model/DTO/commentDTO';


export interface CommentRepository{

    insertComment(comment:CommentClass):Promise<void>
    getCommentsByUser(input:GetCommentsInputDTO): Promise<GetCommentReturnDTO[]>
}