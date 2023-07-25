const { Router } = require("express");
const { followController } = require("../controllers/follow.controller");

const router = Router();

router.post("/follow", followController.createFollow); // создание абонимента

module.exports = router;
