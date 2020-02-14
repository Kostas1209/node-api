import User from '../User/UserModel';
import { Request, Response, response, } from 'express';
import * as jwt from 'jwt-simple';
import config from '../../../config';

export default class{

    public Login = async(req:Request, resp: Response): Promise<any>  => {
        try{
            console.log(req.body);
            let credentials={
                email: req.body.email,
                password: req.body.password
            };

            let user = User.find({email: credentials.email},(error,result)=>{
                if(error)
                {
                    return resp.status(404).send({
                        success: false,
                        message: "Email or password is wrong"
                    })
                }
            });

            if(!user.IsPasswordValid(credentials.password))
            {
                return response.status(400).send({
                    success: false,
                    message: "Email or password is wrong"
                })
            }
            let payload = {
                user_id : user._id,
                expire: Date.now()
            }
            let accessToken = jwt.encode(payload, config.jwt_access_secret);
            let refreshToken = jwt.encode(payload, config.jwt_refresh_secret);


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
}