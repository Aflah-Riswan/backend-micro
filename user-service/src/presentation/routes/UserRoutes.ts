import { UserController } from "../controllers/UserController";
import express from 'express'


export function createUserRoutes(controller : UserController){
    const router = express.Router()
    router.post('/register',controller.createUser)
    router.post('/login',controller.loginUser)
    return router
}
