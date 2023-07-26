const Follow = require("../models/Follow.model");

module.exports.followController = {
  createFollow: async (req, res) => {
    const data = await Follow.create({
      name: req.body.name,
      hall: req.body.hall,
      pool: req.body.pool,
      sauna: req.body.sauna,
      price: req.body.price,
    });
    res.json(data);
  },
  getFollow: async (req,res) => {
    const data = await Follow.find()
    res.json(data)
  },
  
};
