import { IPasswordService } from "../../interface/services/PasswordService";
import bcrypt from 'bcrypt'

export class PasswordService implements IPasswordService {
    async hash(password: string): Promise<string> {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds)
        const hashedPassword = await bcrypt.hash(password , salt)
        return hashedPassword
    }
    
}