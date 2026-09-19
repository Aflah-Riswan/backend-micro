import  { Router } from 'express'
import { UserController } from '../controllers/UserController.js'

export function createAuthRoutes(controller : UserController){
    const router = Router()
    router.post('/register',controller.createUser)
    router.post('/login',controller.loginUser)
    return router
}