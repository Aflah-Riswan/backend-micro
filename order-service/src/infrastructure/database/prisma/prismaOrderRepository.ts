import { OrderStatus, type CreateOrderData, type Order } from "../../../domain/entities/Order.js";
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
    async getMyOrdersById(id: number , userId : string): Promise<Order | null> {
        const response = await prisma.order.findUnique({
            where : {
                id : id,
                userId : userId
            }
        })
        if(!response) {
            throw new Error('order is not found')
        }
        return {
            id :  response.id,
            userId : response.userId,
            item : response.item,
            price : response.price,
            quantity : response.quantity,
            status : response.status as OrderStatus,
            createdAt : response.createdAt
        }
    }
}