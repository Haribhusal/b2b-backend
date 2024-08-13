// routes/productRoutes.js
const express = require("express");
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { protect, admin, seller } = require("../middleware/authMiddleware"); // Assuming you have middleware for auth

const router = express.Router();

router.route("/").post(protect, admin, createProduct).get(getProducts);
router
  .route("/:id")
  .get(getProductById)
  .put(protect, updateProduct)
  .delete(protect, admin, deleteProduct);
module.exports = router;
