export interface TokenPayload {
    userId : string ,
    role : string
}

export interface ITokenService {
    verify(token:string) : TokenPayload
}
