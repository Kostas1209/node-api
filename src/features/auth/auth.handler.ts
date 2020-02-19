import { Request, Response, } from 'express';
import { User, UserCredentials } from '../shared/types/User.types';
import { RegistrUserService, AuthorizeUser } from './auth.service';

export async function RegistrUserHandler(req: Request, resp: Response): Promise<any>
{
    /*
    *   request must contain  'email', 'username', 'password'
    *   and to addition can contain 'avatar', 'firstName', 'lastName'
    */

    let user : User = {
        email: req.body.email,
        password: req.body.password,
        username: req.body.username,
        avatar: req.body.avatar,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    }
    try{
        await RegistrUserService(user);
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