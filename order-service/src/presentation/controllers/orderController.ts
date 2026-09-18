import type { NextFunction, Request, Response } from "express";
import type {  CreateOrder } from "../../application/usecase/CreateOrder.js";
import type { CreateOrderData } from "../../domain/entities/Order.js";
import type { GetMyOrdersById } from "../../application/usecase/GetOrdersById.js";
import type { GetMyOrders } from "../../application/usecase/GetMyOrders.js";
import type { UpdateOrder } from "../../application/usecase/UpdateOrder.js";
import type { OrderStatus } from "@prisma/client";

export class OrderController {
    constructor(
        private createOrder : CreateOrder,
        private getMyOrdersById : GetMyOrdersById,
        private getMyOrder : GetMyOrders,
        private updateOrder : UpdateOrder
    ){}
    create = async (req : Request , res : Response , next : NextFunction) => {
       try {
        const data = req.body
        const userId = req.user?.userId as string
        const orderData : CreateOrderData = {
            userId,
            item : data.item,
            price : data.price,
            quantity : data.quantity
        }
        const response = await this.createOrder.execute(orderData)
        return res.json({
            message : 'order created successfully',
            response
        })
         
       } catch (error) {
         console.log(" error found in order controller createOrder : ",error)
       }
    }
    getMyOrderById = async ( req : Request , res : Response , next : NextFunction) => {
        try {
            const orderId  = Number(req.params.id) 
            const userId = req.user?.userId
            const order = await this.getMyOrdersById.execute(orderId , userId as string)
            return res.json({
                message :'fetche succesfully',
                order
            })
        } catch (error) {
            console.log(" error found in getOrderByid : ",error)

        }
    }
    getMyOrders = async ( req : Request , res : Response , next : NextFunction) => {
        try {
            const userId = req.user?.userId as string
            const response = await this.getMyOrder.execute(userId)
            return res.json(response)
        } catch (error) {
            console.log(" error found in getMyorders : ",error)
        }
    }
    updateOrders = async (req : Request , res : Response , next: NextFunction) => {
          try {
            const accessToken = req.accessToken
            if(!accessToken){
                return res.json({
                    message :'access token is required '
                })
            }
            const orderId = Number(req.params.id)
            const userId = req.user?.userId as string
            if(Number.isNaN(orderId)){
                return res.json({
                    message : " invalid orderID"
                })
            }
            const { status } = req.body
            const response = await this.updateOrder.execute({orderId , userId , status , accessToken})
            return res.json(response)
          } catch (error) {
            console.log("error fpoun in update orders controller : ",error)
          }
    }
}