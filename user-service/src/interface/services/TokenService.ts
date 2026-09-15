export interface ITokenService {
    generate(userId : string , role : string) : string,
    verify(token:string) : boolean
}