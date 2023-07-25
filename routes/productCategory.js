const { Router } = require("express");
const {
  productCategoryController,
} = require("../controllers/productCategory.controller");

const router = Router();

router.post("/productCategory", productCategoryController.createCategory);
router.get("/productCategory", productCategoryController.getCategory);

module.exports = router;
