//Import express
const express = require("express");
//Create router
const router = express.Router();
//Import controller
const orderController = require("../controllers/orderController");
//Route to create new order
router.post("/", orderController.createOrder);
//Route to get all orders
router.get("/", orderController.getOrders);
//Export router
module.exports = router;