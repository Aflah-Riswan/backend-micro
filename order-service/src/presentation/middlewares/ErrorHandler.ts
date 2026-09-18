import type { NextFunction, Request, Response } from "express";
import { appendFile } from "fs";
import { AppError } from "../errors/AppError.js";

export const errorHandler = (
    error : Error,
    req : Request,
    res : Response,
    next : NextFunction
) => {
    console.log(" error found  : ",error)
    if(error instanceof AppError) {
        return res.status(error.statusCode).json({
            success : false,
            message : error.message
        })
    }
    return res.status(500).json({
        success : false,
        message : "Internal Server error"
    })
}