//Import Product model
const Product = require("../models/Product");

//Get all products
exports.getAllProducts = async (req, res) => {
    try {

        //Get search query from URL
        const searchQuery = req.query.search;

        let products;

        //If search query exists
        if (searchQuery) {

            products = await Product.find({
                name: { $regex: searchQuery, $options: "i" }
            });

        } else {

            //Otherwise return all products
            products = await Product.find();
        }

        //Send products back to client
        res.json(products);

    } catch (error) {

        //Handle server error
        res.status(500).json({ message: error.message });
    }
};

//Get product by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Create product
exports.createProduct = async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Delete product
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};