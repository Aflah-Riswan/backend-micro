import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";

export class Authorization {
    authorize = (req : Request , res : Response , next : NextFunction) => {
        
            const header = req.headers.authorization
            if(!header){
               throw new Error("header is required")
            }
    
                console.log(req.user)
            console.log("reached here....")

            if(req.user?.role !== 'admin'){
                return next(
                new AppError(403, "Access denied")
            );
            }
            next()
        
    }
}