//Import mongoose
const mongoose = require("mongoose");
//Define product schema
const productSchema = new mongoose.Schema({

    //Name
    name: {
        type: String,
        required: true
    },

    //Brand
    brand: {
        type: String,
        required: true
    },

    //Price
    price: {
        type: Number,
        required: true
    },

    //Category
    category: {
        type: String,
        required: true
    },

    //Description
    description: {
        type: String
    },

    //Notes
    topNotes: [String],
    middleNotes: [String],
    baseNotes: [String],

    //Image URL
    imageUrl: {
        type: String
    },

    //Date
    createdAt: {
        type: Date,
        default: Date.now
    }

});

// Export model
module.exports = mongoose.model("Product", productSchema);