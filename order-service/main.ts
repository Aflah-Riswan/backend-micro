
import app from "./server.js";
import { CreateOrderUseCase } from "./src/application/usecase/CreateOrder.js";
import { PrismaOrderRepository } from "./src/infrastructure/database/prisma/prismaOrderRepository.js";
import { OrderController } from "./src/presentation/controllers/orderController.js";
import { createOrderRouter } from "./src/presentation/routes/orderRoutes.js";


const orderRepo = new PrismaOrderRepository()
const createOrderUseCase = new CreateOrderUseCase(orderRepo)
const orderController = new OrderController(createOrderUseCase)

app.use('/order',createOrderRouter(orderController))
app.listen(5000,()=>{
    console.log("server is running on 5000")
})