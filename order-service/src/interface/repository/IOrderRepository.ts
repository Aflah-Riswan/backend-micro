
import type { CreateOrderData, Order } from "../../domain/entities/Order.js";

export interface IOrderRepository {
    create(data : CreateOrderData) : Promise<Order>
    // getOrders() : Promise <Order[]>,
    getOrdersById (id : number , userId : string) : Promise<Order|null>,
    // updateOrder (status : string) : Promise<Order>
}