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

export async function FindUserByEmail(email: string) : Promise<User>
{
    let user: User = await UserModel.findOne({email: email});
    return user
}
export async function FindUserByUsername(username: string) : Promise<User>
{
    let user: User = await UserModel.findOne({username: username});
    return user
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
    console.log(user._id);
    return UserAccountsModel.create({
        socialNetwork: nameSocialNetwork,
        userId: user._id
    })
}

export async function FindUserAccountById(user_id : string)
{
    return 
}