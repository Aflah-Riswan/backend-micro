import { CreateUserData, User } from "../../domain/entities/User";

export interface IUserRepositories {
    // findById (id : string) : Promise<User>,
    create (user : CreateUserData) : Promise<User>,
    findByEmail(email : string) : Promise<User | null>,
    // update(user : Partial<User>) : Promise<User>
}