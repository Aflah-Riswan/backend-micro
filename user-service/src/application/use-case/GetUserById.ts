import { IUserRepositories } from "../../interface/repositories/IUserRepositories.js";
import { AppError } from "../../presentation/errors/AppError.js";

export class GetUserById {
    constructor( private userRepo : IUserRepositories){}
    async execute(id : string){
       const targetUser = await this.userRepo.findById(id)
       if(!targetUser){
        throw new AppError(409, "Email already exists");
       }
       return targetUser
    }
}