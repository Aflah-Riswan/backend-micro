import type { NextFunction, Request, Response } from "express";
import type {  CreateOrder } from "../../application/usecase/CreateOrder.js";
import type { CreateOrderData } from "../../domain/entities/Order.js";
import type { GetMyOrdersById } from "../../application/usecase/GetMyOrdersById.js";
import type { GetMyOrders } from "../../application/usecase/GetMyOrders.js";
import type { UpdateOrder } from "../../application/usecase/UpdateOrder.js";
import type { OrderStatus } from "@prisma/client";
import { AppError } from "../errors/AppError.js";
import type { GetAllOrders } from "../../application/usecase/GetAllOrders.js";
import type { GetOrderById } from "../../application/usecase/GetOrderById.js";

export class OrderController {
    constructor(
        private createOrder : CreateOrder,
        private getMyOrdersById : GetMyOrdersById,
        private getMyOrder : GetMyOrders,
        private updateOrder : UpdateOrder,
        private getAllOrders : GetAllOrders,
        private getOrdersById : GetOrderById,
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
         return res.status(201).json({
            message : 'order created successfully',
            response
        })
         
       } catch (error) {
         console.log(" error found in order controller createOrder : ",error)
         next(error)
       }
    }
    getMyOrderById = async ( req : Request , res : Response , next : NextFunction) => {
        try {
            const orderId  = Number(req.params.id) 
            const userId = req.user?.userId
            const order = await this.getMyOrdersById.execute(orderId , userId as string)

            return res.status(200).json({
                message : 'Orders fetched successfully',
                order
            })
        } catch (error) {
            console.log(" error found in getOrderByid : ",error)
            next(error)

        }
    }
    getMyOrders = async ( req : Request , res : Response , next : NextFunction) => {
        try {
            const userId = req.user?.userId as string
            const response = await this.getMyOrder.execute(userId)
            return res.status(200).json({
                message : 'Orders fetched successfully',
                response
            })
        } catch (error) {
            console.log(" error found in getMyorders : ",error)
            next(error)
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
            if (Number.isNaN(orderId)) {
                throw new AppError(400, "Invalid order ID")
            }
            const { status } = req.body
            const response = await this.updateOrder.execute({orderId , userId , status , accessToken})
            return res.json(response)
          } catch (error) {
            console.log("error fpoun in update orders controller : ",error)
            next(error)
          }
    }
    getAllOrder = async (req : Request , res : Response , next : NextFunction) =>{
        try {
            const orders = await this.getAllOrders.execute()
            return res.status(200).json({
                success : true,
                message : "fecthed succesfully",
                data : orders
            })
        } catch (error) {
            next(error)
        }
    }
    getOrderById = async (req : Request , res : Response , next : NextFunction) =>{
      try {
        const orderId = Number(req.params.id)
        if(Number.isNaN(orderId)){
           throw new AppError(400, "Invalid order ID")
        }
        const order = await this.getOrdersById.execute(orderId)
        return res.status(200).json({
            success : true,
            message : "data fecthed succesfully",
            data : order
        })
      } catch (error) {
        console.log("error found in getOrdersByid controler : ",error)
        next(error)
      }
    }
}