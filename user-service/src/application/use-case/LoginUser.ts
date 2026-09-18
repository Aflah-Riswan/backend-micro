
import { LoginInputData } from "../../domain/entities/User.js";
import { IUserRepositories } from "../../interface/repositories/IUserRepositories.js";
import { IPasswordService } from "../../interface/services/PasswordService.js";
import { ITokenService } from "../../interface/services/TokenService.js";
import { AppError } from "../../presentation/errors/AppError.js";

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
            throw new AppError(404, "User is not existed in this email");
        }
        const isMatch =  await this.passwordService.compare(password , existingUser.password)
        if(!isMatch){
            throw new AppError(401, "Invalid Password");
        }
        
        const payload = {
            userId : existingUser.id,
            role : existingUser.role
        }
       
       const token = this.tokenService.generateAccessToken(payload)
        return {
            token
        }
    }
}