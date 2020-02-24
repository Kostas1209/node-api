import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserAccountsSchema = Schema({
    socialNetwork:{
        type: String,
        enum: ["facebook", "google"],
        required: true
    },
    userId: {
        type: {type: String, ref: "User"},
    }
})

export default mongoose.model("UserAcount",UserAccountsSchema);