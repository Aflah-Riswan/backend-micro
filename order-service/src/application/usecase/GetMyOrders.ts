import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";

export class GetMyOrders {
    constructor(
        private orderRepo : IOrderRepository
    ){}
    async execute(userId : string){
        const response = await this.orderRepo.getMyOrders(userId)
        return response
    }
}