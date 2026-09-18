import { OrderStatus } from "@prisma/client"


export interface Order {
    id : number,
    userId : string,
    item : string,
    quantity : number,
    price : number,
    status : OrderStatus,
    createdAt : Date ,
}

export interface CreateOrderData {
    item : string,
    quantity : number,
    userId : string,
    price : number
}

export interface UpdateOrderInput {
    orderId : number,
    userId : string ,
    status : OrderStatus,
    accessToken : string
}
