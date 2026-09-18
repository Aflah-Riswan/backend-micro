import type { Order, OrderStatus } from "@prisma/client";
import {  type CreateOrderData,  } from "../../domain/entities/Order.js";
import type { IOrderRepository } from "../../interface/repository/IOrderRepository.js";
import { prisma } from "../database/prisma/prismaClient.js";

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

         return response
    }
    async getMyOrdersById(orderId: number , userId : string): Promise<Order | null> {
        const response = await prisma.order.findUnique({
            where : {
                id : orderId,
                userId : userId
            }
        })
        if(!response) {
            throw new Error('order is not found')
        }
       return response
    }
     async getMyOrders(userId: string): Promise<Order[]> {
        const orders = await prisma.order.findMany({
            where : {
                userId : userId
            }
        })
        return orders
    }
    async getOrderById(orderId: number): Promise<Order | null> {
        const order = await prisma.order.findUnique({where : {
            id : orderId
        }})
        return order
    }
    async updateOrder(orderId : number , newStatus: OrderStatus): Promise<Order> {
        const order = await prisma.order.update({
           where : {
             id : orderId
           },
           
            data : {
                status : newStatus
            }
           
        })
        return order
    }
    async getAllOrders(): Promise<Order[]> {
        const orders = await prisma.order.findMany()
        return orders 
    }
}