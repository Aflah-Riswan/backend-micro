import { IUserRepositories } from "../../interface/repositories/IUserRepositories";

export class GetUserById {
    constructor( private userRepo : IUserRepositories){}
    async execute(id : string){
       const targetUser = await this.userRepo.findById(id)
       if(!targetUser){
        return  {
           message : 'user is not existing'
        }
       }
       return targetUser
    }
}