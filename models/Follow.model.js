const mongoose = require("mongoose");

const followSchema = mongoose.Schema({
  name: String,
  hall: Boolean,
  pool: Boolean,
  sauna: Boolean,
  price: Number,
});

const Follow = mongoose.model("Follow", followSchema);
module.exports = Follow;
