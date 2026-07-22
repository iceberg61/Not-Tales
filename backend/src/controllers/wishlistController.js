const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const AppError = require("../utils/AppError");

// GET /api/wishlist
exports.getWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id }).populate("products");
    // No wishlist doc yet just means nothing's been saved — not an error.
    res.json({ success: true, products: wishlist?.products || [] });
  } catch (err) {
    next(err);
  }
};

// POST /api/wishlist/:productId
exports.addToWishlist = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);
    if (!product) throw new AppError("Product not found.", 404);

    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $addToSet: { products: productId } }, 
      { upsert: true, new: true }
    ).populate("products");

    res.json({ success: true, products: wishlist.products });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/wishlist/:productId
exports.removeFromWishlist = async (req, res, next) => {
  try {
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: req.user.id },
      { $pull: { products: req.params.productId } },
      { new: true }
    ).populate("products");

    res.json({ success: true, products: wishlist?.products || [] });
  } catch (err) {
    next(err);
  }
};