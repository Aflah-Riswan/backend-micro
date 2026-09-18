import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";
import { AppError } from "../../presentation/errors/AppError.js";

export class GetOrderById {
    constructor(private orderRepo : IOrderRepository){}
    async execute (orderId : number) {
        const order = await this.orderRepo.getOrderById(orderId)
        if(!order){
            throw new AppError(404, "Order is not found")
        }
        return order
    }
}