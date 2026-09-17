import type { CreateOrderData } from "../../domain/entities/Order.js";
import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";

export class CreateOrderUseCase {
    constructor(
        private orderRepo : IOrderRepository
    ){}
    async execute (data : CreateOrderData){
      const response = await this.orderRepo.create(data)
      console.log("response : ",response)
    }
}