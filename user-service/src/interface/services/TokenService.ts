 export interface TokenPayload {
   userId : string
 }

export interface ITokenService {
    generateAccessToken(payload: TokenPayload): string;
    verifyAccessToken(token: string): TokenPayload;
}