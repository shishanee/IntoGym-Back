const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  login: String,
  password: String,
  balance: {
    type: String,
    default: 0,
  },
  follow: [
    {
      ref: "Follow",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
