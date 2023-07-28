const Cart = require("../models/Cart.model");

module.exports.cartController = {
  createCart: async (req, res) => {
    const findUser = await Cart.find({ user: req.user.id });
    if (findUser.length > 0) {
      return res.json("уже есть корзина");
    }
    const data = await Cart.create({
      user: req.user.id,
      cart: req.body.cart,
    });
    res.json(data);
  },
  getCart: async (req, res) => {
    const findUserId = await Cart.findOne({ user: req.user.id }).populate({
      path: "cart",
    });
    res.json(findUserId);
  },
  deleteCart: async (req, res) => {
    const data = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { cart: { product: req.body.product } } }
    );
    res.json("удалено из корзины");
  },
  addCart: async (req, res) => {
    try {
      const data = await Cart.findOneAndUpdate(
        { user: req.user.id },
        {
          $push: {
            cart: req.body.cart,
          },
        },
        { new: true }
      ).populate("cart");
      res.json(data);
    } catch (error) {
      res.status(500).json({ error: "Error adding product to cart" });
    }
  },

  addPlus: async (req, res) => {
    const newData = await Cart.findOne({ user: req.user.id }).populate("cart");
    const arr = await newData.cart.find((item) => {
      if (item.id === req.params.id) {
        item.amount++;
        return item.inStock--;
      }
    });

    await arr.save();

    res.json(arr);
  },
  addMinus: async (req, res) => {
    const newData = await Cart.findOne({ user: req.user.id }).populate("cart");
    const arr = await newData.cart.find((item) => {
      if (item.id === req.params.id) {
        item.inStock++;
        return item.amount--;
      }
    });

    await arr.save();

    res.json(arr);
  },
};
