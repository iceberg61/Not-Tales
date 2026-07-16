const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const c = require("../controllers/wishlistController");

router.get("/", protect, c.getWishlist);
router.post("/:productId", protect, c.addToWishlist);
router.delete("/:productId", protect, c.removeFromWishlist);

module.exports = router;
