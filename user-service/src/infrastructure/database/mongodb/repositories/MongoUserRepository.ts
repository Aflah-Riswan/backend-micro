import { CreateUserData, User } from "../../../../domain/entities/User";
import { IUserRepositories } from "../../../../interface/repositories/IUserRepositories";
import UserModel from "../models/UserModel";

export class MongoUserRepository  implements IUserRepositories {

   async create(user: CreateUserData): Promise<User> {
         const createdUser = await UserModel.create(user)
         return createdUser 
   }
   async findByEmail(email: string): Promise<User | null> {
       const existedUser = await UserModel.findOne({email})
       return existedUser
   }
   async findById(id: string): Promise<User | null> {
       const targetUser = await UserModel.findById(id)
       return targetUser
   }
   async  getAllUsers(): Promise<User[]> {
       const users = await UserModel.find()
       return users
   }
   
   
}