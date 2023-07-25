const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: String,
  login: String,
  password: String,
  follow: [
    {
      ref: "Follow",
      type: mongoose.SchemaTypes.ObjectId,
    },
  ],
});

const User = mongoose.model("User", userSchema);
module.exports = User;
