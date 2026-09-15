import { CreateUserData, User } from "../../../../domain/entities/User";
import { IUserRepositories } from "../../../../interface/repositories/IUserRepositories";
import UserModel from "../models/UserModel";

export class MongoUserRepository  implements IUserRepositories {

   async create(user: CreateUserData): Promise<User> {
         const createdUser = await UserModel.create(user)
         return createdUser 
   }
   
   
}