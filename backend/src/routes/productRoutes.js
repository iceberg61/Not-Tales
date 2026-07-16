const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middleware/auth");
const c = require("../controllers/productController");

router.get("/", c.getProducts);              // supports ?category=&sort=&search=&page=
router.get("/:slug", c.getProductBySlug);
router.post("/", protect, adminOnly, c.createProduct);
router.put("/:id", protect, adminOnly, c.updateProduct);
router.delete("/:id", protect, adminOnly, c.deleteProduct);

module.exports = router;
