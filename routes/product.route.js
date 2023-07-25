const { Router } = require("express");
const { productController } = require("../controllers/product.controller");

const router = Router();

router.post("/product", productController.createProduct);
router.get("/product", productController.getProduct);

module.exports = router