//Import mongoose
const mongoose = require("mongoose");
//Define user schema
const userSchema = new mongoose.Schema({

    //Username
    name: {
        type: String,
        required: true
    },

    //Email address
    email: {
        type: String,
        required: true,
        unique: true
    },

    //Password
    password: {
        type: String,
        required: true
    },

    //Role
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }

}, { timestamps: true });

//Export model
module.exports = mongoose.model("User", userSchema);