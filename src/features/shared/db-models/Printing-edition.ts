import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const PrintingEditionSchema = Schema({
    title: {
        type: String,
        required: true,
        maxLength: 50
    },
    description: {
        type: String,
        required: true,
        maxLength: 200
    },
    coverImage: {
        type: String
    },
    price:{
        type: Number,
        required: true
    },
    amountInStorage: {
        type: Number,
        required: true
    },
    authorIds :[{type: String, ref: "Author"}]
})

export default mongoose.model("Book", PrintingEditionSchema);