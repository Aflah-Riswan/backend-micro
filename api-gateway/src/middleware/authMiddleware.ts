import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        message: "Authorization header missing",
      });
    }
    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Token missing",
      });
    }
     try {
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

        next();
    } catch (error) {
        console.log("error : ",error)
        return res.status(401).json({
            message: "Invalid or expired token"
        });
    }
};
