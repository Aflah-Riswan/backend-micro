export type UserRole = "admin" | "user";

export interface TokenPayload {
    userId: string;
    role: UserRole;
}

export interface ITokenService {
    generateAccessToken(payload: TokenPayload): string;
    verifyAccessToken(token: string): TokenPayload;
}