//Import Order model
const Order = require("../models/Order");

//Create new order
exports.createOrder = async (req, res) => {
    try {
        //Create new order
        const newOrder = new Order(req.body);

        //Save order to database
        const savedOrder = await newOrder.save();

        //Send success response
        res.status(201).json(savedOrder);

    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Get all orders
exports.getOrders = async (req, res) => {
    try {
        //Find all orders
        const orders = await Order.find().populate("items.productId");

        res.json(orders);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};