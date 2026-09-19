import express from 'express'
import { UserController } from './src/presentation/controllers/UserController'
import { CreateUser } from './src/application/use-case/CreateUser'
import  {createUserRoutes } from './src/presentation/routes/UserRoutes'
import { createAuthRoutes } from './src/presentation/routes/AuthRoutes.js'
import  { MongoUserRepository } from './src/infrastructure/database/mongodb/repositories/MongoUserRepository'
import  { PasswordService} from './src/infrastructure/services/PasswordService'
import  { TokenService } from './src/infrastructure/services/TokenService'
import { LoginUser } from './src/application/use-case/LoginUser'
import { GetUserById } from './src/application/use-case/GetUserById'
import { GetAllUsers } from './src/application/use-case/GetAllUsers'
import { UserGrpcServer } from './src/infrastructure/grpc/UserGrpcServer.js'
import { errorHandler } from './src/presentation/middleware/ErrorHandler'

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