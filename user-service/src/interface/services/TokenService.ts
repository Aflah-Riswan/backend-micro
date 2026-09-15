 export interface TokenPayload {
   userId : string,
   role : string
 }

export interface ITokenService {
    generateAccessToken(payload: TokenPayload): string;
    verifyAccessToken(token: string): TokenPayload;
}