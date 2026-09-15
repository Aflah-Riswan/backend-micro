export type UserRole = 'admin' | 'user'

export interface User {
    id  : string ,
    name : string,
    email : string,
    password : string,
    role :  UserRole,
    createdAt : Date
}

export interface CreateUserInput {
    name : string,
    email : string,
    password : string,
}

export interface CreateUserData {
    name : string ,
    email : string,
    password : string,
    role :  UserRole
}