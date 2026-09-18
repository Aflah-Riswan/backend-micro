import { NextFunction, Request, Response } from "express";

<<<<<<< Updated upstream
import { ITokenService } from "../../interface/services/TokenService.js";
=======
import { ITokenService } from "../../interface/services/TokenService";
import { AppError } from "../errors/AppError";
>>>>>>> Stashed changes

export class Authentication {
  constructor(private tokenService: ITokenService) {}

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    
      const header = req.headers.authorization;
      if (!header) {
       return next(
          new AppError(401, "Authorization header is required")
        );
      }
      const parts = header.split(" ");

      console.log("PARTS:", parts);

      const token = parts[1];

      console.log("TOKEN:", token);
      if (!token) {
        return next(
          new AppError(401, "Access token is required")
        );
      }
      console.log("before verify");

<<<<<<< Updated upstream
const decoded = this.tokenService.verifyAccessToken(token);

console.log("decoded:", decoded);
=======
    const decoded = this.tokenService.verifyAccessToken(token);
>>>>>>> Stashed changes
      req.user = decoded;
      next();
  };
}
