import { UserDatabase } from './../data/userDatabase';
import { FriendshipController } from './../controller/friendshipController';
import { FriendshipBusiness } from './../business/frienshipBusiness';
import { FriendshipDatabase } from './../data/friendshipDatabase';
import express from "express"

export const friendshipRouter = express.Router()

const userDatabase = new UserDatabase()
const friendshipDatabase = new FriendshipDatabase()
const friendshipBusiness = new FriendshipBusiness(friendshipDatabase, userDatabase)
const friendshipController = new FriendshipController(friendshipBusiness)

friendshipRouter.post('/create', friendshipController.createFrienship)
friendshipRouter.delete('/delete', friendshipController.deleteFrienship)