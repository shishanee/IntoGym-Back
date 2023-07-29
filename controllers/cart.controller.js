const Cart = require("../models/Cart.model");
const User = require("../models/User.model");

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

  cartPay: async (req, res) => {
    const user = await User.findOne({ login: req.user.login });
    if (user.balance < req.body.result) {
      return res.json("Недостаточно средств");
    }
    const cart = await Cart.findOne({ user: req.user.id });
    user.balance = user.balance - req.body.result;
    cart.cart = [];
    await user.save();
    await cart.save();
    res.json("Оплата успешно прошла!");
  },

  deleteCart: async (req, res) => {
    const newData = await Cart.findOne({ user: req.user.id }).populate("cart");
    const arr = await newData.cart.find((item) => {
      if (item.id === req.params.id) {
        item.inStock += item.amount - 1;
        item.amount = 1;
      }
      return item;
    });

    await arr.save();

    const data = await Cart.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { cart: req.params.id } },
      { new: true }
    );

    res.json(data);
  },

  addPlus: async (req, res) => {
    const newData = await Cart.findOne({ user: req.user.id }).populate("cart");
    const arr = await newData.cart.find((item) => {
      if (item.id === req.params.id) {
        if (item.inStock !== 1) {
          item.amount++;
          item.inStock--;
        }
        return item;
      }
    });

    await arr.save();

    res.json(arr);
  },
  addMinus: async (req, res) => {
    const newData = await Cart.findOne({ user: req.user.id }).populate("cart");
    const arr = await newData.cart.find((item) => {
      if (item.id === req.params.id) {
        if (item.amount > 1) {
          item.inStock++;
          item.amount--;
        }
        return item;
      }
    });

    await arr.save();

    res.json(arr);
  },
};
