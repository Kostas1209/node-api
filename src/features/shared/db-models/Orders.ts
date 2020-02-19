import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrdersSchema = Schema({
    Date : {
        type: Date,
    },
    user_id:{
        type: String,
        ref: "User",
        required: true
    },
    items: {
        printingEditiion_id: {type: String, required: true},
        count: {type: Number, required: true, min: 1},
        price: {type: Number, required: true, min: 1},
        currency: {type: String, required: true}
    },
    paymentInfo: {
        transactionId: {type: String}
    }
})

export default mongoose.model("Order", OrdersSchema);