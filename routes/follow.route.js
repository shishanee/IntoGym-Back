const { Router } = require("express");
const { followController } = require("../controllers/follow.controller");

const router = Router();

router.post("/follow", followController.createFollow); // создание абонимента
router.get("/follow", followController.getFollow); // создание абонимента

module.exports = router;
