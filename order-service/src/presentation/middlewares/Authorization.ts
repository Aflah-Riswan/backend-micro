import type { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError.js";


export class Authorization  {
    authorize = (req : Request , res : Response , next : NextFunction) => {
            const header = req.headers.authorization
            if(!header){
                 return next(
                new AppError(403, " header is missing")
              );
            }
           
            if(req.user?.role !== 'admin'){
                return next(
                new AppError(403, "Access denied")
            );
            }
            next()
        
    }
}