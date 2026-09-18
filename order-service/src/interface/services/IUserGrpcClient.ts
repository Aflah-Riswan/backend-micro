
export interface IUserGrpcClient {
  getCurrentUser (accessToken : string) : Promise <{ userId : string, role : string}>
}