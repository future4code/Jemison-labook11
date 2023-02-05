import { CommentController } from './../controller/commentController';
import { CommentBusiness } from './../business/commentBusiness';
import { CommentDatabase } from './../data/commentDatabase';
import { PostDatabase } from './../data/postsDatabase';
import express from 'express';

export const commentRouter = express.Router()

const postDatabase = new PostDatabase() 
const commentDatabase = new CommentDatabase()
const commentBusiness = new CommentBusiness(commentDatabase,postDatabase)
const commentController = new CommentController(commentBusiness)

commentRouter.post('/create', commentController.createComment)