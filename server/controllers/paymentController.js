//Import axios for HTTP requests to PayPal
const axios = require("axios");
//Import Order model to save orders after payment
const Order = require("../models/Order");
//Credentials
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

//Get PayPal Access Token
async function getAccessToken() {

    //Send request to PayPal OAuth endpoint
    const response = await axios({
        url: "https://api-m.sandbox.paypal.com/v1/oauth2/token",
        method: "post",

        //Auth using Client ID + Secret
        auth: {
            username: PAYPAL_CLIENT_ID,
            password: PAYPAL_SECRET
        },

        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },

        data: "grant_type=client_credentials"
    });

    //Return access token
    return response.data.access_token;
}

//Create PayPal order
exports.createPayPalOrder = async (req, res) => {
    try {
        //Get total from frontend
        const { totalAmount } = req.body;
        //Prevent invalid amounts
        if (!totalAmount || totalAmount <= 0) {
            return res.status(400).json({ message: "Invalid amount" });
        }
        //Get PayPal access token
        const accessToken = await getAccessToken();
        //Create order in PayPal
        const response = await axios({
            url: "https://api-m.sandbox.paypal.com/v2/checkout/orders",
            method: "post",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
            data: {
                intent: "CAPTURE",
                purchase_units: [
                    {
                        amount: {
                            currency_code: "EUR",
                            value: totalAmount.toString()
                        }
                    }
                ]
            }
        });

        //Send PayPal order ID back to frontend
        res.json({ id: response.data.id });

    } catch (error) {

        console.error("Create PayPal Order Error:", error.response?.data || error.message);
        res.status(500).json({ message: "PayPal order creation failed" });
    }
};

//Capture PayPal order
exports.capturePayPalOrder = async (req, res) => {

    try {
        const { orderId, cartItems, totalAmount } = req.body;

        //Get PayPal access token
        const accessToken = await getAccessToken();
        //Capture the approved order
        await axios({
            url: `https://api-m.sandbox.paypal.com/v2/checkout/orders/${orderId}/capture`,
            method: "post",
            headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            }
        });
        //Save order to MongoDB
        const newOrder = await Order.create({
            items: cartItems,
            totalAmount,
            paymentStatus: "Completed"
        });

        res.json({
            message: "Payment successful",
            order: newOrder
        });

    } catch (error) {

        console.error("Capture Error:", error.response?.data || error.message);
        res.status(500).json({ message: "Payment capture failed" });
    }
};