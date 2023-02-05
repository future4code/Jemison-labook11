import { TypeEnum, PostClass } from '../class/postClass';

export interface PostInputDTO {
   photo: string,
   description: string,
   type?: TypeEnum,
}

export interface PostGetByIdInputDTO {
   postId: string
}

export interface PostGetByTypeInputDTO {
   type: TypeEnum
}

export interface PostIdInputDTO {
   postId: string
}

export interface CreationPostReturnDTO {
   message: string
   post: PostClass
}

export interface ReturnPostGetByDTO {
   'Id do Post': string,
   'URL da imagem': string,
   'Descrição': string,
   'Tipo de postagem': string,
   'postado em': string,
   'Nome Autor': string,
   'Email Autor': string
}

export interface FeedLimitInputDTO {
   limit: number
}

export interface FeedInputDTO {
   id: string,
   stringForQuery: string
   limit: number
}