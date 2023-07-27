const { Router } = require("express");
const { articleController } = require("../controllers/article.controller");



const router = Router();

router.post("/article", articleController.createArticle);
router.get("/article", articleController.getAllArticle);
router.get("/article/:id", articleController.getOneArticle)

module.exports = router;