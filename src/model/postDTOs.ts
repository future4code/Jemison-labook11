import { TypeEnum, PostClass } from './postClass';

export interface PostInputDTO{
    photo:string,
    description:string,
    type?:TypeEnum,
 }

export interface CreationPostReturnDTO{
    message:string
    post:PostClass
}