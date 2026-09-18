import { IUserRepositories } from "../../interface/repositories/IUserRepositories.js";

export class GetAllUsers {
  constructor(private userRepo :  IUserRepositories){}
  
  async execute () {
    const users = await this.userRepo.getAllUsers()
    return users
  }
}