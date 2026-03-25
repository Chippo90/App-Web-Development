//Import mongoose
const mongoose = require("mongoose");
//Define order schema
const orderSchema = new mongoose.Schema({

    //Items
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: Number
        }
    ],

    //Total amount
    totalAmount: {
        type: Number,
        required: true
    },

    //Payment status
    paymentStatus: {
        type: String,
        default: "Pending"
    },

    //Date
    createdAt: {
        type: Date,
        default: Date.now
    }

});

//Export model
module.exports = mongoose.model("Order", orderSchema);