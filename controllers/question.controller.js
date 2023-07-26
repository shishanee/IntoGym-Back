const Question = require("../models/Question.model");

module.exports.questionController = {
    createQuestion: async(req, res) => {
        const {fullName, email, phone, subjects, message} = req.body;
        const data = await Question.create({
            fullName: fullName,
            email: email,
            phone: phone,
            subjects: subjects,
            message: message
        });
         res.json(data)
    },
    allQuestions: async(req, res) => {
      const data = await Question.find();
      res.json(data)
    }
}