const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/auth");
const c = require("../controllers/reviewController");

router.get("/:productId", c.getProductReviews);
router.post("/:productId", protect, c.createReview);
router.delete("/:id", protect, c.deleteReview);

module.exports = router;
