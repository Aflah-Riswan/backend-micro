
import { Router } from "express";
import type { OrderController } from "../controllers/orderController.js";
import { TokenService } from "../../application/services/TokenService.js";
import { Authenticate } from "../middlewares/Authentication.js";

const tokenService = new TokenService()
const authMiddleware = new Authenticate(tokenService)
export function createOrderRouter(orderController :OrderController) {
    const router = Router()
    router.post('/create',authMiddleware.authenticate,orderController.createOrder)
    router.get('/:id',authMiddleware.authenticate,orderController.getOrderById)
    return router
}