const { Router } = require("express");
const { cartController } = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/cart", authMiddleware, cartController.createCart); // создание корзины
router.get("/cart", authMiddleware, cartController.getCart); // вся корзина
router.patch("/cart", authMiddleware, cartController.addCart); // добавление в корзину
router.patch("/cartremove", authMiddleware, cartController.deleteCart); // удаление из корзину
router.patch('/cart/:id', authMiddleware, cartController.addPlus) // добавление количества в корзину

module.exports = router;
