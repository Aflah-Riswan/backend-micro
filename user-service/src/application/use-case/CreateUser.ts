import { CreateUserData, CreateUserInput } from "../../domain/entities/User.js";
import { IUserRepositories } from "../../interface/repositories/IUserRepositories.js";
import { IPasswordService } from "../../interface/services/PasswordService.js";
import { ITokenService, TokenPayload } from "../../interface/services/TokenService.js";
import { AppError } from "../../presentation/errors/AppError.js";

export class CreateUser {
    constructor( 
        private userRepo : IUserRepositories,
        private passwordService : IPasswordService,
       
    ){}
   
    async execute(data : CreateUserInput){
        const existingUser = await this.userRepo.findByEmail(data.email);
        if(existingUser){
              throw new AppError(409, "Email already exists");
        }
        const { password } = data
        const hashedPassword = await this.passwordService.hash(password)
        const newUser : CreateUserData = {
            ...data,
            password : hashedPassword,
            role : 'user'
        }
        
        const user = await this.userRepo.create(newUser)
        return user
    }
}