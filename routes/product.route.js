const { Router } = require("express");
const { productController } = require("../controllers/product.controller");

const router = Router();

router.post("/product", productController.createProduct);
router.get("/product", productController.getProduct);
router.get("/product/:id", productController.getCategoryProduct)
router.patch("/product/:id", productController.addRating)

module.exports = router;
