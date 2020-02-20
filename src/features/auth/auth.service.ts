import { User, TokenPayload } from "../shared/types/User.types";
import { SaveUser, FindUserByEmail } from "./auth.repository";
import * as bcrypt from 'bcrypt';
import * as jwt from 'jwt-then';
import config from "../../../config";
import { redisClient } from "../..";

export function RegistrUserService(user: User)
{
    /// validate user info
    SaveUser(user);
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