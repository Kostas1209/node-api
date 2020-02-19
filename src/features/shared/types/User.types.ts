export interface User
{
    _id?: string,
    email: string,
    password: string,
    username: string,
    firstName ?: string,
    lastName ?: string,
    avatar ?: string
}

export interface UserCredentials
{
    email: string,
    password: string
}

export interface TokenPayload
{
    user_id : string
}