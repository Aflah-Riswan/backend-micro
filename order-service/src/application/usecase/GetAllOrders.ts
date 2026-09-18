import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";

export class GetAllOrders {
    constructor(
        private orderRepo : IOrderRepository
    ){}
    async execute(){
      const orders = await this.orderRepo.getAllOrders()
      return orders
    }
}