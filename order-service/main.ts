
import app from "./server.js";
import { CreateOrder } from "./src/application/usecase/CreateOrder.js";
import { GetAllOrders } from "./src/application/usecase/GetAllOrders.js";
import { GetMyOrders } from "./src/application/usecase/GetMyOrders.js";
import { GetMyOrdersById } from "./src/application/usecase/GetMyOrdersById.js";
import { GetOrderById } from "./src/application/usecase/GetOrderById.js";
import { UpdateOrder } from "./src/application/usecase/UpdateOrder.js";
import { UserGrpcClient } from "./src/infrastructure/grpc/userGrpcClients.js";
import { PrismaOrderRepository } from "./src/infrastructure/repositories/prismaOrderRepository.js";
import { OrderController } from "./src/presentation/controllers/orderController.js";
import { errorHandler } from "./src/presentation/middlewares/ErrorHandler.js";
import { createOrderRouter } from "./src/presentation/routes/orderRoutes.js";


const orderRepo = new PrismaOrderRepository()
const createOrderUseCase = new CreateOrder(orderRepo)
const getMyOrdersByIdUseCase = new GetMyOrdersById(orderRepo)
const getMyOrdersUseCase = new GetMyOrders(orderRepo)
const userGrpcClient = new UserGrpcClient()
const getOrdersById = new GetOrderById(orderRepo)
const getAllOrders = new GetAllOrders(orderRepo)
const updateOrderUseCase = new UpdateOrder(orderRepo , userGrpcClient)
const orderController = new OrderController(
    createOrderUseCase,
    getMyOrdersByIdUseCase,
    getMyOrdersUseCase,
    updateOrderUseCase,
    getAllOrders,
    getOrdersById
)

app.use('/orders',createOrderRouter(orderController))
app.use(errorHandler)
app.listen(process.env.PORT,()=>{
    console.log("server is running on 5000")
})