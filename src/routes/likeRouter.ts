import { LikeController } from './../controller/likeController';
import { LikeBusiness } from './../business/likeBusiness';
import { LikeDatabase } from './../data/likeDatabase';
import { PostDatabase } from './../data/postsDatabase';
import express from 'express';

export const likeRouter = express.Router()

const postDatabase = new PostDatabase() 
const likeDatabase = new LikeDatabase()
const likeBusiness = new LikeBusiness(likeDatabase,postDatabase)
const likeController = new LikeController(likeBusiness)

likeRouter.post('/create', likeController.creatLike)
likeRouter.delete('/delete',likeController.deleteLike)

