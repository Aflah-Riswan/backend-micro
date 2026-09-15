import { UserController } from "../controllers/UserController";
import express from 'express'

const router = express.Router()
export function UserRoutes(controller : UserController){
   
   router.post('/register',controller.createUser)
}
export default router