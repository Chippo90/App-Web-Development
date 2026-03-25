//Import dependencies
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//JWT secret key
const JWT_SECRET = process.env.JWT_SECRET;

//PayPal credentials
const PAYPAL_CLIENT_ID = "ASoUgmpYh1ZBHoIW-QI8hhqhjpmX8_2K12ayinamHJyP4DjsTYhA_1UAAtSvSWvOhaYAb2ehUBGKXQVW";
const PAYPAL_SECRET = "EK2kB3dT1kZHpHyFqlbq2czfz21giRxUPm9ktnXsPhZvWS8LM6h-CuSr9oowsDagxYtDEGxkcfskjOE9";


//Register user
exports.registerUser = async (req, res) => {
    try {

        //Extract data
        const { name, email, password } = req.body;
        //Check if email exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        //Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        //Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "User registered successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Login user
exports.loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        //Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //Compare password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        //Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        //Send token to client
        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};