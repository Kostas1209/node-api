import { Request, Response, response, } from 'express';
import User from './UserModel';
import * as bcrypt from 'bcrypt';
import { SALT } from '../../index';
import config from '../../../config';
import * as jwt from 'jwt-then';
import { IUser } from '../types/User';
import {ITokenPayload} from '../types/TokenPayload';


export default class{
    public GetUserInfo = async(req :Request, resp: Response) => {
        try{
            /// Check jwt and get user_id

            const user_id = "5e467e8901ab6232b01246da";
            const user = await User.find({'_id' : user_id}, ' first_name last_name email username');
            if(!user)
            {
                return resp.status(404).send({
                    success: false,
                    message: "User not found",
                    data: null
                })
            }

            resp.status(200).send({
                success: true,
                data: user
            })
        }
        catch(error){
            resp.status(500).send(
                {
                    success: false,
                    message: error.toString(),
                    data: null
                }
            )
        }
    }

    public RegistrUser = async(req: Request, resp: Response) => {
        ///check valid
        try{
            const user = new User({
                password: bcrypt.hashSync(req.body.password, SALT),
                email: req.body.email,
                username : req.body.username,
                first_name: req.body.first_name,
                last_name: req.body.last_name
            })
            user.save((error,success)=>{
                if(error){
                    return resp.send({
                        success: false,
                        data: error.errmsg
                    });
                } 
                console.log(success);
                return resp.status(200).send({
                    success: true,
                    data: "User was singed up"
                })
            });
        }
        catch(error){
            resp.status(500).send(
                {
                    success: false,
                    message: error.toString(),
                    data: null
                }
            )
        }
    }

    public Login = async(req:Request, resp: Response): Promise<any>  => {
        try{
            let credentials={
                email: req.body.email,
                password: req.body.password
            };
            console.log(credentials)
            let user : IUser = await User.findOne({email: credentials.email},(error,result)=>{
                if(error)
                {
                    return resp.status(404).send({
                        success: false,
                        message: "Email or password is wrong"
                    })
                }
            });
            if(!user.isPasswordValid(credentials.password))
            {
                return response.status(400).send({
                    success: false,
                    message: "Email or password is wrong"
                })
            }
            let payload : ITokenPayload = {
                user_id : user._id
            }
            let accessToken = await jwt.sign(payload, config.jwt_access_secret,{expiresIn : config.jwt_access_expire});
            let refreshToken = await jwt.sign(payload, config.jwt_refresh_secret,{expiresIn : config.jwt_refresh_expire} );


            return resp.status(200).send({
                success: true,
                data: {
                    access: accessToken,
                    refresh: refreshToken
                }
            })
        }
        catch(error)
        {
            resp.status(500).send(
                {
                    success: false,
                    message: error.toString(),
                    data: null
                }
            )
        }
    }

    public ChangeUserInfo = async(req: Request, resp: Response) => {
        /*
        *
        *    require   email OR first_name  OR last_name  OR  username  
        */
        try{
            const token : string  = req.headers.authorization.replace("Bearer ",""); 
            const decode : ITokenPayload = <ITokenPayload>await jwt.verify(token, config.jwt_access_secret);
            console.log(decode);
            
            if(!user)
            {
                return resp.status(404).send({
                    success: false,
                    message: "User not found",
                    data: null
                })
            }
            console.log(req.body);
            if(req.body.email)
            {
                user.email = req.body.email;
            }
            if(req.body.first_name)
            {
                user.first_name = req.body.first_name;
            }
            if(req.body.last_name)
            {
                user.last_name = req.body.last_name;
            }
            if(req.body.username)
            {
                user.username = req.body.username;
            }

            user.save((error,success)=>{
                if(error){
                    return resp.send({
                        success: false,
                        data: error.errmsg
                    });
                } 
                console.log(success);
                return resp.status(200).send({
                    success: true,
                    data: "User was changed"
                })
            });
        }
        catch(error){
            resp.status(500).send(
                {
                    success: false,
                    message: error.toString(),
                    data: null
                }
            )
        }
    }
} 