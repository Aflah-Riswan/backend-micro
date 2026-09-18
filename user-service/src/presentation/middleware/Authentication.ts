import { NextFunction, Request, Response } from "express";

import { ITokenService } from "../../interface/services/TokenService.js";
import { AppError } from "../errors/AppError.js";

export class Authentication {
    constructor(
        private tokenService: ITokenService
    ) {}

    authenticate = (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const header = req.headers.authorization;

            if (!header) {
                return next(
                    new AppError(401, "Authorization header is required")
                );
            }

            const parts = header.split(" ");
            const token = parts[1];

            if (!token) {
                return next(
                    new AppError(401, "Access token is required")
                );
            }

            const decoded = this.tokenService.verifyAccessToken(token);

            req.user = decoded;

            next();

        } catch (error) {
            next(
                new AppError(401, "Invalid or expired token")
            );
        }
    };
}