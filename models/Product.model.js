const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  image: String,
  name: String,
  price: Number,
  category: {
    ref: "ProductCategory",
    type: mongoose.SchemaTypes.ObjectId,
  },
  inStock: Number,
  rating: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
