const ProductCategory = require("../models/ProductCategory");

module.exports.productCategoryController = {
  getCategory: async (req, res) => {
    const data = await ProductCategory.find();
    res.json(data);
  },

  createCategory: async (req, res) => {
    const data = await ProductCategory.create({
      name: req.body.name,
    });
    res.json(data);
  },
};
