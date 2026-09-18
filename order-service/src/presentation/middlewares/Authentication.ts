import type { NextFunction, Request, Response } from "express";
import type { ITokenService } from "../../interface/services/ITokenService.js";

export class Authenticate {
    constructor(
        private tokenService : ITokenService
    ){}
    authenticate = (req : Request , res : Response , next : NextFunction) => {
        try {
           const header = req.headers.authorization
           if(!header){
            return res.json({
                message : 'header is required'
            })
           }
           const token = header.split(' ')[1]
           if(!token){
            return res.json({
                message : 'access denied'
            })
           }
           const decoded = this.tokenService.verify(token)
           req.user = decoded
           req.accessToken = token
           next()
        } catch (error) {
            console.log(" error found in authenticate  : ",error)
        }
    }
}