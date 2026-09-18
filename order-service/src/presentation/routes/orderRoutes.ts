
import { Router } from "express";
import type { OrderController } from "../controllers/orderController.js";
import { TokenService } from "../../application/services/TokenService.js";
import { Authenticate } from "../middlewares/Authentication.js";
import { Authorization } from "../middlewares/Authorization.js";

const tokenService = new TokenService()
const authMiddleware = new Authenticate(tokenService)
const authorizationMiddleware = new Authorization()
export function createOrderRouter(orderController :OrderController) {
    const router = Router()
    router.post('/create',authMiddleware.authenticate,orderController.create)
    router.get('/all',authMiddleware.authenticate,orderController.getMyOrders)

    router.get('/admin/all',authMiddleware.authenticate,authorizationMiddleware.authorize,orderController.getAllOrder)
    router.get('/admin/:id',authMiddleware.authenticate,authorizationMiddleware.authorize,orderController.getOrderById)

    router.patch('/update/:id',authMiddleware.authenticate,orderController.updateOrders)
    router.get('/:id',authMiddleware.authenticate,orderController.getMyOrderById)
    
    
    return router
}