
import type { CreateOrderData, Order } from "../../domain/entities/Order.js";

export interface IOrderRepository {
    create(data : CreateOrderData) : Promise<Order>
    getMyOrders(id : string) : Promise<Order[]>
    getMyOrdersById (orderId : number , userId : string) : Promise<Order|null>,
    getOrderById (orderId : number) :Promise<Order | null>
    updateOrder (orderId : number, newStatus : string) : Promise<Order>
}