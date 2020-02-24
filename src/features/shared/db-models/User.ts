import * as mongoose from "mongoose";
import * as validator from 'validator';

const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        password: {
            type: String,
        },
        username: {
            type: String,
            unique: 'this username has already existed'
        },
        email: {
            type: String,
            unique: 'this email has already existed',
            validate: (value) => {
                if(!validator.isEmail(value)){
                    throw new Error('Invalid Email')
                }
            }
        },
        firstName: {
            type: String,
        },
        lastName: {
            type: String,
        },
        avatar:{
            type: String,
        }
    }   
)

export default mongoose.model("User", UserSchema);