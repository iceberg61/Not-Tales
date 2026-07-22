const Product = require("../models/Product");
const AppError = require("../utils/AppError");

// Turns "100% Cotton Long Sleeve Shirt!" into "100-cotton-long-sleeve-shirt".
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// GET /api/products
// Supports: ?category=jeans  ?search=denim  ?sort=price-asc|price-desc|rating
//           ?page=1  ?limit=8
exports.getProducts = async (req, res, next) => {
  try {
    const { category, search, sort, page = 1, limit = 8 } = req.query;

    const filter = {};
    if (category && category !== "all") filter.category = category;
    if (search) filter.$text = { $search: search };

    const sortMap = {
      "price-asc": { price: 1 },
      "price-desc": { price: -1 },
      rating: { rating: -1 },
    };
    const sortBy = sortMap[sort] || { createdAt: -1 }; // "featured" falls back to newest first

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const perPage = Math.max(1, parseInt(limit, 10) || 8);

    const [products, total] = await Promise.all([
      Product.find(filter)
        .sort(sortBy)
        .skip((pageNum - 1) * perPage)
        .limit(perPage),
      Product.countDocuments(filter),
    ]);

    res.json({
      success: true,
      products,
      pagination: {
        page: pageNum,
        limit: perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /api/products/:slug
exports.getProductBySlug = async (req, res, next) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug });
    if (!product) throw new AppError("Product not found.", 404);
    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// POST /api/products (admin)
exports.createProduct = async (req, res, next) => {
  try {
    const { name, price, category, image } = req.body;
    if (!name || !price || !category || !image) {
      throw new AppError("name, price, category, and image are required.", 400);
    }

    const slug = req.body.slug ? slugify(req.body.slug) : slugify(name);
    const existing = await Product.findOne({ slug });
    if (existing) {
      throw new AppError("A product with that slug already exists.", 409);
    }

    const product = await Product.create({ ...req.body, slug });
    res.status(201).json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// PUT /api/products/:id (admin)
exports.updateProduct = async (req, res, next) => {
  try {
    const updates = { ...req.body };
    if (updates.name && !req.body.slug) {
      updates.slug = slugify(updates.name);
    }

    const product = await Product.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!product) throw new AppError("Product not found.", 404);

    res.json({ success: true, product });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/products/:id (admin)
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) throw new AppError("Product not found.", 404);
    res.json({ success: true, message: "Product deleted." });
  } catch (err) {
    next(err);
  }
};