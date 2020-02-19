import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const AuthorSchema = Schema({
    Name : {
        type: String,
        required: true,
        unique: 'this author has already existed'
    }
});

export default mongoose.model("Author",AuthorSchema);