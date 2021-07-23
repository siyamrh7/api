const router = require("express").Router();
const {
  createProduct,
  getProducts,
  singleProduct,
  editProduct,
  deleteProduct,
  getCategory,
  createCategory,
  deleteCategory
} = require("../Controllers/ProductCtrl");
router.post("/product", createProduct);
router.get("/products", getProducts);
router.get("/product/:id", singleProduct);
router.put("/product/:id", editProduct);
router.delete("/product/:id",deleteProduct)
router.post("/category", createCategory);
router.get("/categories", getCategory);
router.delete("/category/:id",deleteCategory)
module.exports = router;
