import { CreateUserData, CreateUserInput } from "../../domain/entities/User";
import { IUserRepositories } from "../../interface/repositories/IUserRepositories";
import { IPasswordService } from "../../interface/services/PasswordService";
import { ITokenService } from "../../interface/services/TokenService";

export class CreateUser {
    constructor( 
        private userRepo : IUserRepositories,
        private passwordService : IPasswordService,
        private tokenService : ITokenService
    ){}
   
    async execute(data : CreateUserInput){
        const { password } = data
        const hashedPassword = await this.passwordService.hash(password)
        const newUser : CreateUserData = {
            ...data,
            password : hashedPassword,
            role : 'user'
        }
        const user = await this.userRepo.create(newUser)
        const { id , role} = user
        const token = this.tokenService.generate(id , role)
        return {
            user ,
            token
        }
    }
}