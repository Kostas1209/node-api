import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const BookSchema = Schema(
    {
        title:{
            type: String,
            required: true,
        },
        author:{
            type: String,
            required: true,
        },
        amount_in_storage:{
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }
    
)

export default mongoose.model("Book", BookSchema);