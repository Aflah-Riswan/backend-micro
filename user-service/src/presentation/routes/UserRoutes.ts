import { UserController } from "../controllers/UserController.js";
import express from 'express'
import { Authentication } from "../middleware/Authentication.js";
import { TokenService } from "../../infrastructure/services/TokenService.js";
import { Authorization } from "../middleware/Authorization.js";


const tokenService = new TokenService()
const authMiddleware = new Authentication(tokenService)
const authorizationMiddleware = new Authorization()
export function createUserRoutes(controller : UserController){
    const router = express.Router()
    router.get('/all',authMiddleware.authenticate,authorizationMiddleware.authorize ,controller.getAllUsers )
    router.get('/me',authMiddleware.authenticate , controller.getUserProfile)
    router.get('/:id',authMiddleware.authenticate , authorizationMiddleware.authorize , controller.getUserById)
    return router
}
