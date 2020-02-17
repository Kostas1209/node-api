import { Request, Response } from 'express';
import * as jwt from 'jwt-then';
import config from '../../config';
import { ITokenPayload } from './types/TokenPayload';

export const auth = async (req: Request, resp: Response, next: any) =>{
    const token : string  = req.headers.authorization.replace("Bearer ",""); 
    console.log(token);
    
    if(!token)
    {
        return resp.status(403).send({success : false, auth: false, message: "No token provided"});
    }

    try{
        const decode  = await jwt.verify(token, config.jwt_access_secret);
        console.log("token payload" + decode);
        next();
    }
    catch ( error){
        resp.status(500).send({success: false, auth: false,message: error.toString()})
    }
    
}