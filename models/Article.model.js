const mongoose = require("mongoose");
const router = require("../routes/user.route");

const articleSchema = mongoose.Schema({
    image: String,
    title: String,
    ingo: String,
    data: {
        type: Date,
        default: Date.now()
    }
});

const Article = mongoose.model("Article", articleSchema);
module.exports = Article;