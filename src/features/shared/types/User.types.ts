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

export interface UserForChanging
{
    email ?: string,
    username ?: string,
    avatar ?: string,
    firstName ?: string,
    lastName ?: string 
}

export interface LoginWithFacebookCredentials
{
    firstName: string,
    lastName: string,
    userId : string
}