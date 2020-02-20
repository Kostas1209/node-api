import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../config';

export const authAuthorizedOnly = async (req: Request, resp: Response, next: any) =>{
    let token : string  = req.headers.authorization 
    //console.log(token);
    
    if(!token)
    {
        return resp.status(403).send({success : false, auth: false, message: "No token provided"});
    }

    token = token.replace("Bearer ","");
    try{
        const decode  = await jwt.verify(token, config.jwt_access_secret);
        next();
    }
    catch (error){
        resp.status(500).send({success: false, auth: false,message: error.toString()})
    }
}

export const authAllowAny = async(req: Request, resp: Response, next: any) =>{
    let token : string  = req.headers.authorization; 

    if(token)
    {
        token = token.replace("Bearer ","");
        try{
            const decode  = await jwt.verify(token, config.jwt_access_secret);
        }
        catch(error)
        {
            return resp.status(500).send({
                success: false,
                auth: false,
                message: error.toString()
            })
        }
    }
    next()
}

export const logger = async(req:Request, resp: Response, next: any) =>{
    console.log(req.url +' ' + req.method + ' ');
    next();
}