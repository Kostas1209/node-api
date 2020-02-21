import { Request , Response } from "express";
import { User, UserForChanging } from "../shared/types/User.types";
import { GetUser, ChangeUserService, GetUserAvatarService } from "./user.service";


export async function GetUserInfoHandler(req: Request, resp: Response)
{
    let token : string = req.headers.authorization.replace("Bearer ",""); 

    let user: User = await GetUser(token);
    return resp.status(200).send({
        success: true,
        email: user.email,
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar
    })
}

export async function GetUserAvatarHandler(req: Request, resp: Response )
{
    let token : string = req.headers.authorization.replace("Bearer ",""); 

    try{
        let user : User = await GetUserAvatarService(token);
        console.log(user);
        return resp.status(200).send({
            success: true,
            image: user.avatar
        })
    }
    catch(error)
    {
        return resp.status(500).send({
            success: false,
            message: "Not found",
            image: null
        })
    }

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