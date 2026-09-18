import { CreateUserData, User } from "../../domain/entities/User";

export interface IUserRepositories {
    findById(id: string): Promise<User | null>;
    create(user: CreateUserData): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    getAllUsers(): Promise<User[]>;
}