import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./authMiddleware.js";

export const gatewayAuth = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const isPublicRoute =
        req.method === "POST" &&
        (
            req.path === "/api/auth/login" ||
            req.path === "/api/auth/register"
        );

    if (isPublicRoute) {
        return next();
    }

    return authMiddleware(req, res, next);
};