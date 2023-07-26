const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    subjects: String,
    message: String
});

const Question =  mongoose.model(
    "Question",
    questionSchema
);

module.exports = Question;