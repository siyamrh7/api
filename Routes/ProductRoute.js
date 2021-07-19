const router = require("express").Router();
const {
  createProduct,
  getProducts,
  singleProduct,
  editProduct,
  deleteProduct
} = require("../Controllers/ProductCtrl");

router.post("/product", createProduct);
router.get("/products", getProducts);
router.get("/product/:id", singleProduct);
router.put("/product/:id", editProduct);
router.delete("/product/:id",deleteProduct)
module.exports = router;
