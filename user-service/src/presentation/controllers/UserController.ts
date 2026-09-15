import {Request , Response, NextFunction } from "express";
import { CreateUser } from "../../application/use-case/CreateUser";
import { CreateUserInput } from "../../domain/entities/User";

export class UserController {
    constructor(
        private CreateUser : CreateUser
    ){}
    createUser = async (req : Request , res : Response , next : NextFunction) =>{
       try {
        console.log("reached here")
         const userData : CreateUserInput  = req.body
         const response = await this.CreateUser.execute(userData)
         return res.status(201).json(response)
       } catch (error) {
        console.log(" error found in user creating : ",error)
        next(error)
       }
    }
}