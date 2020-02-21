import { User, TokenPayload, UserForChanging } from "../shared/types/User.types";
import * as jwt from "jwt-then";
import config from '../../../config';
import { GetUserByID, ChangeUserById } from "./user.repository";

export async function GetUser(token: string): Promise<User>
{
    let payload : TokenPayload  = <TokenPayload > await jwt.verify(token,config.jwt_access_secret);
    let user: User = await GetUserByID(payload.user_id);

    return user
}

export async function ChangeUserService(token: string, changeInfo: UserForChanging)
{
    let payload : TokenPayload  = <TokenPayload > await jwt.verify(token,config.jwt_access_secret);

    try{
        ChangeUserById(payload.user_id, changeInfo);
    }
    catch(error)
    {
        throw new Error(error);
    }

}