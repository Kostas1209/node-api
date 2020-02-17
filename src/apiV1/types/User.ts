export interface IUser{
    _id: string
    password: string,
    email: string,
    username: string,
    first_name: string,
    last_name: string,
    isPasswordValid: (string)=> boolean
}