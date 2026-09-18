import type { Order } from "../../domain/entities/Order.js";
import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";

export class GetMyOrdersById {
    constructor(
        private orderRepository : IOrderRepository
    ){}
    async execute(orderId : number , userId : string) : Promise<Order | null>{
         const response = await this.orderRepository.getMyOrdersById(orderId , userId)
         return response 
     
    }
}