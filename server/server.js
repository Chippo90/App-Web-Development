//Load environment variables
require("dotenv").config();
//Import dependencies
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

//Import routes
const productRoutes = require("./routes/productRoutes");
const orderRoutes = require("./routes/orderRoutes");
const authRoutes = require("./routes/authRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

//Create express app
const app = express();

//Middleware
app.use(express.json());

//Serve frontend
app.use(express.static(path.join(__dirname, "../client")));

//Register API routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/payments", paymentRoutes);

//Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

//Start server
app.listen(5000, () => {
    console.log("Server running on port 5000");
});