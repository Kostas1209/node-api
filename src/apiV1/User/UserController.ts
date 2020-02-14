import { Request, Response, } from 'express';
import User from './UserModel';
import * as bcrypt from 'bcrypt';
import { SALT } from '../../index';

export default class{
    public GetUserInfo = async(req :Request, resp: Response) => {
        try{
            /// Check jwt and get user_id

            const user_id = "";
            const user = await User.find({'_id' : user_id}, 'first_name last_name email username');
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
        
        const user = new User({
            password: bcrypt.hashSync(req.body.password, SALT),
            email: req.body.email,
            username : req.body.username,
            first_name: req.body.first_name,
            last_name: req.body.last_name
        })

        user.save();

        return resp.status(200).send({
            success: true,
            data: "User was singed up"
        })
    }
} 