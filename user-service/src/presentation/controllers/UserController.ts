import {Request , Response, NextFunction } from "express";
import { CreateUser } from "../../application/use-case/CreateUser";
import { CreateUserInput } from "../../domain/entities/User";
import { LoginUser } from "../../application/use-case/LoginUser";
import { GetUserById } from "../../application/use-case/GetUserById";

export class UserController {
    constructor(
        private CreateUser : CreateUser,
        private LoginUser : LoginUser,
        private GetUserById : GetUserById
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
    loginUser = async(req : Request , res : Response , next : NextFunction) => {
       try {
        console.log("reached inside loginuser controller..")
        const response = await this.LoginUser.execute(req.body)
        return res.status(201).json(response)
       } catch (error) {
        next(error)
       }
    }
    getUserProfile = async (req : Request , res : Response , next : NextFunction) => {
        try {
            console.log("reached inside getUserById")
            const userId = req.user?.userId
            const response = await this.GetUserById.execute(userId as string)
            return res.json(response)
        } catch (error) {
            console.log("error found in in getuserNyiD : ",error)
            
        }
    }
}