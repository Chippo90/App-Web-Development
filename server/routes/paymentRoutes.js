const express = require("express");
const router = express.Router();

const {
    createPayPalOrder,
    capturePayPalOrder
} = require("../controllers/paymentController");

//Route to create PayPal order
router.post("/create", createPayPalOrder);
//Route to capture payment
router.post("/capture", capturePayPalOrder);

module.exports = router;