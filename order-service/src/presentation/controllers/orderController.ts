import type { NextFunction, Request, Response } from "express";
import type {  CreateOrderUseCase } from "../../application/usecase/CreateOrder.js";
import type { CreateOrderData } from "../../domain/entities/Order.js";

export class OrderController {
    constructor(
        private CreateOrder : CreateOrderUseCase
    ){}
    createOrder = async (req : Request , res : Response , next : NextFunction) => {
       try {
        const data = req.body
        const userId = req.user?.userId as string
        const orderData : CreateOrderData = {
            userId,
            item : data.item,
            price : data.price,
            quantity : data.quantity
        }
        const response = await this.CreateOrder.execute(orderData)
        return res.json({
            message : 'order created successfully',
            response
        })
         
       } catch (error) {
         console.log(" error found in order controller createOrder : ",error)
       }
    }
}