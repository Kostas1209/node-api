import { User } from "../shared/types/User.types";
import UserModel from "../shared/db-models/User";
import {hash, hashSync} from 'bcrypt';
import { SALT } from "../..";

export async function SaveUser(user: User)
{
    let hashedPassword : string = await hash(user.password, SALT);
    await UserModel.create({
        password: hashedPassword,
        email: user.email,
        username: user.username,
        avatar: user.avatar,
        firstName: user.firstName,
        lastName: user.lastName
    })
    return Promise
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