//Import express
const express = require("express");

//Create router
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

//Import controller
const productController = require("../controllers/productController");
const {createProduct} = require("../controllers/productController");

//Routes
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProductById);
router.post("/", protect, adminOnly, createProduct);
router.delete("/:id", productController.deleteProduct);

//IMPORTANT: export router
module.exports = router;