import { User, TokenPayload, LoginWithFacebookCredentials } from "../shared/types/User.types";
import { SaveUser, FindUserByEmail, SaveUserWithFacebook, SaveUserAccount } from "./auth.repository";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-then';
import config from "../../../config";
import { redisClient } from "../..";

export async function RegistrUserService(user: User)
{
    /// validate user info
    try{
        await SaveUser(user);
    }
    catch(error)
    {
        console.log(error);
        throw new Error(error)
    }
    
}

export async function AuthorizeUser(password: string, email: string) : Promise<{isSuccess: boolean, tokens: Object}>
{
    let user: User =  await FindUserByEmail(email);
    if(!bcrypt.compare(password, user.password))
    {
        return Promise.resolve({ isSuccess: false, tokens: {}});
    }
    let payload: TokenPayload ={
        user_id: user._id
    }
    let accessToken: string = await jwt.sign(payload, config.jwt_access_secret,{expiresIn : config.jwt_access_expire});
    let refreshToken: string = await jwt.sign(payload, config.jwt_refresh_secret,{expiresIn : config.jwt_refresh_expire} );

    /// Save  refresh Token to redis 
    redisClient.setex(`${payload.user_id}`, config.jwt_refresh_expire, refreshToken);
    
    return Promise.resolve({ isSuccess: true, tokens: {access: accessToken, refresh: refreshToken}} );
}

export async function LogoutService(token: string)
{
    let payload : TokenPayload  = <TokenPayload > await jwt.verify(token,config.jwt_access_secret);

    redisClient.del(`${payload.user_id}`);
}

export async function RefreshService(refreshToken: string) : Promise<string>
{
    let payload : TokenPayload = <TokenPayload> await jwt.verify(refreshToken, config.jwt_refresh_secret);

    if(redisClient.exists(`${payload.user_id}`))
    {
        return jwt.sign(payload, config.jwt_access_secret);
    }
    throw new Error("Not authorized");
}

export async function LoginWithFacebookService(credentials: LoginWithFacebookCredentials)
{
    try{
        let user: User = await SaveUserWithFacebook(credentials);
        SaveUserAccount("facebook",user);
    }
    catch(error)
    {
        throw error
    }
    
}