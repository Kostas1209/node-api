import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { SALT } from '../../index';
import * as validator from 'validator';

const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            requered: true,
            unique: 'this username has already existed'
        },
        email: {
            type: String,
            requered: true,
            unique: 'this email has already existed',
            validate: (value) => {
                if(!validator.isEmail(value)){
                    throw new Error('Invalid Email')
                }
            }
        },
        first_name: {
            type: String,
            requered: false
        },
        last_name: {
            type: String,
            requered: false
        }
    }   
)

UserSchema.methods.isPasswordValid = function(password: string) : boolean
{
    let compare = bcrypt.compare(password, this.password);
    return compare;
};

export default mongoose.model("User", UserSchema);