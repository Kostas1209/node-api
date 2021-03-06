import { Request, Response, } from 'express';
import { User, UserCredentials, LoginWithFacebookCredentials } from '../shared/types/User.types';
import { RegistrUserService, AuthorizeUser, LogoutService, RefreshService, LoginWithFacebookService } from './auth.service';
import { TokensType } from '../shared/types/Tokens';

export async function RegistrUserHandler(req: Request, resp: Response): Promise<any>
{
    /*
    *   request must contain  'email', 'username', 'password'
    *   and to addition can contain 'avatar', 'firstName', 'lastName'
    */

    
    try{
        console.log(req.body);
        let user : User = {
            email: req.body.email,
            password: req.body.password,
            username: req.body.username,
            avatar: req.body.avatar,
            firstName: req.body.firstName,
            lastName: req.body.lastName
        }
        console.log(user);
        RegistrUserService(user);
        return resp.status(200).send({
            success: true,
            data: "User was saved successfully"
        })
    }
    catch(error)
    {
        return resp.status(500).send(
            {
                success: false,
                message: error.toString(),
                data: null
            }
        )
    }
}

export async function LoginUserHandler(req: Request, resp: Response): Promise<any>
{
    /*
    *    request must contain 'email' and 'password'
    */

    try{
        let credentials: UserCredentials ={
            email : req.body.email,
            password: req.body.password
        }
        let tokens : {isSuccess: boolean, tokens: Object} = await AuthorizeUser(credentials.password, credentials.email);
        console.log(`User ${credentials.email} has loged in`);
        return resp.status(200).send({
            success: true,
            data: tokens.tokens
        })
    } 
    catch(error)
    {
        return resp.status(500).send(
            {
                success: false,
                message: error.toString(),
                data: null
            }
        )
    }
}

export async function LogoutUserHandler(req: Request, resp: Response): Promise<any>
{
    let token : string = req.headers.authorization.replace("Bearer ",""); 
    try{
        LogoutService(token);
        return resp.status(200).send({
            success: true,
            message: "User was logout"
        });
    }
    catch(error)
    {
        return resp.status(500).send({
            success: false,
            message: error.toString()
        });
    }
    
}

export async function RefreshTokenHandler(req: Request , resp: Response): Promise<any>
{
    /*
    *    request must contains 'refreshToken'
    */
    let refreshToken : string = req.body.refreshToken
    
    try{
        let accessToken: string = await RefreshService(refreshToken);
        
        return resp.status(200).send({
            success: true,
            access: accessToken
        })
    }
    catch(error)
    {
        return resp.status(500).send({
            success: false,
            message: error.toString()
        })
    }
}

export async function LoginWithFacebookHandler(req: Request, resp: Response) : Promise<any>
{
    /*
    *   must contain 'userId', 'lastName', 'firstName'
    */

    let receivedData : LoginWithFacebookCredentials = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userId: req.body.userId
    }

    try{
        let tokens : any = await LoginWithFacebookService(receivedData);
        console.log(tokens);
        return resp.status(200).send({
            success: true,
            access: tokens.access,
            refresh: tokens.refresh,
            message: "Successfully create"
        })
    }
    catch(error)
    {
        console.log(error);
        return resp.status(500).send({
            success:false,
            message: error.toString()
        })
    }
}