import type { NextFunction, Request, Response } from "express";
import type {  CreateOrderUseCase } from "../../application/usecase/CreateOrder.js";
import type { CreateOrderData } from "../../domain/entities/Order.js";
import type { GetOrderByIdUseCase } from "../../application/usecase/GetOrdersById.js";

export class OrderController {
    constructor(
        private CreateOrder : CreateOrderUseCase,
        private GetOrderById : GetOrderByIdUseCase
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
    getOrderById = async ( req : Request , res : Response , next : NextFunction) => {
        try {
            const orderId  = Number(req.params.id) 
            const userId = req.user?.userId
            const order = await this.GetOrderById.execute(orderId , userId as string)
            return res.json({
                message :'fetche succesfully',
                order
            })
        } catch (error) {
            console.log(" error found in getOrderByid : ",error)

        }
    }
}