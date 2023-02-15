import { CommentClass } from './../class/commentClass';

export interface CommentInput {
    postId: string
    comment: string
}

export interface CreationCommentReturnDTO {
    message: string
    comment: CommentClass
}

export interface GetCommentsInputDTO{
    userId:string
}

export interface GetCommentReturnDTO{
    'ID do comentário':string,
    'ID Autor do comentário':string,
    'Nome do Autor do comentário':string,
    'ID do Post':string,
    'URL da imagem': string,
    'Descrição': string,
    'Tipo de postagem': string,
    'postado em': string,
    'Autor do Post': string,
    'comentário':string,
    'cmentado em':string
    

}