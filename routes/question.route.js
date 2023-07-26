const { Router } = require("express");
const { questionController } = require("../controllers/question.controller");

const router = Router();

router.post("/questions", questionController.createQuestion);
router.get("/questions", questionController.allQuestions)

module.exports = router;