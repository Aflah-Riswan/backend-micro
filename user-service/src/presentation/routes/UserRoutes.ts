import { UserController } from "../controllers/UserController";
import express from 'express'
import { Authentication } from "../middleware/Authentication";
import { TokenService } from "../../infrastructure/services/TokenService";
import { Authorization } from "../middleware/Authorization";


const tokenService = new TokenService()
const authMiddleware = new Authentication(tokenService)
const authorizationMiddleware = new Authorization()
export function createUserRoutes(controller : UserController){
    const router = express.Router()
    router.post('/register',controller.createUser)
    router.post('/login',controller.loginUser)
    router.get('/all',authMiddleware.authenticate,authorizationMiddleware.authorize ,controller.getAllUsers )
    router.get('/me',authMiddleware.authenticate , controller.getUserProfile)
    router.get('/:id',authMiddleware.authenticate , authorizationMiddleware.authorize , controller.getUserById)
    return router
}
