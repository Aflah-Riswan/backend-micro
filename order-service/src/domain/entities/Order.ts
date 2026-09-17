export enum OrderStatus {
     PENDING = "PENDING",
    PROCESSING = "PROCESSING",
    SHIPPED = "SHIPPED",
    DELIVERED = "DELIVERED"
}

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