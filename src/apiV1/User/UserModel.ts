import * as mongoose from "mongoose";
import * as bcrypt from 'bcrypt';
import { SALT } from '../../index';

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
            unique: 'this email has already existed'
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

UserSchema.methods.IsPasswordValid = function(password: string)
{
    let crypt : string = bcrypt.hashSync(password, SALT);
    return crypt === this.password;
}

export default mongoose.model("User", UserSchema);