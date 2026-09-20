import express from 'express'
import { UserController } from './presentation/controllers/UserController.js'
import { CreateUser } from './application/use-case/CreateUser.js'
import  {createUserRoutes } from './presentation/routes/UserRoutes.js'
import { createAuthRoutes } from './presentation/routes/AuthRoutes.js'
import  { MongoUserRepository } from './infrastructure/database/mongodb/repositories/MongoUserRepository.js'
import  { PasswordService} from './infrastructure/services/PasswordService.js'
import  { TokenService } from './infrastructure/services/TokenService.js'
import { LoginUser } from './application/use-case/LoginUser.js'
import { GetUserById } from './application/use-case/GetUserById.js'
import { GetAllUsers } from './application/use-case/GetAllUsers.js'
import { UserGrpcServer } from './infrastructure/grpc/UserGrpcServer.js'
import { errorHandler } from './presentation/middleware/ErrorHandler.js'

const app = express()
app.use(express.json())

 
const userRepository = new MongoUserRepository()
const tokenService = new TokenService()
const passwordService = new PasswordService()

const userUseCase = new CreateUser(
    userRepository ,
    passwordService
)



const loginUseCase = new LoginUser(userRepository ,passwordService , tokenService)
const GetUserByIdUseCase = new GetUserById(userRepository)
const GetAllUsersUseCase = new GetAllUsers(userRepository)


const userController = new UserController(
    userUseCase , loginUseCase , GetUserByIdUseCase , GetAllUsersUseCase
)
app.use('/auth',createAuthRoutes(userController))
app.use('/users',createUserRoutes(userController))
app.use(errorHandler)

const grpcServer = new UserGrpcServer(
    tokenService,
    GetUserByIdUseCase  
)
grpcServer.start(5001)

export default app