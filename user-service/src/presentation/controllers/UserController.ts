import {Request , Response, NextFunction } from "express";
import { CreateUser } from "../../application/use-case/CreateUser.js";
import { CreateUserInput } from "../../domain/entities/User.js";
import { LoginUser } from "../../application/use-case/LoginUser.js";
import { GetUserById } from "../../application/use-case/GetUserById.js";
import { GetAllUsers } from "../../application/use-case/GetAllUsers.js";

export class UserController {
    constructor(
        private CreateUser : CreateUser,
        private LoginUser : LoginUser,
        private GetUserById : GetUserById,
        private GetAllUsers : GetAllUsers
    ){}
    createUser = async (req : Request , res : Response , next : NextFunction) =>{
       try {
        console.log("reached here")
         const userData : CreateUserInput  = req.body
         const user = await this.CreateUser.execute(userData)
         return res.status(201).json(
            { success: true, message: "User created successfully", data: user }
          );
       } catch (error) {
         console.log(" error found in user creating : ",error)
        next(error)
       }
    }
    loginUser = async(req : Request , res : Response , next : NextFunction) => {
       try {
        console.log("reached inside loginuser controller..")
        const result = await this.LoginUser.execute(req.body)
        return res.status(200).json(
            { success: true, message: "Login successful", data: result 
            });
       } catch (error) {
          next(error)
       }
    }
    getUserProfile = async (req : Request , res : Response , next : NextFunction) => {
        try {
            console.log("reached inside getUserById")
            const userId = req.user?.userId
            const user = await this.GetUserById.execute(userId as string)
            return res.status(200).json({
                 success: true, message: "User retrieved successfully", data: user 
                });
        } catch (error) {
            console.log("error found in in getuserNyiD : ",error)
            next(error)
            
        }
    }
    getAllUsers = async (req : Request , res : Response , next : NextFunction) =>{
        try {
            console.log("reached inside getAllUsers")
            const response = await this.GetAllUsers.execute()
            return res.status(201).json({
                message : 'users details for admin',
                data : response
            })
        } catch (error) {
            console.log("error found in in getAllUsers : ",error)
        }
    }
    getUserById = async (req : Request , res : Response , next : NextFunction) =>{
        try {
            console.log("reached isnide getuserbyid")
            const id = req.params.id
            const users = await this.GetUserById.execute(id as string)
           return res.status(200).json({ 
            success: true, message: "Users retrieved successfully", data: users 
        });
        } catch (error) {
            console.log("error found in getuserById ",error)
            next(error)
        }

    }
}