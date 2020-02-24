import { User, LoginWithFacebookCredentials } from "../shared/types/User.types";
import UserModel from "../shared/db-models/User";
import UserAccountsModel from "../shared/db-models/UserAccounts";
import {hash} from 'bcrypt';
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

export async function SaveUserWithFacebook(credentials: LoginWithFacebookCredentials): Promise<User>
{
    return UserModel.create({
        username: "facebook:" + credentials.userId,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
    })
}

export async function SaveUserAccount(nameSocialNetwork: string, user: User)
{
    return UserAccountsModel.create({
        socialNetwork: nameSocialNetwork,
        userId: user._id
    })
}