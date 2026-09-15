export interface IPasswordService {
    hash(password : string) : Promise<string>,
    compare(password : string) : Promise<boolean>
}