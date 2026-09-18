import { LoginInputData } from "../../domain/entities/User.js";
import { IUserRepositories } from "../../interface/repositories/IUserRepositories.js";
import { IPasswordService } from "../../interface/services/PasswordService.js";
import { ITokenService } from "../../interface/services/TokenService.js";

export class LoginUser {
    constructor(
        private userRepo : IUserRepositories,
        private passwordService : IPasswordService,
        private tokenService : ITokenService
    ){}

    async execute(data : LoginInputData ) {
        const { email , password} = data
        const existingUser = await this.userRepo.findByEmail(email)
        if(!existingUser){
            return {
                message : 'user is not existed in this email or invalid email'
            }
        }
        const isMatch =  await this.passwordService.compare(password , existingUser.password)
        if(!isMatch){
            return {
                message : 'Invalid password try again'
            }
        }
        
        const payload = {
            userId : existingUser.id,
            role : existingUser.role
        }
        console.log("payload is : ",payload)
       const token = this.tokenService.generateAccessToken(payload)
        return {
            message : ` hello ${existingUser.name} welcome to home`,
            token
        }
    }
}