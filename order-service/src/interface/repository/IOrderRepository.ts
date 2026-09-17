
import type { CreateOrderData, Order } from "../../domain/entities/Order.js";

export interface IOrderRepository {
    create(data : CreateOrderData) : Promise<Order>
    // getOrders() : Promise <Order[]>,
    // getOrdersById (id : number) : Promise<Order>,
    // updateOrder (status : string) : Promise<Order>
}