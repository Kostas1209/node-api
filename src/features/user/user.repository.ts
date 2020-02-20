import UserModel from '../shared/db-models/User';
import { User, UserForChanging } from '../shared/types/User.types';

export async function GetUserByID(user_id : string) : Promise<User>
{
    return UserModel.findById(user_id);
} 

export async function ChangeUserById(user_id: string, changingInfo: UserForChanging)
{
    let user: User = await UserModel.findById(user_id);
    let data: UserForChanging ={
            email : changingInfo.email ? changingInfo.email : user.email,
            username : changingInfo.username ? changingInfo.username : user.email,
            avatar : changingInfo.avatar ? changingInfo.avatar : user.avatar,
            firstName : changingInfo.firstName ? changingInfo.firstName : user.firstName,
            lastName : changingInfo.lastName ? changingInfo.lastName : user.lastName
    }
    await UserModel.findByIdAndUpdate(user_id, data, 
        (error, success) =>{
            if(error)
            {
                throw new Error(error);
            }
        }
    );
}