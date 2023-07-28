const { Router } = require("express");
const { cartController } = require("../controllers/cart.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = Router();

router.post("/cart", authMiddleware, cartController.createCart); // создание корзины
router.get("/cart", authMiddleware, cartController.getCart); // вся корзина
router.patch("/cart", authMiddleware, cartController.addCart); // добавление в корзину
router.patch("/cartplus/:id", authMiddleware, cartController.addPlus); // добавление количества в корзину
router.patch("/cartminus/:id", authMiddleware, cartController.addMinus); // удаление  количества в корзину
router.patch("/cartdelete/:id", authMiddleware, cartController.deleteCart); // удаление из корзины
router.patch("/cartpay", authMiddleware, cartController.cartPay); // оплата

module.exports = router;
