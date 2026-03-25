//Import mongoose to connect to MongoDB
const mongoose = require("mongoose");
//Import dotenv to read .env variables
require("dotenv").config();
//Import Product model
const Product = require("./models/product");

//Connect to MongoDB using connection string from .env
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB Connected for Seeding"))
    .catch((err) => console.error("Connection Error:", err));

//Array of products
const products = [
    {
        name: "Eros",
        brand: "Versace",
        price: 120,
        category: "Unisex",
        imageUrl: "https://via.placeholder.com/200"
    },
    {
        name: "Libre",
        brand: "Yves Saint Laurent",
        price: 150,
        category: "Men",
        imageUrl: "https://via.placeholder.com/200"
    },
    {
        name: "Goddess",
        brand: "Burberry",
        price: 95,
        category: "Women",
        imageUrl: "https://via.placeholder.com/200"
    },
    {
        name: "Bleu",
        brand: "Chanel",
        price: 80,
        category: "Unisex",
        imageUrl: "https://via.placeholder.com/200"
    }
];

//Function to seed database
const seedProducts = async () => {
    try {
        //Delete existing products
        await Product.deleteMany();

        console.log("Old products removed");

        //Insert new products
        await Product.insertMany(products);

        console.log("New products added successfully");

        process.exit();

    } catch (error) {
        console.error("Seeding Error:", error);
        process.exit(1);
    }
};

seedProducts();