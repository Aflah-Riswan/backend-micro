import { NextFunction, Request, Response } from "express";

export class Authorization {
    authorize = (req : Request , res : Response , next : NextFunction) => {
        try {
            const header = req.headers.authorization
            if(!header){
                return res.json({
                    message : ' authentication is required'
                })
            }
            if(req.user?.role !== 'admin'){
               return res.json({
                 message  :'access denied'
               })
            }
            next()
        } catch (error) {
            console.log(" found error  in authorization : ",error)
            return res.json({
                message : " found error  in authorization : "
            })
        }
    }
}