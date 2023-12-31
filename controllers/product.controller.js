const Product = require("../models/Product.model");

module.exports.productController = {
  getProduct: async (req, res) => {
    const data = await Product.find().populate("category");
    res.json(data);
  },

  createProduct: async (req, res) => {
    const data = await Product.create({
      image: req.body.image,
      name: req.body.name,
      price: req.body.price,
      category: req.body.category,
      inStock: req.body.inStock,
    });
    res.json(data);
  },

  getCategoryProduct: async (req, res) => {
    const data = await Product.find({
      category: req.params.id,
    });
    res.json(data);
  },

  addRating: async (req, res) => {
   const data = await Product.findByIdAndUpdate(req.params.id, {
      $inc: {rating: +1 } 
   }, {new: true})
   res.json(data)
  }
};
