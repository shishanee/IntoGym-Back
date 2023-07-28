const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
  user: {
    ref: "User",
    type: mongoose.SchemaTypes.ObjectId,
  },
  cart: [
    {
      ref: "Product",
      type: mongoose.SchemaTypes.ObjectId,
    },
    {
      amount: { type: Number, default: 1 },
    },
  ],
});

const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
