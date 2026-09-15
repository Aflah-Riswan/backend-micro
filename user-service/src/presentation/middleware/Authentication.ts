import { NextFunction , Request , Response } from "express";

import { ITokenService } from "../../interface/services/TokenService";

export class AuthenticationMiddleware {

    constructor( private tokenService : ITokenService){}
  
    authenticate(req : Request , res : Response , next : NextFunction){
        try {
            const header = req.headers.authorization
            if(!header){
                return res.json({
                    message : 'header is required'
                })
            }
            const token = header.split(' ')[1]
            const decoded = this.tokenService.verifyAccessToken(token)
            req.user = decoded
            next()
        } catch (error) {
              return res.status(401).json({
                message: "Invalid or expired token"
            });
        }
    }
    
}