import { CommentClass } from './../class/commentClass';

export interface CommentInput {
    postId: string
    comment: string
}

export interface CreationCommentReturnDTO {
    message: string
    comment: CommentClass
}