
import { Router } from "express";
import type { OrderController } from "../controllers/orderController.js";
import { TokenService } from "../../application/services/TokenService.js";
import { Authenticate } from "../middlewares/Authentication.js";

const tokenService = new TokenService()
const authMiddleware = new Authenticate(tokenService)
export function createOrderRouter(orderController :OrderController) {
    const router = Router()
    router.post('/create',authMiddleware.authenticate,orderController.create)
    router.get('/all',authMiddleware.authenticate,orderController.getMyOrders)
    router.patch('/update/:id',authMiddleware.authenticate,orderController.updateOrders)
    router.get('/:id',authMiddleware.authenticate,orderController.getMyOrderById)
    
    
    return router
}