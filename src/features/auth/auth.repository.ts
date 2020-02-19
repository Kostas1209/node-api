import { User } from "../shared/types/User.types";
import UserModel from "../shared/db-models/User";
import { SALT } from "../..";
import * as bcrypt from 'bcrypt';

export function SaveUser(user: User)
{
    UserModel.create({
        password: bcrypt.hashSync(user.password,SALT),
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName
    })
}

export async function FindUserByEmail(email: string)
{
    return UserModel.findOne({email: email},(error,result)=>{
        if(error)
        {
            throw new Error("Email or password is wrong");
        }
    });
}