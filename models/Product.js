const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a product name"],
  },
  description: {
    type: String,
    required: [true, "Please add a product description"],
  },
  price: {
    type: Number,
    required: [true, "Please add a product price"],
    min: [0, "Price cannot be less than zero"],
  },
  quantity: {
    type: Number,
    required: [true, "Please add a product quantity"],
    min: [0, "Quantity cannot be less than zero"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
