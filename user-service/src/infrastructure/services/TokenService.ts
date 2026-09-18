
import jwt from 'jsonwebtoken'
import { ITokenService, TokenPayload } from "../../interface/services/TokenService.js";

export class TokenService implements ITokenService {
    private readonly accessToken : string
    constructor(){
        this.accessToken = process.env.ACCESS_TOKEN_SECRET as string
    }
    generateAccessToken(payload : TokenPayload): string {
        const token =  jwt.sign(payload , this.accessToken)
        return token
    }
    verifyAccessToken(token: string): TokenPayload {
        return jwt.verify(token,this.accessToken) as TokenPayload
    }
}