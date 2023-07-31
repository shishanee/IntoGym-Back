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
  },
  amount: {
    type: Number,
    default: 1
  },
  isOnCart: {
    type: String,
    default: 'Добавить в корзину'
  }
});

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
