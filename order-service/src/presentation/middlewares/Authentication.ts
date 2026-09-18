import type { NextFunction, Request, Response } from "express";
import type { ITokenService } from "../../interface/services/ITokenService.js";
import { AppError } from "../errors/AppError.js";

export class Authenticate {
    constructor(
        private tokenService : ITokenService
    ){}
    authenticate = (req : Request , res : Response , next : NextFunction) => {
        try {
           const header = req.headers.authorization
            if(!header){
                throw new AppError(401, "Authorization header is required")
            }
           const token = header.split(' ')[1]

           if(!token){
                throw new AppError(401, "Access token is required")
            }

           const decoded = this.tokenService.verify(token)
           req.user = decoded
           req.accessToken = token
           next()
        } catch (error) {
            console.log(" error found in authenticate  : ",error)
            next(error)
        }
    }
}