import type { CreateOrderData, Order, OrderStatus } from "../../../domain/entities/Order.js";
import type { IOrderRepository } from "../../../interface/repository/IOrderRepository.js";
import { prisma } from "../prismaClient.js";

export class PrismaOrderRepository implements IOrderRepository {
    async create(order: CreateOrderData): Promise<Order> {
        const response = await prisma.order.create(
            {
             data:{
                userId : order.userId,
                item : order.item,
                quantity : order.quantity,
                price : order.price
             }
            })

            return {
            id: response.id,
            userId: response.userId,
            item: response.item,
            quantity: response.quantity ,
            price: response.price,
            status: response.status as OrderStatus,
            createdAt: response.createdAt
        };
    }
}