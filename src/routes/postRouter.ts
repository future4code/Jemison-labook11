import { PostController } from './../controller/postController';
import { PostBusiness } from './../business/postBusiness';
import { PostDatabase } from './../data/postsDatabase';
import express from 'express';

export const postRouter = express.Router()

const postDatabase = new PostDatabase()
const postBusiness = new PostBusiness(postDatabase)
const postController = new PostController(postBusiness)

postRouter.post('/create', postController.creatPost)