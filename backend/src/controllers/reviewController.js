const Review = require("../models/Review");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

// Product cards/detail pages display a cached rating + review count rather
// than aggregating on every page load — this keeps that cache in sync
// whenever a review is added or removed.
async function recalculateProductRating(productId) {
  const stats = await Review.aggregate([
    { $match: { product: productId } },
    { $group: { _id: "$product", avgRating: { $avg: "$rating" }, count: { $sum: 1 } } },
  ]);

  const { avgRating = 0, count = 0 } = stats[0] || {};
  await Product.findByIdAndUpdate(productId, {
    rating: Math.round(avgRating * 10) / 10,
    reviews: count,
  });
}

// GET /api/reviews/:productId
exports.getProductReviews = async (req, res, next) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate("user", "name")
      .sort({ createdAt: -1 });
    res.json({ success: true, reviews });
  } catch (err) {
    next(err);
  }
};

// POST /api/reviews/:productId
exports.createReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;
    const { productId } = req.params;

    if (!rating || rating < 1 || rating > 5) {
      throw new AppError("Rating must be between 1 and 5.", 400);
    }

    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found.", 404);

    const existing = await Review.findOne({ product: productId, user: req.user.id });
    if (existing) {
      throw new AppError("You've already reviewed this product.", 409);
    }

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      rating,
      comment,
    });

    await recalculateProductRating(productId);

    const populated = await review.populate("user", "name");
    res.status(201).json({ success: true, review: populated });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/reviews/:id
exports.deleteReview = async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) throw new AppError("Review not found.", 404);

    const isOwner = review.user.toString() === req.user.id;
    if (!isOwner && req.user.role !== "admin") {
      throw new AppError("Not authorized to delete this review.", 403);
    }

    const productId = review.product;
    await review.deleteOne();
    await recalculateProductRating(productId);

    res.json({ success: true, message: "Review deleted." });
  } catch (err) {
    next(err);
  }
};