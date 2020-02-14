
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = Schema(
    {
        password: {
            type: String,
            required: true
        },
        username: {
            type: String,
            requered: true
        },
        email: {
            type: String,
            requered: true
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

export default mongoose.model("User", UserSchema);