import type { Order } from "@prisma/client";
import type { UpdateOrderInput } from "../../domain/entities/Order.js";
import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";
import type { IUserGrpcClient } from "../../interface/services/IUserGrpcClient.js";

export class UpdateOrder {
    constructor(
        private orderRepository : IOrderRepository,
        private userGrpcClient : IUserGrpcClient
    ){}
   async execute(data : UpdateOrderInput) :Promise<Order> {
        const { userId , orderId , status , accessToken} =  data
    
        const tagetOrder = await this.orderRepository.getOrderById(orderId)
        if(!tagetOrder){
            throw new Error("Orde is not found")
        }
        const currentUser = await this.userGrpcClient.getCurrentUser(accessToken)
        const isOwner = tagetOrder.userId === userId
        const isAdmin = currentUser.role === 'admin'
         if(!isOwner && !isAdmin){
            throw new Error("FORBIDDEN");
         }
         console.log(status)
         const updatedOrder = await this.orderRepository.updateOrder(orderId , status)
         return updatedOrder
       }
}
