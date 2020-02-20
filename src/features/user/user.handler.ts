import { Request , Response } from "express";
import { User, UserForChanging } from "../shared/types/User.types";
import { GetUser, ChangeUserService } from "./user.service";


export async function GetUserInfoHandler(req: Request, resp: Response)
{
    let token : string = req.headers.authorization.replace("Bearer ",""); 

    let user: User = await GetUser(token);
    const returnedData = {
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
    }
    return resp.status(200).send({
        success: true,
        data: returnedData
    })
}

export async function ChangeUserInfoHandler(req: Request, resp: Response)
{
    let token : string = req.headers.authorization.replace("Bearer ",""); 

    const changeInfo: UserForChanging ={
        email: req.body.email,
        username: req.body.username,
        avatar: req.body.avatar,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    };
    try{
        ChangeUserService(token, changeInfo);
        return resp.status(200).send({
            success: true,
            message: "User change successfully"
        })
    }
    catch(error){
        return resp.status(500).send({
            success: false,
            message: error.toString()
        })
    }


}