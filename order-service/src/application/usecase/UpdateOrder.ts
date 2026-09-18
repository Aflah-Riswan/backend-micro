import type { Order } from "@prisma/client";
import type { UpdateOrderInput } from "../../domain/entities/Order.js";
import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";
import type { IUserGrpcClient } from "../../interface/services/IUserGrpcClient.js";
import { AppError } from "../../presentation/errors/AppError.js";

export class UpdateOrder {
    constructor(
        private orderRepository : IOrderRepository,
        private userGrpcClient : IUserGrpcClient
    ){}
   async execute(data : UpdateOrderInput) :Promise<Order> {
        const { userId , orderId , status , accessToken} =  data
    
        const targetOrder = await this.orderRepository.getOrderById(orderId)

        if(!targetOrder){
            throw new AppError(404, "Order is not found")
        }

        const currentUser = await this.userGrpcClient.getCurrentUser(accessToken)
        const isOwner = targetOrder.userId === userId
        const isAdmin = currentUser.role === 'admin'
          if(!isOwner && !isAdmin){
            throw new AppError(403, "You are not authorized to update this order")
        }
         console.log(status)
         const updatedOrder = await this.orderRepository.updateOrder(orderId , status)
         return updatedOrder
       }
}
