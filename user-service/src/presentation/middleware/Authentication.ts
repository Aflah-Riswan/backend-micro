import { NextFunction, Request, Response } from "express";

import { ITokenService } from "../../interface/services/TokenService.js";

export class Authentication {
  constructor(private tokenService: ITokenService) {}

  authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
      const header = req.headers.authorization;
      if (!header) {
        return res.json({
          message: "header is required",
        });
      }
      const parts = header.split(" ");

      console.log("PARTS:", parts);

      const token = parts[1];

      console.log("TOKEN:", token);
      if (!token) {
        return res.status(401).json({
          message: "access denied ",
        });
      }
      console.log("before verify");

const decoded = this.tokenService.verifyAccessToken(token);

console.log("decoded:", decoded);
      req.user = decoded;
      next();
    } catch (error) {
      console.log(" error found : ", error);
      return res.status(401).json({
        message: "Invalid or expired token",
      });
    }
  };
}
