
import app from "./server.js";
import { CreateOrder } from "./src/application/usecase/CreateOrder.js";
import { GetMyOrders } from "./src/application/usecase/GetMyOrders.js";
import { GetMyOrdersById } from "./src/application/usecase/GetOrdersById.js";
import { UpdateOrder } from "./src/application/usecase/UpdateOrder.js";
import { UserGrpcClient } from "./src/infrastructure/grpc/userGrpcClients.js";
import { PrismaOrderRepository } from "./src/infrastructure/repositories/prismaOrderRepository.js";
import { OrderController } from "./src/presentation/controllers/orderController.js";
import { createOrderRouter } from "./src/presentation/routes/orderRoutes.js";


const orderRepo = new PrismaOrderRepository()
const createOrderUseCase = new CreateOrder(orderRepo)
const getMyOrdersByIdUseCase = new GetMyOrdersById(orderRepo)
const getMyOrdersUseCase = new GetMyOrders(orderRepo)
const userGrpcClient = new UserGrpcClient()
const updateOrderUseCase = new UpdateOrder(orderRepo , userGrpcClient)
const orderController = new OrderController(
    createOrderUseCase,
    getMyOrdersByIdUseCase,
    getMyOrdersUseCase,
    updateOrderUseCase
)

app.use('/order',createOrderRouter(orderController))
app.listen(5000,()=>{
    console.log("server is running on 5000")
})