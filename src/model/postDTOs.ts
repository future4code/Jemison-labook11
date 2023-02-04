import { TypeEnum, PostClass } from './postClass';

export interface PostInputDTO{
    photo:string,
    description:string,
    type?:TypeEnum,
 }

 export interface PostIdInputDTO{
    postId:string
 }

export interface CreationPostReturnDTO{
    message:string
    post:PostClass
}

export interface ReturnPostGetBy{
'Id do Post':string,
'URL da imagem':string,
'Descrição':string,
'Tipo de postagem':string,
'postado em':string,
'Nome Autor': string,
'Email Autor':string
}