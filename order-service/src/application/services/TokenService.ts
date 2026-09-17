import jwt from "jsonwebtoken";
import type { ITokenService, TokenPayload } from "../../interface/services/ITokenService.js";

export class TokenService implements ITokenService {
    private readonly JWT_SECRET : string
    constructor(){
        this.JWT_SECRET = process.env.ACCESS_TOKEN_SECRET as string
    }
    verify(token: string): TokenPayload {
        const decoded = jwt.verify(token , this.JWT_SECRET)
        return decoded as TokenPayload
    }

}