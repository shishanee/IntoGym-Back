const { Router } = require("express");
const { userController } = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/auth", userController.registerUser); // Роут регистрации пользователя
router.post("/login", userController.login); // Вход в учетную запись
router.get("/user", authMiddleware, userController.getUser); // вывод пользователя
router.patch("/user", authMiddleware, userController.addFollow); // добавление абонемента
router.patch("/balance", authMiddleware, userController.addMoney); // пополнение баланса

module.exports = router;
